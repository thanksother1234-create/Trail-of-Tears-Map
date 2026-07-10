import { type FormEvent, useMemo, useState } from "react";
import { MessageSquareText, Send } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ContentFeedbackSectionProps {
  selectedRouteLabel: string;
}

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContentFeedbackSection({ selectedRouteLabel }: ContentFeedbackSectionProps) {
  const [feedback, setFeedback] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const trimmedFeedback = feedback.trim();
  const helperText = useMemo(() => {
    if (submitState === "success") {
      return statusMessage;
    }

    if (submitState === "error") {
      return statusMessage;
    }

    return "Flag route details, dates, wording, or sources that seem off. Submissions include the current route for context.";
  }, [statusMessage, submitState]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (trimmedFeedback.length < 10) {
      setSubmitState("error");
      setStatusMessage("Please share a little more detail so the issue is actionable.");
      return;
    }

    setSubmitState("submitting");
    setStatusMessage("");

    try {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 12000);
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          message: trimmedFeedback,
          routeLabel: selectedRouteLabel,
          page: window.location.hash || "#route",
        }),
      });
      window.clearTimeout(timeoutId);

      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (response.status === 404) {
        throw new Error("The feedback API is not available on this deployment yet.");
      }

      if (!response.ok) {
        throw new Error(result?.error ?? "Unable to submit feedback right now.");
      }

      setFeedback("");
      setSubmitState("success");
      setStatusMessage("Thank you. Your feedback was submitted for review.");
    } catch (error) {
      setSubmitState("error");
      setStatusMessage(
        error instanceof DOMException && error.name === "AbortError"
          ? "The feedback request timed out. Check that BLOB_READ_WRITE_TOKEN is configured and redeploy the project."
          : error instanceof Error
            ? error.message
            : "Unable to submit feedback right now. Please try again later.",
      );
    }
  }

  return (
    <section
      id="feedback"
      className="paper-panel relative overflow-hidden rounded-[2rem] px-5 py-6 sm:px-7 sm:py-7"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-white/70" />
      <div className="absolute -left-12 bottom-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(23,49,42,0.12),transparent_70%)]" />
      <div className="absolute -right-10 top-0 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(195,143,53,0.18),transparent_72%)]" />

      <div className="relative grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-start">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 rounded-full border border-stone-400/16 bg-white/70 px-4 py-2 text-sm text-stone-700">
            <MessageSquareText className="h-4 w-4 text-stone-900" />
            <span className="font-medium">Content feedback</span>
          </div>

          <div>
            <p className="section-kicker">Review The Content</p>
            <h3 className="mt-3 max-w-2xl font-display text-3xl leading-none text-stone-950 sm:text-4xl">
              Help sharpen the history on this page.
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-700 sm:text-base">
              Use this form to flag questionable route details, source issues, year ranges that
              look inconsistent, wording that feels off, or context that seems incomplete. The
              current route is attached automatically so your note stays anchored to what you were
              reading.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-stone-400/14 bg-[#f8f2e6]/90 p-4 text-sm leading-6 text-stone-700">
            <p className="section-kicker text-[0.62rem]">Current route context</p>
            <p className="mt-2 font-medium text-stone-900">{selectedRouteLabel}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="section-kicker text-[0.62rem]">Feedback message</span>
            <textarea
              value={feedback}
              onChange={(event) => {
                setFeedback(event.target.value);

                if (submitState !== "idle") {
                  setSubmitState("idle");
                  setStatusMessage("");
                }
              }}
              placeholder="Example: The year range in this stop conflicts with the next panel, and the wording makes it sound like a single march instead of multiple detachments."
              className="mt-3 min-h-44 w-full rounded-[1.6rem] border border-stone-400/18 bg-white/88 px-5 py-4 text-sm leading-7 text-stone-900 outline-none transition placeholder:text-stone-500 focus:border-stone-500/26 focus:bg-white"
              maxLength={4000}
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p
              className={`text-sm leading-6 ${
                submitState === "error"
                  ? "text-[#9b3f2d]"
                  : submitState === "success"
                    ? "text-[#1f5a42]"
                    : "text-stone-600"
              }`}
            >
              {helperText}
            </p>

            <Button
              type="submit"
              className="min-w-40 gap-2 self-start"
              disabled={submitState === "submitting"}
            >
              <Send className="h-4 w-4" />
              {submitState === "submitting" ? "Submitting..." : "Submit feedback"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
