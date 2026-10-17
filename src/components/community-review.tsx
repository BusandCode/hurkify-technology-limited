"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

type ReviewPost = { title: string | null; body: string; author_name: string };
export function CommunityReview() {
  const [post, setPost] = useState<ReviewPost | null>(null);
  const [action, setAction] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const token = useRef("");
  const lock = useRef(false);
  const functionName =
    process.env.NEXT_PUBLIC_COMMUNITY_MODERATION_FUNCTION ||
    "community-moderation";
  const endpoint = `${process.env.NEXT_PUBLIC_SUPABASE_URL || ""}/functions/v1/${functionName}`;

  useEffect(() => {
    let active = true;
    const params = new URLSearchParams(window.location.hash.slice(1));
    token.current = params.get("token") || "";
    const choice = params.get("action") || "";
    async function preview() {
      if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !/^[a-f0-9]{64}$/.test(token.current) ||
        !["approve", "reject"].includes(choice)
      ) {
        if (active)
          setError("Open the full review link from your moderation email.");
        return;
      }
      if (active) setAction(choice);
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: "preview",
            token: token.current,
            action: choice,
          }),
          signal: AbortSignal.timeout(15000),
        });
        const data = await response.json();
        if (!response.ok || !data.post)
          throw new Error(data.error || "Unable to load this post.");
        if (active) setPost(data.post);
      } catch (failure) {
        if (active)
          setError(
            failure instanceof Error
              ? failure.message
              : "Unable to load the review. Try again later.",
          );
      }
    }
    void preview();
    return () => {
      active = false;
    };
  }, [endpoint]);

  async function confirm() {
    if (lock.current || !post || done) return;
    lock.current = true;
    setBusy(true);
    setError("");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "decide", token: token.current, action }),
        signal: AbortSignal.timeout(15000),
      });
      const data = await response.json();
      if (!response.ok || data.outcome !== action)
        throw new Error(data.error || "The action was not confirmed.");
      setDone(true);
      token.current = "";
      window.history.replaceState(null, "", window.location.pathname);
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : "Unable to confirm. Check Supabase before trying again.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-mist-200 bg-white p-6 sm:p-8">
      {done ? (
        <div role="status">
          <h2 className="text-xl font-semibold text-primary">
            {action === "approve" ? "Post approved" : "Post rejected"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-mist-600">
            {action === "approve"
              ? "This contribution is now public in the community."
              : "The pending contribution has been permanently removed."}{" "}
            You can return to Gmail.
          </p>
        </div>
      ) : (
        <>
          {post && (
            <>
              <p className="text-xs font-semibold text-primary">
                {post.author_name}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-secondary">
                {post.title || "Community reply"}
              </h2>
              <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-relaxed text-mist-600">
                {post.body}
              </p>
              <p className="mt-6 border-t border-mist-200 pt-4 text-sm leading-relaxed text-secondary">
                {action === "approve"
                  ? "Confirm to make this post public."
                  : "Confirm to permanently remove this pending post."}
              </p>
              <button
                type="button"
                disabled={busy}
                onClick={confirm}
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white disabled:opacity-50"
              >
                {busy && (
                  <LoaderCircle
                    size={16}
                    aria-hidden
                    className="animate-spin"
                  />
                )}
                {busy
                  ? "Confirming…"
                  : action === "approve"
                    ? "Confirm approval"
                    : "Confirm rejection"}
              </button>
              <p className="mt-3 text-xs text-mist-600">
                Nothing changes until you confirm. Close this tab to cancel.
              </p>
            </>
          )}
          {!post && !error && (
            <p role="status" className="text-sm text-mist-600">
              Loading the post for review…
            </p>
          )}
          {error && (
            <p
              role="alert"
              className="mt-4 text-sm leading-relaxed text-red-700"
            >
              {error}
            </p>
          )}
        </>
      )}
      <Link
        href="/hefamaa-support-community/"
        className="mt-6 inline-block min-h-10 text-sm text-primary underline underline-offset-4"
      >
        Go to the community
      </Link>
    </div>
  );
}
