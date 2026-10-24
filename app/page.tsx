import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ActivityCard from "@/components/ActivityCard";
import ButtonLink from "@/components/ButtonLink";
import Faq from "@/components/Faq";
import HeroLines from "@/components/HeroLines";
import HeroShapes, { type HeroPhoto } from "@/components/HeroShapes";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { activities } from "@/lib/activities";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Corporate Team Building in Sarajevo | Sarajevo Team Building",
  },
  description:
    "Corporate team building in Sarajevo: a tablet city race, a movie making challenge and an Old Town challenge. Run in English for groups of 10 to 500.",
  alternates: { canonical: "/" },
};

const clients = [
  { name: "Deloitte", src: "/images/clients/deloitte.webp", width: 397, height: 78, displayHeight: 20 },
  { name: "Knauf", src: "/images/clients/knauf.webp", width: 468, height: 301, displayHeight: 40 },
  { name: "Bosch", src: "/images/clients/bosch.webp", width: 352, height: 85, displayHeight: 18 },
  { name: "L'Oréal", src: "/images/clients/loreal.webp", width: 473, height: 89, displayHeight: 20 },
  { name: "Viasat", src: "/images/clients/viasat.webp", width: 473, height: 135, displayHeight: 28 },
];

const heroPhotos: HeroPhoto[] = [
  {
    src: "/images/hero-tablet.webp",
    alt: "Colleagues solving a task together on a tablet in the Old Town",
    objectPosition: "45% 50%",
  },
  {
    src: "/images/hero-colors.webp",
    alt: "A team celebrating with colored powder on a hilltop",
    objectPosition: "55% 40%",
  },
  {
    src: "/images/hero-camera.webp",
    alt: "A colleague filming a teammate in a wig during a creative task",
    objectPosition: "60% 40%",
  },
];

const proofPoints = [
  { value: "Tailored", label: "proposal built around your objectives and event requirements" },
  { value: "Dedicated team", label: "our full team behind your event, from first brief to final debrief" },
  { value: "End-to-end", label: "planning, activities and equipment handled by us, with transfers and extras on request" },
  { value: "Any language", label: "briefings, quizzes and facilitation in the language your group needs" },
];

const logistics = [
  {
    title: "Duration & Flexibility",
    text: "Our team building experiences typically run between 1.5 and 3 hours, so they slot into conference breaks, morning sessions or afternoon gaps in your itinerary.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    title: "Location & Mobility",
    text: "Every activity starts and ends at a location you choose, in the city centre or at a key venue.",
    icon: (
      <>
        <path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
  {
    title: "Expert Facilitation",
    text: "Professional facilitators host and coordinate each event in the language your group needs, from the high-energy opening briefing to the final scoring.",
    icon: (
      <>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <path d="M16 5.5a3 3 0 010 5.5M18 14.3c1.8.8 3 2.5 3 4.7" />
      </>
    ),
  },
];

const faqs = [
  {
    q: "How far in advance should we secure a corporate team building event in Sarajevo?",
    a: "We recommend booking at least 4 to 8 weeks in advance, especially for high-season months (May-June and September-October), to guarantee coordinator availability and seamless activity logistics.",
  },
  {
    q: "Can your Sarajevo team building activities be customized for specific corporate objectives?",
    a: "Yes. Whether your goal is ice-breaking for international teams, leadership evaluation, or rewarding high performers, our facilitators adjust the puzzles and dynamics to match your company's core KPIs.",
  },
  {
    q: "What is the ideal group size for your Old Town and movie making experiences?",
    a: "Our corporate events are optimized for groups ranging from 10 to 500 participants. We split larger groups into strategic sub-teams to ensure maximum engagement, high-energy competition, and smooth coordination.",
  },
  {
    q: "Are your team building activities in Sarajevo suitable for international teams?",
    a: "Absolutely. All our corporate experiences, tablet quizzes, briefings, and live facilitators operate entirely in professional English, catering seamlessly to multinational corporate groups and expats.",
  },
  {
    q: "How do your activity-only services integrate with our existing event itinerary?",
    a: "As a specialized team building provider, we focus exclusively on executing the activity. We coordinate directly with your designated event planner or local DMC to align our start/end times and locations perfectly with your schedule.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: site.name,
              url: site.url,
              email: site.email,
              areaServed: { "@type": "City", name: "Sarajevo" },
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />

      {/* Hero */}
      <section className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden bg-gradient-to-b from-white via-white to-sand text-slate-deep">
        <HeroLines />

        <div className="mx-auto w-full max-w-7xl px-5 pb-12 pt-36 sm:px-8 lg:pb-40 lg:pt-40">
          <div className="max-w-3xl lg:max-w-[33rem] xl:max-w-xl">
            <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.28em] text-ember">
              Corporate team building in Sarajevo
            </p>
            <h1 className="animate-fade-up mt-6 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-slate-deep [animation-delay:100ms] sm:text-6xl lg:text-[3.5rem] xl:text-[4rem]">
              Team activities that make the most of{" "}
              <span className="text-ember">Sarajevo</span>.
            </h1>
            <p className="animate-fade-up mt-7 max-w-xl text-lg leading-relaxed text-charcoal-soft [animation-delay:200ms]">
              You are already bringing your team here. We give them something
              worth doing: a tablet city race, a movie making challenge and an
              Old Town challenge, led by local
              facilitators in English and timed around your itinerary.
            </p>
            <div className="animate-fade-up mt-10 flex flex-col gap-4 [animation-delay:300ms] sm:flex-row">
              <ButtonLink href="#experiences" variant="outlineDark" arrow={false}>
                Explore Experiences
              </ButtonLink>
              <ButtonLink href="/contact">Request a Proposal</ButtonLink>
            </div>
            <p className="animate-fade-up mt-5 text-sm text-charcoal-soft/80 [animation-delay:400ms]">
              Customized proposal after your inquiry. No obligation.
            </p>
          </div>
        </div>

        <HeroShapes photos={heroPhotos} />
      </section>

      {/* Proof bar: straddles the bottom edge of the hero and flows straight into the light activities section. */}
      <section aria-label="What you can count on" className="relative z-10 -mt-14 px-5 sm:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <ul className="grid divide-y divide-charcoal/10 border-t-2 border-ember bg-white shadow-2xl shadow-slate-night/25 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {proofPoints.map((p) => (
              <li key={p.value} className="p-7 sm:p-8">
                <p className="font-display text-xl font-semibold uppercase tracking-wide text-slate-deep">{p.value}</p>
                <p className="mt-2 text-sm leading-snug text-charcoal-soft">{p.label}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Experiences */}
      <section id="experiences" className="scroll-mt-14 bg-sand">
        <div className="mx-auto max-w-7xl px-5 pb-24 pt-24 sm:px-8 md:pb-32 md:pt-28">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ember">Signature experiences</p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-slate-deep sm:text-5xl">
                Three formats for three kinds of team
              </h2>
            </div>
            <p className="max-w-sm text-charcoal-soft">
              Each one can be shortened, combined or rewritten around your
              schedule, group size and goals.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {activities.map((a, i) => (
              <Reveal key={a.slug} delay={i * 120} className="h-full">
                <ActivityCard activity={a} tone="light" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Event logistics + client logos */}
      <section aria-labelledby="logistics-heading" className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ember">Event logistics &amp; execution</p>
              <h2
                id="logistics-heading"
                className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-slate-deep sm:text-5xl"
              >
                Fits the itinerary you already have
              </h2>
            </div>
            <Link
              href="/contact"
              className="group/link inline-flex items-center gap-2 self-start border-b border-ember pb-0.5 text-sm font-semibold text-slate-deep transition-colors duration-300 hover:text-ember md:self-auto"
            >
              Have us build yours
              <span aria-hidden className="transition-transform group-hover/link:translate-x-1">→</span>
            </Link>
          </Reveal>

          <ul className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {logistics.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={i * 120} className="h-full">
                  <div className="h-full border border-charcoal/10 bg-sand p-8 shadow-2xl shadow-slate-deep/10 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-ember/50 hover:shadow-slate-deep/20">
                    <span
                      aria-hidden
                      className="grid h-12 w-12 place-items-center rounded-sm border border-ember/30 bg-ember/10 text-ember"
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        {item.icon}
                      </svg>
                    </span>
                    <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-slate-deep">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-charcoal-soft">{item.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <div aria-labelledby="trust-heading" role="group" className="mt-24 border-t border-charcoal/10 pt-16">
            <h2
              id="trust-heading"
              className="text-center font-sans text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-soft"
            >
              Trusted by teams at
            </h2>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {clients.map((c) => (
                <li
                  key={c.name}
                  className="group grid h-20 place-items-center rounded-sm border border-charcoal/10 bg-white transition-colors duration-300 hover:border-ember/50"
                >
                  <Image
                    src={c.src}
                    alt={c.name}
                    width={c.width}
                    height={c.height}
                    className="w-auto opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ height: c.displayHeight }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-14 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <span aria-hidden className="block h-1 w-12 rounded-full bg-ember" />
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-ember">Questions planners ask</p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-slate-deep md:text-5xl">Before you commit</h2>
              <p className="mt-5 max-w-sm leading-relaxed text-charcoal-soft">
                Anything missing? Write to us and our team will respond.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-6 inline-flex max-w-full items-center gap-3 rounded-full border border-charcoal/15 bg-sand px-5 py-3 text-sm font-semibold text-slate-deep transition-colors duration-300 hover:border-ember hover:text-ember"
              >
                <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-ember" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                <span className="truncate">{site.email}</span>
              </a>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-8">
            <Faq items={faqs} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
