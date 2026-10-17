"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  LoaderCircle,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import { communityDb } from "@/supabase/community-client";

type Post = {
  id: string;
  title: string | null;
  body: string;
  author_name: string;
  published: boolean;
  created_at: string;
};
const fields = "id,title,body,author_name,published,created_at";

export function QuestionBox() {
  const [user, setUser] = useState<User | null>(null);
  const [questions, setQuestions] = useState<Post[]>([]);
  const [replies, setReplies] = useState<Post[]>([]);
  const [selected, setSelected] = useState<Post | null>(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(!!communityDb);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [revision, refresh] = useState(0);
  const lock = useRef(false);

  useEffect(() => {
    if (!communityDb) return;
    let active = true;
    communityDb.auth.getUser().then(({ data }) => {
      if (active) setUser(data.user);
    });
    const { data } = communityDb.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      refresh((v) => v + 1);
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!communityDb) return;
    let active = true;
    async function load() {
      const db = communityDb!;
      const query = selected
        ? db
            .from("healthcare_discussions")
            .select(fields)
            .eq("parent_id", selected.id)
            .order("created_at", { ascending: true })
            .limit(100)
        : db
            .from("healthcare_discussions")
            .select(fields)
            .is("parent_id", null)
            .order("created_at", { ascending: false })
            .range(page * 20, page * 20 + 19);
      const { data, error: failure } = await query;
      if (!active) return;
      setLoading(false);
      if (failure) {
        setError("The discussion could not load. Please try refreshing.");
        return;
      }
      setError("");
      if (selected) setReplies(data as Post[]);
      else setQuestions(data as Post[]);
    }
    void load();
    const timer = setInterval(() => {
      if (!document.hidden) void load();
    }, 30000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [selected, page, revision, user]);

  async function signIn() {
    if (!communityDb || lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    try {
      const { error: failure } = await communityDb.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/hefamaa-registration-lagos/`,
        },
      });
      if (failure) throw failure;
    } catch {
      setError("Sign-in could not start. Please try again.");
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!communityDb || !user || lock.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    if (values.get("_gotcha")) return;
    lock.current = true;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const { error: failure } = await communityDb
        .from("healthcare_discussions")
        .insert({
          parent_id: selected?.id ?? null,
          title: selected ? null : String(values.get("title") ?? "").trim(),
          body: String(values.get("body") ?? "").trim(),
        });
      if (failure) throw failure;
      form.reset();
      setNotice(
        "Your contribution is saved for review. Once approved, everyone can read it here. No email enquiry has been sent.",
      );
      refresh((v) => v + 1);
    } catch {
      setError(
        "Your post was not confirmed. Please wait a minute and try again. Keep questions and replies between 10 and 2,500 characters.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  function postCard(post: Post, question = false) {
    return (
      <article
        key={post.id}
        className="rounded-xl border border-mist-200 bg-white p-5"
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-mist-600">
          <span className="font-semibold text-secondary">
            {post.author_name}
          </span>
          <time dateTime={post.created_at}>
            {new Date(post.created_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
              timeZone: "UTC",
            })}
          </time>
          {!post.published && (
            <span className="rounded-full bg-primary/8 px-2 py-1 text-primary">
              Awaiting review · visible to you
            </span>
          )}
        </div>
        {post.title && (
          <h3 className="mt-3 text-base font-semibold text-secondary">
            {post.title}
          </h3>
        )}
        <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-mist-600">
          {post.body}
        </p>
        {question && post.published && (
          <button
            type="button"
            onClick={() => {
              setSelected(post);
              setReplies([]);
              setLoading(true);
              setNotice("");
            }}
            className="mt-3 inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-primary"
          >
            View conversation <ArrowUpRight aria-hidden size={14} />
          </button>
        )}
      </article>
    );
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-mist-200 bg-white px-3 py-2.5 text-sm text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15";
  return (
    <section
      id="questions"
      className="scroll-mt-24 border-y border-mist-200 bg-mist-50 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow">Hurkify healthcare community</p>
            <h2 className="section-title">Ask. Share. Learn together.</h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-mist-600">
            A shared space for healthcare facility owners and teams to ask
            questions about registration, operations, and technology. Questions
            and replies stay here for others to learn from.
          </p>
        </div>
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              {selected ? (
                <button
                  type="button"
                  onClick={() => {
                    setSelected(null);
                    setLoading(true);
                    setNotice("");
                  }}
                  className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-primary"
                >
                  <ArrowLeft size={16} aria-hidden /> All questions
                </button>
              ) : (
                <h3 className="text-base font-semibold text-secondary">
                  Community questions
                </h3>
              )}
              {communityDb && (
                <button
                  type="button"
                  onClick={() => refresh((v) => v + 1)}
                  className="inline-flex min-h-10 items-center gap-2 text-xs text-primary"
                >
                  <RefreshCw size={14} aria-hidden /> Refresh
                </button>
              )}
            </div>
            {!communityDb ? (
              <div className="rounded-xl border border-dashed border-primary/25 bg-white p-7">
                <MessageSquare aria-hidden className="h-6 w-6 text-primary" />
                <h3 className="mt-4 font-semibold text-secondary">
                  The conversation starts here.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-600">
                  Our healthcare community is being prepared. Public questions
                  and replies will appear here when posting opens.
                </p>
              </div>
            ) : (
              <>
                {selected && postCard(selected)}
                {loading && (
                  <p role="status" className="text-sm text-mist-600">
                    Loading the conversation…
                  </p>
                )}
                {!loading && (selected ? replies : questions).length === 0 && (
                  <p className="rounded-xl border border-dashed border-mist-200 p-6 text-sm leading-relaxed text-mist-600">
                    {selected
                      ? "No replies yet. Share your experience or ask a follow-up."
                      : "No questions on this page yet. Start the conversation with a question others can learn from."}
                  </p>
                )}
                {(selected ? replies : questions).map((post) =>
                  postCard(post, !selected),
                )}
                {!selected && (
                  <div className="flex gap-4">
                    <button
                      disabled={page === 0}
                      onClick={() => {
                        setPage((v) => v - 1);
                        setLoading(true);
                      }}
                      className="min-h-10 text-xs text-primary disabled:opacity-30"
                    >
                      Previous
                    </button>
                    <button
                      disabled={questions.length < 20}
                      onClick={() => {
                        setPage((v) => v + 1);
                        setLoading(true);
                      }}
                      className="min-h-10 text-xs text-primary disabled:opacity-30"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="rounded-xl border border-mist-200 bg-white p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-secondary">
              {selected ? "Join this conversation" : "Ask the community"}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-mist-600">
              Posts are public after review. Keep patient details and
              confidential information out of the conversation. Community
              replies are general guidance, not clinical advice or an official
              regulatory decision.
            </p>
            {!user ? (
              <>
                <button
                  type="button"
                  disabled={!communityDb || busy}
                  onClick={signIn}
                  className="mt-5 inline-flex min-h-11 items-center justify-center gap-3 rounded-full border border-[#747775] bg-white px-5 text-sm font-medium text-[#1f1f1f] transition-colors hover:bg-[#f8fafd] focus-visible:ring-2 focus-visible:ring-[#4285f4] focus-visible:ring-offset-2 disabled:opacity-50"
                >
                  {busy ? (
                    <LoaderCircle
                      size={16}
                      aria-hidden
                      className="animate-spin"
                    />
                  ) : (
                    <svg
                      aria-hidden
                      width="20"
                      height="20"
                      viewBox="0 0 48 48"
                      className="shrink-0"
                    >
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                      />
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.79-4.59l-7.98-6.19A23.87 23.87 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19Z"
                      />
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                      />
                    </svg>
                  )}
                  {communityDb ? "Continue with Google" : "Posting opens soon"}
                </button>
                <p className="mt-3 text-xs text-mist-600">
                  Read without signing in. Sign in to ask questions and reply.
                </p>
              </>
            ) : (
              <form
                key={selected?.id ?? "new-question"}
                onSubmit={submit}
                aria-busy={busy}
                className="mt-5 space-y-4"
              >
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-mist-600">Signed in</span>
                  <button
                    type="button"
                    className="min-h-9 text-primary underline"
                    onClick={async () => {
                      const result = await communityDb!.auth.signOut();
                      if (result.error)
                        setError("Could not sign out. Please try again.");
                    }}
                  >
                    Sign out
                  </button>
                </div>
                {!selected && (
                  <label
                    htmlFor="community-title"
                    className="block text-xs font-medium text-secondary"
                  >
                    Question title
                    <input
                      id="community-title"
                      name="title"
                      minLength={10}
                      maxLength={160}
                      required
                      placeholder="What would you like to understand?"
                      className={inputClass}
                    />
                  </label>
                )}
                <label
                  htmlFor="community-body"
                  className="block text-xs font-medium text-secondary"
                >
                  {selected ? "Your reply" : "Add a little context"}
                  <textarea
                    id="community-body"
                    name="body"
                    minLength={10}
                    maxLength={2500}
                    required
                    rows={4}
                    className={`${inputClass} resize-y`}
                  />
                </label>
                <div hidden aria-hidden>
                  <input
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-label="Leave empty"
                  />
                </div>
                <label className="flex items-start gap-2 text-xs leading-relaxed text-mist-600">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 accent-primary"
                  />
                  <span>
                    I understand my name and contribution will be public after
                    review.{" "}
                    <Link href="/privacy/" className="text-primary underline">
                      Privacy notice
                    </Link>
                  </span>
                </label>
                <button
                  disabled={busy || (!!selected && !selected.published)}
                  type="submit"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white hover:bg-secondary disabled:opacity-50"
                >
                  {busy ? (
                    <LoaderCircle
                      size={16}
                      aria-hidden
                      className="animate-spin"
                    />
                  ) : (
                    <ArrowUpRight size={16} aria-hidden />
                  )}
                  {busy
                    ? "Saving…"
                    : selected
                      ? "Post your reply"
                      : "Post your question"}
                </button>
              </form>
            )}
            {notice && (
              <p
                role="status"
                className="mt-4 text-sm leading-relaxed text-primary"
              >
                {notice}
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
          </div>
        </div>
      </div>
    </section>
  );
}
