import type { Metadata } from "next";
import ButtonLink from "@/components/ButtonLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="bg-slate-deep text-white">
      <div className="mx-auto max-w-3xl px-5 pb-28 pt-44 text-center sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-ember-light">404</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl">This page has moved or never existed</h1>
        <p className="mt-5 text-white/70">
          Head back to the homepage, or tell us about your event and we will take it from there.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <ButtonLink href="/" variant="outline" arrow={false}>Back to homepage</ButtonLink>
          <ButtonLink href="/contact">Request a Proposal</ButtonLink>
        </div>
      </div>
    </section>
  );
}
