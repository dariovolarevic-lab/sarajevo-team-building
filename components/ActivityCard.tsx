import Image from "next/image";
import Link from "next/link";
import type { Activity } from "@/lib/activities";
import ActivityArt from "./ActivityArt";

type Tone = "dark" | "light";

const shell: Record<Tone, string> = {
  dark: "border-white/10 bg-white/[0.04] shadow-2xl shadow-slate-night/60 backdrop-blur-md hover:border-ember-light/50 hover:bg-white/[0.07]",
  light:
    "border-charcoal/10 bg-white shadow-2xl shadow-slate-deep/10 hover:border-ember/50 hover:shadow-slate-deep/20",
};

const text: Record<Tone, { title: string; body: string; label: string; value: string; cta: string; rule: string }> = {
  dark: {
    title: "text-white/95 group-hover:text-ember-light",
    body: "text-white/70",
    label: "text-white/45",
    value: "text-white/90",
    cta: "text-white group-hover:text-ember-light",
    rule: "border-white/10",
  },
  light: {
    title: "text-slate-deep group-hover:text-ember",
    body: "text-charcoal-soft",
    label: "text-charcoal-soft/70",
    value: "text-charcoal",
    cta: "text-slate-deep group-hover:text-ember",
    rule: "border-charcoal/10",
  },
};

// One structure for every card, so heights, padding and hierarchy stay identical.
export default function ActivityCard({
  activity,
  tone = "dark",
}: {
  activity: Activity;
  tone?: Tone;
}) {
  const t = text[tone];
  const photo = activity.cardImage ?? (activity.image && { src: activity.image.src, alt: activity.image.alt, focus: activity.image.focus.card });
  return (
    <Link
      href={`/activities/${activity.slug}`}
      className={`group flex h-full flex-col overflow-hidden border transition-all duration-300 ease-in-out hover:-translate-y-2 ${shell[tone]}`}
    >
      <div className="relative h-52 shrink-0 overflow-hidden bg-slate-deep">
        {photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ objectPosition: photo.focus }}
          />
        ) : (
          <ActivityArt
            scene={activity.scene}
            className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <p
          className={`text-[11px] font-semibold uppercase tracking-[0.18em] md:min-h-9 lg:min-h-0 ${tone === "dark" ? "text-ember-light" : "text-ember"}`}
        >
          {activity.eyebrow}
        </p>
        <h3
          className={`mt-3 font-display text-2xl font-semibold leading-tight transition-colors duration-300 md:min-h-[4.75rem] md:text-xl lg:min-h-[3.75rem] lg:text-2xl ${t.title}`}
        >
          {activity.title}
        </h3>
        <p className={`mt-4 flex-1 text-[15px] leading-relaxed ${t.body}`}>{activity.summary}</p>

        <dl className={`mt-6 grid grid-cols-2 gap-4 border-t pt-5 ${t.rule}`}>
          <div>
            <dt className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${t.label}`}>Duration</dt>
            <dd className={`mt-1 text-sm font-medium ${t.value}`}>{activity.duration}</dd>
          </div>
          <div>
            <dt className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${t.label}`}>Group size</dt>
            <dd className={`mt-1 text-sm font-medium ${t.value}`}>{activity.groupSize}</dd>
          </div>
        </dl>

        <span className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${t.cta}`}>
          View the experience
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
