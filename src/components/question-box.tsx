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
  Reply,
  Send,
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
  const [replyTo, setReplyTo] = useState<string | null>(null);
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
      const [questionResult, replyResult] = await Promise.all([
        db
          .from("healthcare_discussions")
          .select(fields)
          .is("parent_id", null)
          .order("created_at", { ascending: false })
          .range(page * 20, page * 20 + 19),
        selected
          ? db
              .from("healthcare_discussions")
              .select(fields)
              .eq("parent_id", selected.id)
              .order("created_at", { ascending: true })
              .limit(100)
          : Promise.resolve({ data: [], error: null }),
      ]);
      const failure = questionResult.error || replyResult.error;
      if (!active) return;
      setLoading(false);
      if (failure) {
        setError("The discussion could not load. Please try refreshing.");
        return;
      }
      setError("");
      setQuestions((questionResult.data ?? []) as Post[]);
      setReplies((replyResult.data ?? []) as Post[]);
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
          redirectTo: `${window.location.origin}${window.location.pathname}`,
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

  async function submit(
    event: FormEvent<HTMLFormElement>,
    parentId: string | null = null,
  ) {
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
          parent_id: parentId,
          title: parentId ? null : String(values.get("title") ?? "").trim(),
          body: String(values.get("body") ?? "").trim(),
        });
      if (failure) throw failure;
      form.reset();
      if (!parentId) setPage(0);
      setNotice(
        "Your message is saved for review. Once approved, it will appear in the conversation for everyone.",
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
        className="mb-5 max-w-2xl rounded-2xl rounded-tl-sm border border-mist-200/70 bg-white p-4"
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-mist-600">
          <span
            aria-hidden
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/8 text-[10px] font-semibold text-primary"
          >
            {post.author_name
              .split(" ")
              .map((part) => part[0])
              .slice(0, 2)
              .join("")}
          </span>
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
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <button
              type="button"
              aria-expanded={replyTo === post.id}
              aria-controls={`reply-${post.id}`}
              onClick={() => {
                setReplyTo(replyTo === post.id ? null : post.id);
                setNotice("");
                setError("");
              }}
              className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-primary"
            >
              <Reply size={15} aria-hidden /> Reply
            </button>
            {!selected && (
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
          </div>
        )}
        {question && post.published && replyTo === post.id && (
          <div
            id={`reply-${post.id}`}
            className="mt-3 border-t border-mist-200 pt-4"
          >
            {user ? (
              <form
                onSubmit={(event) => submit(event, post.id)}
                aria-busy={busy}
                className="space-y-3"
              >
                <label
                  htmlFor={`reply-body-${post.id}`}
                  className="block text-xs font-medium text-secondary"
                >
                  Your reply to {post.author_name}
                  <textarea
                    autoFocus
                    id={`reply-body-${post.id}`}
                    name="body"
                    required
                    minLength={10}
                    maxLength={2500}
                    rows={3}
                    placeholder="Share an answer or helpful experience…"
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
                    My name and reply will be public after review.{" "}
                    <Link href="/privacy/" className="text-primary underline">
                      Privacy notice
                    </Link>
                  </span>
                </label>
                <div className="flex gap-3">
                  <button
                    disabled={busy}
                    type="submit"
                    className="inline-flex min-h-10 items-center gap-2 rounded-full bg-primary px-5 text-xs font-semibold text-white hover:bg-secondary disabled:opacity-50"
                  >
                    {busy ? (
                      <LoaderCircle
                        size={14}
                        aria-hidden
                        className="animate-spin"
                      />
                    ) : (
                      <Send size={14} aria-hidden />
                    )}
                    {busy ? "Sending…" : "Send reply"}
                  </button>
                  <button
                    disabled={busy}
                    type="button"
                    onClick={() => setReplyTo(null)}
                    className="min-h-10 px-2 text-xs text-mist-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <p className="text-xs leading-relaxed text-mist-600">
                  Sign in with Google to add your answer to this conversation.
                </p>
                <button
                  type="button"
                  disabled={busy}
                  onClick={signIn}
                  className="mt-3 min-h-10 rounded-full border border-mist-200 bg-white px-4 text-xs font-medium text-secondary disabled:opacity-50"
                >
                  Sign in to reply
                </button>
              </div>
            )}
            {notice && (
              <p
                role="status"
                className="mt-3 text-xs leading-relaxed text-primary"
              >
                {notice}
              </p>
            )}
            {error && (
              <p
                role="alert"
                className="mt-3 text-xs leading-relaxed text-red-700"
              >
                {error}
              </p>
            )}
          </div>
        )}
      </article>
    );
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-mist-200 bg-white px-3 py-2.5 text-sm text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15";
  return (
    <section
      id="questions"
      aria-label="Healthcare community chat room"
      className="scroll-mt-24 pb-8"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="overflow-hidden rounded-2xl border border-mist-200 bg-white shadow-[0_12px_50px_-30px_rgba(26,11,46,0.25)]">
          <div className="grid lg:grid-cols-[270px_minmax(0,1fr)]">
            <aside
              aria-label="Community conversations"
              className={`border-b border-mist-200 bg-mist-50 lg:border-b-0 lg:border-r ${selected ? "hidden lg:block" : ""}`}
            >
              <div className="border-b border-mist-200 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">
                  The community room
                </p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold text-secondary">
                    Conversations
                  </h2>
                  <button
                    type="button"
                    aria-label="Refresh conversations"
                    onClick={() => refresh((v) => v + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-mist-600 hover:bg-white hover:text-primary"
                  >
                    <RefreshCw size={15} aria-hidden />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(null);
                    setNotice("");
                    setReplies([]);
                  }}
                  className="mt-2 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 text-xs font-semibold text-white hover:bg-secondary"
                >
                  <MessageSquare size={15} aria-hidden /> Start a question
                </button>
              </div>
              <div className="max-h-52 overflow-y-auto p-2 lg:max-h-[640px]">
                {questions.length === 0 && (
                  <p className="px-3 py-5 text-xs leading-relaxed text-mist-600">
                    {loading
                      ? "Loading conversations…"
                      : "The first conversation could be yours."}
                  </p>
                )}
                {questions.map((post) => (
                  <button
                    key={post.id}
                    type="button"
                    aria-pressed={selected?.id === post.id}
                    onClick={() => {
                      setSelected(post);
                      setReplies([]);
                      setLoading(true);
                      setNotice("");
                    }}
                    className={`mb-1 block w-full rounded-lg border p-3 text-left transition-colors ${selected?.id === post.id ? "border-primary/15 bg-white" : "border-transparent hover:bg-white"}`}
                  >
                    <span className="block truncate text-[11px] text-mist-600">
                      {post.author_name}
                    </span>
                    <span className="mt-1 block line-clamp-2 text-sm font-medium leading-snug text-secondary">
                      {post.title}
                    </span>
                    <span className="mt-1.5 block text-[10px] text-primary">
                      {post.published ? "Open conversation" : "Awaiting review"}
                    </span>
                  </button>
                ))}
              </div>
              {(page > 0 || questions.length === 20) && (
                <div className="flex justify-between border-t border-mist-200 px-4 py-2">
                  <button
                    disabled={page === 0}
                    type="button"
                    onClick={() => setPage((v) => v - 1)}
                    className="min-h-9 text-xs text-primary disabled:opacity-30"
                  >
                    Previous
                  </button>
                  <button
                    disabled={questions.length < 20}
                    type="button"
                    onClick={() => setPage((v) => v + 1)}
                    className="min-h-9 text-xs text-primary disabled:opacity-30"
                  >
                    Next
                  </button>
                </div>
              )}
              <p className="hidden border-t border-mist-200 px-4 py-4 text-[11px] leading-relaxed text-mist-600 lg:block">
                Healthcare teams, shared experience.
                <br />
                Contributions are reviewed before publication.
              </p>
            </aside>
            <div className="flex min-w-0 flex-col">
              <div className="flex min-h-20 items-center gap-3 border-b border-mist-200 px-4 py-3 sm:px-6">
                {selected && (
                  <button
                    type="button"
                    aria-label="Back to all conversations"
                    onClick={() => {
                      setSelected(null);
                      setNotice("");
                    }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-primary hover:bg-primary/5"
                  >
                    <ArrowLeft size={17} aria-hidden />
                  </button>
                )}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary">
                  <MessageSquare size={19} strokeWidth={1.5} aria-hidden />
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-semibold text-secondary">
                    {selected?.title ?? "HEFAMAA support lounge"}
                  </h2>
                  <p className="mt-1 text-[11px] text-mist-600">
                    {selected
                      ? "A shared conversation"
                      : "Registration · Renewals · Facility operations"}
                  </p>
                </div>
              </div>
              <div
                className="min-h-64 max-h-[480px] overflow-y-auto bg-mist-50/60 px-4 py-6 sm:px-6 lg:h-[380px]"
                aria-label="Messages"
              >
                {!communityDb ? (
                  <div className="mx-auto max-w-sm py-8 text-center">
                    <h3 className="text-base font-semibold text-secondary">
                      The room is getting ready.
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist-600">
                      Public conversations will appear here when posting opens.
                    </p>
                  </div>
                ) : (
                  <>
                    {!selected && (
                      <div className="mb-6 border-b border-mist-200 pb-5">
                        <p className="text-xs font-medium text-primary">
                          Welcome to the room
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-secondary">
                          A little shared knowledge goes a long way.
                        </h3>
                        <p className="mt-2 max-w-lg text-sm leading-relaxed text-mist-600">
                          Open a conversation to read and reply, or start a
                          question below. Your experience could help another
                          healthcare team.
                        </p>
                      </div>
                    )}
                    {selected && postCard(selected, true)}
                    {loading && (
                      <p role="status" className="py-4 text-xs text-mist-600">
                        Loading messages…
                      </p>
                    )}
                    {!loading &&
                      (selected ? replies : questions).length === 0 && (
                        <p className="py-5 text-sm leading-relaxed text-mist-600">
                          {selected
                            ? "No replies yet. Be the first to add to this conversation."
                            : "No questions yet. Start with something you would like to understand."}
                        </p>
                      )}
                    <div className="space-y-5">
                      {(selected ? replies : questions).map((post) =>
                        postCard(post, !selected),
                      )}
                    </div>
                  </>
                )}
              </div>
              {!selected && (
                <div className="border-t border-mist-200 bg-white p-4 sm:p-5">
                  <h3 className="text-sm font-semibold text-secondary">
                    {selected ? "Join this conversation" : "Ask the community"}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-mist-600">
                    Messages appear publicly after review. Keep patient details
                    and confidential information private.
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
                        {communityDb
                          ? "Continue with Google"
                          : "Posting opens soon"}
                      </button>
                      <p className="mt-3 text-xs text-mist-600">
                        Read the room freely. Sign in to join the conversation.
                      </p>
                    </>
                  ) : (
                    <form
                      key="new-question"
                      onSubmit={submit}
                      aria-busy={busy}
                      className="mt-3 space-y-3"
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
                          rows={2}
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
                          I understand my name and contribution will be public
                          after review.{" "}
                          <Link
                            href="/privacy/"
                            className="text-primary underline"
                          >
                            Privacy notice
                          </Link>
                        </span>
                      </label>
                      <button
                        disabled={busy}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
