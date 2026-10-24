import type { Metadata } from "next";
import { Suspense } from "react";
import ProposalForm from "@/components/ProposalForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Proposal",
  description:
    "Tell us about your group and receive a customized corporate team building proposal for Sarajevo, tailored to your event requirements.",
  alternates: { canonical: "/contact" },
};

const timeline = [
  ["You submit the form", "A planner reviews your group size, objectives and event itinerary."],
  ["You receive a customized proposal", "Tailored to your event requirements, with the format, timings, what is included, your lead facilitator and per-participant pricing."],
  ["Booking lead time", "We recommend 4 to 8 weeks ahead, and longer for larger groups and high-season months (May-June, September-October)."],
];

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-slate-deep text-white">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_0%,rgba(168,90,36,0.24),transparent_50%)]"
        />
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-36 sm:px-8 md:pb-24 md:pt-44">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.26em] text-ember-light">Contact</p>
          <h1 className="animate-fade-up mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-white/95 [animation-delay:100ms] sm:text-5xl">
            Tell us about your group
          </h1>
          <p className="animate-fade-up mt-5 max-w-2xl text-lg text-white/75 [animation-delay:200ms]">
            A few details are enough to start. You will receive a customized
            proposal built around your event requirements, not a brochure.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-12">
        <div className="order-2 space-y-12 lg:order-1 lg:col-span-5">
          <section aria-labelledby="direct-heading">
            <h2 id="direct-heading" className="font-display text-2xl text-slate-deep">Speak to a planner</h2>
            <ul className="mt-5 space-y-5">
              <li>
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-charcoal-soft/70">Email</span>
                <a href={`mailto:${site.email}`} className="text-lg text-slate-deep underline-offset-4 transition-colors hover:text-ember hover:underline">
                  {site.email}
                </a>
              </li>
            </ul>
          </section>

          <section aria-labelledby="timeline-heading">
            <h2 id="timeline-heading" className="font-display text-2xl text-slate-deep">What happens next</h2>
            <ol className="mt-5 border-l border-charcoal/20">
              {timeline.map(([when, what]) => (
                <li key={when} className="relative pb-6 pl-6 last:pb-0">
                  <span aria-hidden className="absolute -left-[6px] top-1.5 h-3 w-3 rounded-full bg-ember ring-4 ring-sand" />
                  <p className="text-sm font-semibold text-slate-deep">{when}</p>
                  <p className="text-sm leading-relaxed text-charcoal-soft">{what}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-label="Map of Sarajevo">
            <div className="overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] ring-1 ring-charcoal/10">
              <iframe
                title="Map of Sarajevo, Bosnia and Herzegovina"
                src="https://www.google.com/maps?q=Sarajevo,+Bosnia+and+Herzegovina&z=12&output=embed"
                className="block h-80 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </section>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-7">
          <Suspense fallback={<div aria-hidden className="min-h-[44rem] bg-white shadow-2xl shadow-slate-deep/15 ring-1 ring-charcoal/5" />}>
            <ProposalForm />
          </Suspense>
        </div>
      </div>
    </>
  );
}
