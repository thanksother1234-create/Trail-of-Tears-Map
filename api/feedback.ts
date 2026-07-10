import { put } from "@vercel/blob";

interface FeedbackPayload {
  message?: unknown;
  page?: unknown;
  routeLabel?: unknown;
}

function jsonResponse(body: Record<string, string>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeBoolean(value: string | undefined, fallback = false) {
  if (!value) {
    return fallback;
  }

  return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
}

function getBlobWriteAccess(request?: Request) {
  const feedbackStoreId = process.env.FEEDBACK_BLOB_STORE_ID?.trim();
  const defaultStoreId = process.env.BLOB_STORE_ID?.trim();
  const feedbackReadWriteToken = process.env.FEEDBACK_BLOB_READ_WRITE_TOKEN?.trim();
  const defaultReadWriteToken = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  const oidcTokenFromHeader = request?.headers.get("x-vercel-oidc-token")?.trim();
  const oidcToken = oidcTokenFromHeader || process.env.VERCEL_OIDC_TOKEN?.trim();

  const storeId = feedbackStoreId || defaultStoreId || "";
  const readWriteToken = feedbackReadWriteToken || defaultReadWriteToken || "";
  const variablePrefix = feedbackStoreId || feedbackReadWriteToken ? "FEEDBACK_BLOB" : "BLOB";

  const hasReadWriteToken = Boolean(readWriteToken);
  const hasOidcCredentials = Boolean(storeId && oidcToken);

  return {
    hasReadWriteToken,
    hasOidcCredentials,
    oidcToken,
    readWriteToken,
    storeId,
    variablePrefix,
    isConfigured: hasReadWriteToken || hasOidcCredentials,
  };
}

function getDiscordAlertConfig() {
  const webhookUrl = process.env.DISCORD_FEEDBACK_WEBHOOK_URL?.trim() || "";
  const forumMode = normalizeBoolean(process.env.DISCORD_FEEDBACK_FORUM_MODE, true);
  const forumTagIds = (process.env.DISCORD_FEEDBACK_FORUM_TAG_IDS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return {
    webhookUrl,
    forumMode,
    forumTagIds,
    isConfigured: Boolean(webhookUrl),
  };
}

function buildDiscordThreadName(entry: {
  routeLabel: string;
  submittedAt: string;
}) {
  const timestamp = entry.submittedAt.slice(0, 16).replace("T", " ");
  const rawName = `${entry.routeLabel || "Feedback"} - ${timestamp} UTC`;

  return rawName.length <= 100 ? rawName : `${rawName.slice(0, 97)}...`;
}

async function sendFeedbackAlert(entry: {
  message: string;
  page: string;
  routeLabel: string;
  submittedAt: string;
  userAgent: string;
  blobPath: string;
}) {
  const discordConfig = getDiscordAlertConfig();

  if (!discordConfig.isConfigured) {
    return { sent: false, skipped: true };
  }

  const response = await fetch(`${discordConfig.webhookUrl}?wait=true`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "Trail Feedback",
      ...(discordConfig.forumMode ? { thread_name: buildDiscordThreadName(entry) } : {}),
      ...(discordConfig.forumMode && discordConfig.forumTagIds.length
        ? { applied_tags: discordConfig.forumTagIds }
        : {}),
      allowed_mentions: {
        parse: [],
      },
      embeds: [
        {
          title: "New content feedback submitted",
          color: 6170469,
          description: entry.message,
          fields: [
            {
              name: "Route",
              value: entry.routeLabel || "Unknown route",
              inline: true,
            },
            {
              name: "Page",
              value: entry.page || "#route",
              inline: true,
            },
            {
              name: "Submitted",
              value: entry.submittedAt,
              inline: false,
            },
            {
              name: "Stored at",
              value: `\`${entry.blobPath}\``,
              inline: false,
            },
            {
              name: "User agent",
              value: entry.userAgent || "Unavailable",
              inline: false,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Discord webhook failed (${response.status}): ${errorText}`);
  }

  return { sent: true, skipped: false };
}

export function GET(request: Request) {
  const blobAccess = getBlobWriteAccess(request);
  const discordAlertConfig = getDiscordAlertConfig();

  return Response.json({
    ok: true,
    storageConfigured: blobAccess.isConfigured,
    storeLinked: Boolean(blobAccess.storeId),
    authMode: blobAccess.hasReadWriteToken
      ? "read-write-token"
      : blobAccess.hasOidcCredentials
        ? "oidc"
        : "missing",
    variablePrefix: blobAccess.variablePrefix,
    discordConfigured: discordAlertConfig.isConfigured,
    discordForumMode: discordAlertConfig.forumMode,
    discordForumTagCount: discordAlertConfig.forumTagIds.length,
  });
}

export async function POST(request: Request) {
  const blobAccess = getBlobWriteAccess(request);

  if (!blobAccess.isConfigured) {
    return jsonResponse(
      {
        error:
          "Feedback storage is not configured on this deployment yet. Connect a Vercel Blob store first.",
      },
      503,
    );
  }

  let payload: FeedbackPayload;

  try {
    payload = (await request.json()) as FeedbackPayload;
  } catch (error) {
    console.error("Unable to parse feedback payload.", error);
    return jsonResponse({ error: "The feedback submission could not be read." }, 400);
  }

  const message = normalizeString(payload.message);
  const page = normalizeString(payload.page);
  const routeLabel = normalizeString(payload.routeLabel);

  if (message.length < 10) {
    return jsonResponse({ error: "Please include a bit more detail in your feedback." }, 400);
  }

  if (message.length > 4000) {
    return jsonResponse({ error: "Feedback must stay under 4000 characters." }, 400);
  }

  const entry = {
    message,
    page: page || "#route",
    routeLabel: routeLabel || "Unknown route",
    submittedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent") ?? "",
  };
  const feedbackBlobPath = `feedback/${Date.now()}-${crypto.randomUUID()}.json`;

  try {
    await put(
      feedbackBlobPath,
      JSON.stringify(entry, null, 2),
      {
        access: "private",
        addRandomSuffix: false,
        contentType: "application/json",
        ...(blobAccess.storeId ? { storeId: blobAccess.storeId } : {}),
        ...(blobAccess.readWriteToken ? { token: blobAccess.readWriteToken } : {}),
        ...(blobAccess.oidcToken ? { oidcToken: blobAccess.oidcToken } : {}),
      },
    );
  } catch (error) {
    console.error("Unable to store feedback in Vercel Blob.", error);
    return jsonResponse(
      {
        error:
          "The feedback form is live, but storage on Vercel is not ready yet. Try again after Blob is connected.",
      },
      503,
    );
  }

  try {
    await sendFeedbackAlert({
      ...entry,
      blobPath: feedbackBlobPath,
    });
  } catch (error) {
    console.error("Discord feedback alert failed after the feedback was saved.", error);
  }

  return jsonResponse({ message: "Feedback submitted." }, 200);
}
