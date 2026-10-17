import type { Metadata } from "next";
import { CommunityReview } from "@/components/community-review";

export const metadata: Metadata = {
  title: "Review community contribution | Hurkify",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default function ReviewPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 pb-20 pt-32">
      <p className="eyebrow">Hurkify moderation</p>
      <h1 className="mb-7 mt-4 text-3xl font-semibold tracking-tight text-secondary">
        Review a contribution.
      </h1>
      <CommunityReview />
    </section>
  );
}
