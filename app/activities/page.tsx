import type { Metadata } from "next";
import Image from "next/image";
import ActivityCard from "@/components/ActivityCard";
import ButtonLink from "@/components/ButtonLink";
import Reveal from "@/components/Reveal";
import { activities } from "@/lib/activities";

export const metadata: Metadata = {
  title: "Team Building Experiences in Sarajevo",
  description:
    "Three signature corporate experiences in Sarajevo: a tablet city race, a movie making challenge and an Old Town challenge.",
  alternates: { canonical: "/activities" },
};

const hero = {
  src: "/images/trebevic-expedition.webp",
  alt: "Four colleagues on a stone terrace above Sarajevo at sunset, one filming with a camera and one holding a clapperboard",
};

export default function ActivitiesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-slate-deep text-white">
        {/* Desktop: full-bleed cover, text on the open sky and city on the left. */}
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          sizes="100vw"
          className="-z-20 hidden object-cover lg:block"
          style={{ objectPosition: "80% 50%" }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-slate-night/90 via-slate-night/60 via-40% to-transparent lg:block" />
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10 hidden h-44 bg-gradient-to-b from-slate-night/70 to-transparent lg:block" />

        <div className="mx-auto max-w-7xl px-5 pb-20 pt-[21rem] sm:px-8 md:pb-28 md:pt-[26rem] lg:pb-40 lg:pt-44">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.26em] text-ember-light [text-shadow:0_1px_12px_rgba(23,28,39,0.9)]">Experiences</p>
          <h1 className="animate-fade-up mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-white/95 [animation-delay:100ms] sm:text-6xl lg:max-w-xl xl:max-w-2xl">
            Three ways to spend a day or an evening in Sarajevo
          </h1>
          <p className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-white/80 [animation-delay:200ms] lg:max-w-xl">
            Each format can be arranged in your preferred language on request,
            subject to facilitator availability, and booked on its own or
            alongside the others. Pick the one that
            matches what your team needs, and we will fit it around your
            schedule.
          </p>

          {/* Tablet and phone: tall cover at the top, cropped on the people. */}
          <div className="absolute inset-x-0 top-0 -z-10 h-[27rem] md:h-[32rem] lg:hidden">
            <Image
              src={hero.src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "90% 50%" }}
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-slate-night/70 via-transparent via-30% to-slate-deep" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {activities.map((a, i) => (
            <Reveal key={a.slug} delay={i * 120} className="h-full">
              <ActivityCard activity={a} tone="light" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-slate-night text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-20 sm:px-8 md:flex-row md:items-center md:py-24">
          <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight text-white/95">
            Not sure which one fits? Tell us about the group.
          </h2>
          <ButtonLink href="/contact">Request a Proposal</ButtonLink>
        </div>
      </section>
    </>
  );
}
