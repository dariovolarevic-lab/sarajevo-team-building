import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ActivityArt from "@/components/ActivityArt";
import ActivityCard from "@/components/ActivityCard";
import ButtonLink from "@/components/ButtonLink";
import Faq from "@/components/Faq";
import AddOns from "@/components/AddOns";
import Gallery from "@/components/Gallery";
import HeroLines from "@/components/HeroLines";
import HeroShapes from "@/components/HeroShapes";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { activities, getActivity } from "@/lib/activities";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return activities.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const activity = getActivity(slug);
  if (!activity) return {};
  const url = `/activities/${activity.slug}`;
  return {
    title: activity.seo?.title ?? activity.title,
    description: activity.seo?.description ?? `${activity.summary} ${activity.duration}, ${activity.groupSize}.`,
    ...(activity.seo && { keywords: activity.seo.keywords }),
    alternates: { canonical: url },
    openGraph: {
      title: activity.seo?.title ?? activity.title,
      description: activity.seo?.description ?? activity.summary,
      url,
      type: "website",
      ...(activity.image && { images: [{ url: activity.image.src, alt: activity.image.alt }] }),
    },
  };
}

export default async function ActivityPage({ params }: Props) {
  const { slug } = await params;
  const activity = getActivity(slug);
  if (!activity) notFound();

  const related = activities.filter((a) => a.slug !== activity.slug);

  const facts: [string, string][] = [
    ["Duration", activity.duration],
    ["Group size", activity.groupSize],
    ["Setting", activity.setting],
    ["Season", activity.season],
    ["Best for", activity.bestFor],
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: activity.title,
          description: activity.summary,
          serviceType: "Corporate team building",
          areaServed: { "@type": "City", name: "Sarajevo" },
          provider: { "@type": "Organization", name: site.name, url: site.url },
          url: `${site.url}/activities/${activity.slug}`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: activity.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Experiences", item: `${site.url}/activities` },
            { "@type": "ListItem", position: 2, name: activity.title, item: `${site.url}/activities/${activity.slug}` },
          ],
        }}
      />

      {activity.heroPhotos ? (
        <section className="relative isolate flex flex-col justify-end overflow-hidden bg-gradient-to-b from-white via-white to-sand text-slate-deep lg:min-h-[44rem]">
          <HeroLines />
          <div className="mx-auto w-full max-w-7xl px-5 pb-12 pt-32 sm:px-8 md:pt-36 lg:pb-28 lg:pt-40">
            <nav aria-label="Breadcrumb" className="text-sm text-charcoal-soft">
              <Link href="/activities" className="transition-colors duration-300 hover:text-slate-deep">Experiences</Link>
              <span aria-hidden className="mx-2">/</span>
              <span className="text-slate-deep">{activity.title}</span>
            </nav>
            <div className="mt-10 lg:max-w-[33rem] xl:max-w-xl">
              <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.26em] text-ember">
                {activity.eyebrow}
              </p>
              <h1 className="animate-fade-up mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-slate-deep [animation-delay:100ms] sm:text-6xl">
                {activity.title}
              </h1>
              <p className="animate-fade-up mt-6 text-xl leading-relaxed text-charcoal-soft [animation-delay:200ms]">
                {activity.tagline}
              </p>
              <div className="animate-fade-up mt-9 flex flex-col gap-4 [animation-delay:300ms] sm:flex-row sm:items-center">
                <ButtonLink href={`/contact?experience=${activity.slug}`}>Request a Proposal</ButtonLink>
                <p className="text-sm text-charcoal-soft/80">{activity.duration} · {activity.groupSize}</p>
              </div>
            </div>
          </div>
          <HeroShapes photos={activity.heroPhotos} />
        </section>
      ) : (
      <section className="relative isolate overflow-hidden bg-slate-deep text-white">
        {activity.image && activity.image.layout === "cover" ? (
          <>
            {/* Full-bleed cover on desktop; the text sits on the open left side of the photo. */}
            <Image
              src={activity.image.src}
              alt={activity.image.alt}
              fill
              priority
              sizes="100vw"
              className="-z-20 hidden object-cover lg:block"
              style={{ objectPosition: activity.image.focus.desktop }}
            />
            <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-slate-night/95 via-slate-night/70 via-40% to-transparent lg:block" />
            <div className="absolute inset-x-0 top-0 -z-10 hidden h-44 bg-gradient-to-b from-slate-night/75 to-transparent lg:block" />
          </>
        ) : activity.image ? (
          <div
            aria-hidden
            className="absolute inset-0 -z-10 hidden bg-[radial-gradient(ellipse_at_85%_20%,rgba(168,90,36,0.26),transparent_55%)] lg:block"
          />
        ) : (
          <>
            <ActivityArt scene={activity.scene} className="absolute inset-0 -z-20 h-full w-full opacity-60" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-night/95 via-slate-night/75 to-slate-night/25" />
          </>
        )}
        <div
          className={`mx-auto max-w-7xl px-5 pb-20 sm:px-8 md:pb-28 ${
            activity.image
              ? `pt-[21rem] md:pt-[26rem] ${activity.image.layout === "cover" ? "lg:pb-44 lg:pt-40" : "lg:pb-28 lg:pt-40"}`
              : "pt-32 md:pt-40"
          }`}
        >
          <nav aria-label="Breadcrumb" className="text-sm text-white/65">
            <Link href="/activities" className="transition-colors duration-300 hover:text-white">Experiences</Link>
            <span aria-hidden className="mx-2">/</span>
            <span className="text-white/90">{activity.title}</span>
          </nav>
          <div
            className={`mt-10 ${
              activity.image?.layout === "framed" ? "grid items-center gap-12 lg:grid-cols-12" : ""
            }`}
          >
            <div
              className={
                activity.image?.layout === "cover"
                  ? "lg:max-w-xl xl:max-w-2xl"
                  : activity.image?.layout === "framed"
                    ? "lg:col-span-6"
                    : ""
              }
            >
              <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.26em] text-ember-light">
                {activity.eyebrow}
              </p>
              <h1 className="animate-fade-up mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white/95 [animation-delay:100ms] sm:text-6xl">
                {activity.title}
              </h1>
              <p className="animate-fade-up mt-6 max-w-2xl text-xl leading-relaxed text-white/80 [animation-delay:200ms]">
                {activity.tagline}
              </p>
              <div className="animate-fade-up mt-9 flex flex-col gap-4 [animation-delay:300ms] sm:flex-row sm:items-center">
                <ButtonLink href={`/contact?experience=${activity.slug}`}>Request a Proposal</ButtonLink>
                <p className="text-sm text-white/60">{activity.duration} · {activity.groupSize}</p>
              </div>
            </div>

            {activity.image?.layout === "framed" && (
              <div className="animate-fade-up relative hidden aspect-[2/1] overflow-hidden border border-white/15 shadow-2xl shadow-slate-night/60 [animation-delay:250ms] lg:col-span-6 lg:block">
                <Image
                  src={activity.image.src}
                  alt={activity.image.alt}
                  fill
                  priority
                  sizes="50vw"
                  className="object-cover"
                  style={{ objectPosition: activity.image.focus.desktop }}
                />
              </div>
            )}
          </div>

          {/* Tablet and phone: the photo becomes a tall cover at the top, cropped on the people. */}
          {activity.image && (
            <div className="absolute inset-x-0 top-0 -z-10 h-[27rem] md:h-[32rem] lg:hidden">
              <Image
                src={activity.image.src}
                alt={activity.image.alt}
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: activity.image.focus.mobile }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-night/70 via-transparent via-30% to-slate-deep" />
            </div>
          )}
        </div>
      </section>
      )}

      <div className={`mx-auto grid max-w-7xl gap-14 px-5 pb-24 sm:px-8 md:pb-32 lg:grid-cols-12 ${activity.introHeading ? "pt-14 md:pt-20" : "pt-8 md:pt-10"}`}>
        <div className="space-y-20 lg:col-span-8">
          <div className="animate-fade-up space-y-5 text-lg leading-relaxed text-charcoal-soft">
            {activity.introHeading && (
              <h2 className="pb-2 font-display text-3xl font-semibold leading-tight tracking-tight text-slate-deep sm:text-4xl">
                {activity.introHeading}
              </h2>
            )}
            {activity.intro.map((p, i) => (
              <p key={i} className={i === 0 ? "text-xl text-charcoal" : ""}>
                {p.split("**").map((part, j) => (j % 2 === 1 ? <strong key={j} className="font-semibold text-slate-deep">{part}</strong> : part))}
              </p>
            ))}
          </div>

          {activity.addons && <AddOns {...activity.addons} />}

          {activity.gallery ? (
            <Gallery {...activity.gallery} />
          ) : (
          <Reveal>
            <aside className="relative overflow-hidden bg-slate-deep p-8 text-white shadow-2xl shadow-slate-night/30 sm:p-10">
              <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ember/25 blur-3xl" />
              <p className="relative text-xs font-semibold uppercase tracking-[0.22em] text-ember-light">For the people booking it</p>
              <h2 className="relative mt-3 font-display text-2xl font-semibold tracking-tight text-white/95 sm:text-3xl">{activity.leaderNote.heading}</h2>
              <p className="relative mt-4 leading-relaxed text-white/75">{activity.leaderNote.text}</p>
              <ul className="relative mt-6 space-y-2 border-t border-white/15 pt-6 text-sm text-white/80">
                {activity.idealFor.map((i) => (
                  <li key={i} className="flex gap-3"><span aria-hidden className="text-ember-light">→</span>{i}</li>
                ))}
              </ul>
            </aside>
          </Reveal>
          )}

          <section aria-labelledby="flow-heading">
            <Reveal>
              <h2 id="flow-heading" className="font-display text-3xl font-semibold tracking-tight text-slate-deep">How the session runs</h2>
            </Reveal>
            <ol className="mt-8 border-l border-charcoal/20">
              {activity.flow.map((s, i) => (
                <li key={s.title} className="relative pl-8">
                  <span aria-hidden className="absolute -left-[6px] top-1.5 h-3 w-3 rounded-full bg-ember ring-4 ring-sand" />
                  <Reveal delay={i * 60} className="pb-10">
                    <h3 className="font-display text-xl text-slate-deep">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-charcoal-soft">{s.text}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </section>

          {activity.outcomes.length > 0 && (
            <section aria-labelledby="outcomes-heading">
              <Reveal>
                <h2 id="outcomes-heading" className="font-display text-3xl font-semibold tracking-tight text-slate-deep">What your team takes back</h2>
              </Reveal>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {activity.outcomes.map((o, i) => (
                  <Reveal key={o.title} delay={i * 100}>
                    <div className="h-full border-t-2 border-ember bg-white p-6 shadow-2xl shadow-slate-deep/10 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-slate-deep/20">
                      <h3 className="font-display text-lg font-semibold text-slate-deep">{o.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{o.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {!activity.gallery && (
            <Reveal>
              <section className="grid gap-10 sm:grid-cols-2">
                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-deep">What is included</h2>
                  <ul className="mt-5 space-y-3 text-charcoal-soft">
                    {activity.included.map((i) => (
                      <li key={i} className="flex gap-3"><span aria-hidden className="mt-0.5 text-ember">✓</span>{i}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-deep">Planning notes</h2>
                  <ul className="mt-5 space-y-3 text-charcoal-soft">
                    {activity.logistics.map((i) => (
                      <li key={i} className="flex gap-3"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />{i}</li>
                    ))}
                  </ul>
                </div>
              </section>
            </Reveal>
          )}

          <section aria-labelledby="faq-heading">
            <Reveal>
              <h2 id="faq-heading" className="mb-6 font-display text-3xl font-semibold tracking-tight text-slate-deep">Common questions</h2>
              <Faq items={activity.faq} />
            </Reveal>
          </section>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-24 border-t-2 border-ember bg-white p-8 shadow-2xl shadow-slate-deep/15">
            <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-slate-deep">At a glance</h2>
            <dl className="mt-6 divide-y divide-charcoal/10 text-sm">
              {facts.map(([k, v]) => (
                <div key={k} className="py-3">
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal-soft/70">{k}</dt>
                  <dd className="mt-1 text-charcoal">{v}</dd>
                </div>
              ))}
            </dl>
            <ButtonLink href={`/contact?experience=${activity.slug}`} className="mt-6 w-full">
              Request a Proposal
            </ButtonLink>
            <p className="mt-3 text-center text-xs text-charcoal-soft">
              Submit an inquiry to receive a customized proposal. No obligation.
            </p>
          </div>
        </aside>
      </div>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-deep">Pair it with</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {related.map((a) => (
              <ActivityCard key={a.slug} activity={a} tone="light" />
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-ember text-white">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_90%_0%,rgba(230,164,109,0.35),transparent_55%),linear-gradient(135deg,#a85a24,#8c4a1b)]"
        />
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-20 sm:px-8 md:flex-row md:items-center md:py-24">
          <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight">
            Want this for your group? Submit an inquiry and receive a customized proposal.
          </h2>
          <ButtonLink href={`/contact?experience=${activity.slug}`} variant="dark">Request a Proposal</ButtonLink>
        </div>
      </section>
    </>
  );
}
