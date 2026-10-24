"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";

type Props = {
  label: string;
  items: { src?: string; alt: string; objectPosition?: string }[];
};

const GAP = 12;

export default function Gallery({ label, items }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const step = () => {
    const first = trackRef.current?.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + GAP : 0;
  };

  const updateActive = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const s = step();
    if (!s) return;
    setActive(Math.min(items.length - 1, Math.round(el.scrollLeft / s)));
  }, [items.length]);

  useEffect(() => {
    updateActive();
    window.addEventListener("resize", updateActive);
    return () => window.removeEventListener("resize", updateActive);
  }, [updateActive]);

  const goTo = (i: number) => {
    const clamped = Math.max(0, Math.min(items.length - 1, i));
    trackRef.current?.scrollTo({ left: clamped * step(), behavior: "smooth" });
  };

  return (
    <section aria-label={label} aria-roledescription="carousel">
      <Reveal>
        <div className="relative">
          <div
            ref={trackRef}
            onScroll={updateActive}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") { e.preventDefault(); goTo(active + 1); }
              if (e.key === "ArrowLeft") { e.preventDefault(); goTo(active - 1); }
            }}
            tabIndex={0}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-ember [&::-webkit-scrollbar]:hidden"
          >
            {items.map((g, i) => (
              <figure
                key={i}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${items.length}`}
                className="group relative aspect-[4/3] w-[86%] shrink-0 snap-start overflow-hidden rounded-sm bg-mist sm:w-[68%]"
              >
                {g.src ? (
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(min-width: 1024px) 520px, (min-width: 640px) 60vw, 86vw"
                    style={g.objectPosition ? { objectPosition: g.objectPosition } : undefined}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div
                    role="img"
                    aria-label={`Photo placeholder: ${g.alt}`}
                    className="flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-charcoal/25 bg-gradient-to-br from-mist to-white p-4 text-center"
                  >
                    <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7 text-ember/70" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="6" width="18" height="13" rx="1.5" />
                      <circle cx="12" cy="12.5" r="3.5" />
                      <path d="M8.5 6l1-2h5l1 2" />
                    </svg>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal-soft/70">Photo coming soon</span>
                  </div>
                )}
              </figure>
            ))}
            {/* Lets the last photo snap to the start so every dot is reachable. */}
            <div aria-hidden className="w-[calc(14%-12px)] shrink-0 sm:w-[calc(32%-12px)]" />
          </div>

          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            className="absolute left-3 top-[calc(50%-1.25rem)] hidden h-10 w-10 place-items-center rounded-full bg-white/90 text-slate-deep shadow-md transition hover:bg-white hover:text-ember disabled:pointer-events-none disabled:opacity-0 sm:grid"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 6-6 6 6 6" /></svg>
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => goTo(active + 1)}
            disabled={active >= items.length - 1}
            className="absolute right-3 top-[calc(50%-1.25rem)] hidden h-10 w-10 place-items-center rounded-full bg-white/90 text-slate-deep shadow-md transition hover:bg-white hover:text-ember disabled:pointer-events-none disabled:opacity-0 sm:grid"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6" /></svg>
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to photo ${i + 1}`}
                aria-current={i === active}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-ember" : "w-2 bg-charcoal/25 hover:bg-charcoal/50"}`}
              />
            ))}
          </div>
          <p className="text-xs font-semibold tabular-nums tracking-[0.16em] text-charcoal-soft/70">
            {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
