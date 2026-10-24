import Image from "next/image";
import Reveal from "@/components/Reveal";

export type AddOnIcon = "task" | "drink" | "costume" | "game" | "carpet" | "photo" | "screen" | "award";

export type AddOn = {
  icon: AddOnIcon;
  title: string;
  text: string;
  // Photo shown in the popover on hover or focus. Leave `src` out to show a placeholder.
  image: { src?: string; alt: string };
};

const icons: Record<AddOnIcon, React.ReactNode> = {
  task: (
    <>
      <path d="M5 4h11l3 3v13H5z" />
      <path d="M8 11h8M8 15h5" />
    </>
  ),
  drink: (
    <>
      <path d="M7 3h10l-1 8a4 4 0 01-8 0z" />
      <path d="M12 15v6M8.5 21h7" />
    </>
  ),
  costume: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
      <path d="M8 4.5l4-2.5 4 2.5" />
    </>
  ),
  game: (
    <>
      <rect x="3" y="7" width="18" height="11" rx="3" />
      <path d="M8 10.5v4M6 12.5h4" />
      <circle cx="15.5" cy="11.5" r="0.9" />
      <circle cx="18" cy="14" r="0.9" />
    </>
  ),
  carpet: (
    <>
      <path d="M8 3h8l3 18H5z" />
      <path d="M12 7v10" />
      <path d="M9.5 21h5" />
    </>
  ),
  photo: (
    <>
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <circle cx="12" cy="13" r="3.2" />
      <path d="M8.5 7l1.2-2.5h4.6L15.5 7" />
    </>
  ),
  screen: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M10 8.5v4l3.5-2z" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  award: (
    <>
      <path d="M8 4h8v5a4 4 0 01-8 0z" />
      <path d="M8 6H5v1.5A3 3 0 008 10.5M16 6h3v1.5a3 3 0 01-3 3" />
      <path d="M12 13v4M8.5 20h7M10 17h4" />
    </>
  ),
};

export default function AddOns({
  heading,
  subheading,
  intro,
  items,
}: {
  heading: string;
  subheading?: string;
  intro: string;
  items: AddOn[];
}) {
  return (
    <section aria-labelledby="addons-heading">
      <Reveal>
        <h2 id="addons-heading" className="font-display text-3xl font-semibold tracking-tight text-slate-deep">{heading}</h2>
        {subheading && <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-ember">{subheading}</h3>}
        <p className={`${subheading ? "mt-2" : "mt-4"} max-w-2xl leading-relaxed text-charcoal-soft`}>{intro}</p>
      </Reveal>
      <div className="mt-8 grid gap-x-5 gap-y-6 pt-2 sm:grid-cols-2">
        {items.map((a, i) => (
          <Reveal key={a.title} delay={i * 80} className="h-full">
            <div
              tabIndex={0}
              className="group relative h-full border-l-2 border-ember bg-white p-6 shadow-xl shadow-slate-deep/10 outline-none transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-slate-deep/20 focus-visible:ring-2 focus-visible:ring-ember"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-8 w-8 text-ember transition-transform duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {icons[a.icon]}
              </svg>
              <h3 className="mt-4 font-display text-xl font-semibold text-slate-deep">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{a.text}</p>

              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-full z-30 mb-3 translate-y-3 scale-95 opacity-0 shadow-2xl shadow-slate-night/40 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100 group-focus-visible:opacity-100"
              >
                <div className="relative aspect-square overflow-hidden border border-white/70 bg-mist ring-1 ring-charcoal/10">
                  {a.image.src ? (
                    <Image src={a.image.src} alt="" fill sizes="(min-width: 640px) 330px, 90vw" className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-mist to-white p-4 text-center">
                      <svg viewBox="0 0 24 24" className="h-7 w-7 text-ember/70" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="6" width="18" height="13" rx="1.5" />
                        <circle cx="12" cy="12.5" r="3.5" />
                        <path d="M8.5 6l1-2h5l1 2" />
                      </svg>
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal-soft/70">Photo coming soon</span>
                    </div>
                  )}
                </div>
                <span className="absolute -bottom-1.5 left-8 h-3 w-3 rotate-45 border-b border-r border-white/70 bg-white" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
