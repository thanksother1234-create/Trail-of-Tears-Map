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

function hasBlobWriteAccess() {
  const hasReadWriteToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  const hasOidcCredentials = Boolean(
    process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN,
  );

  return {
    hasReadWriteToken,
    hasOidcCredentials,
    isConfigured: hasReadWriteToken || hasOidcCredentials,
  };
}

export function GET() {
  const blobAccess = hasBlobWriteAccess();

  return Response.json({
    ok: true,
    storageConfigured: blobAccess.isConfigured,
    storeLinked: Boolean(process.env.BLOB_STORE_ID),
    authMode: blobAccess.hasReadWriteToken
      ? "read-write-token"
      : blobAccess.hasOidcCredentials
        ? "oidc"
        : "missing",
  });
}

export async function POST(request: Request) {
  if (!hasBlobWriteAccess().isConfigured) {
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

  try {
    await put(`feedback/${Date.now()}-${crypto.randomUUID()}.json`, JSON.stringify(entry, null, 2), {
      access: "private",
      addRandomSuffix: false,
      contentType: "application/json",
    });
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

  return jsonResponse({ message: "Feedback submitted." }, 200);
}
