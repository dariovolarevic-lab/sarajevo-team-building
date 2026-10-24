"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { activities } from "@/lib/activities";
import { mainNav } from "@/lib/site";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Tuck away on a fast scroll down, return on any scroll up.
      if (y > last + 6 && y > 480) setHidden(true);
      else if (y < last - 6) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const onExperiences = pathname.startsWith("/activities");
  // The home page opens on a light hero, so the bar uses dark text until it turns solid.
  const slug = pathname.split("/")[2];
  const light =
    !scrolled &&
    !open &&
    (pathname === "/" || (pathname.startsWith("/activities/") && !!activities.find((a) => a.slug === slug)?.heroPhotos));

  return (
    <header
      className={`sticky top-0 z-50 -mb-[4.5rem] border-b transition-all duration-300 ease-in-out ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${
        open
          ? "border-white/10 bg-slate-night/95 backdrop-blur-md"
          : scrolled
            ? "border-white/10 bg-slate-night/80 shadow-xl shadow-slate-night/30 backdrop-blur-md"
            : "border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-300 sm:px-8 ${
          scrolled ? "h-14" : "h-[4.5rem]"
        }`}
      >
        <Link href="/" className={`flex items-center gap-2.5 ${light ? "text-slate-deep" : "text-white"}`} aria-label="Sarajevo Team Building, home">
          <Image src="/images/logo-mark.png" alt="" width={40} height={40} priority className="h-9 w-9 rounded-sm bg-white" />
          <span className="flex items-baseline gap-2">
          <span className="font-display text-xl font-semibold tracking-tight">Sarajevo</span>
          <span className={`hidden whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.22em] min-[430px]:inline ${light ? "text-charcoal-soft" : "text-white/60"}`}>
            Team Building
          </span>
          </span>
        </Link>

        <nav aria-label="Primary" className={`hidden items-center gap-8 text-sm lg:flex ${light ? "text-charcoal-soft" : "text-white/80"}`}>
          <div className="group relative">
            <Link
              href="/activities"
              className={`inline-flex items-center gap-1.5 py-5 transition-colors ${light ? "hover:text-slate-deep" : "hover:text-white"} ${onExperiences ? (light ? "text-slate-deep" : "text-white") : ""}`}
            >
              Experiences
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180">
                <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </Link>
            <div className="invisible absolute left-1/2 top-full w-80 -translate-x-1/2 translate-y-2 border border-white/10 bg-slate-night/95 p-2 opacity-0 shadow-2xl shadow-slate-night/60 backdrop-blur-md transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {activities.map((a) => (
                <Link
                  key={a.slug}
                  href={`/activities/${a.slug}`}
                  className="block rounded-sm px-4 py-3 transition-colors hover:bg-white/5"
                >
                  <span className="block font-display text-base text-white">{a.title}</span>
                  <span className="mt-0.5 block text-xs text-white/55">{a.eyebrow}</span>
                </Link>
              ))}
            </div>
          </div>

          {mainNav.map((l) => (
            <Link key={l.href} href={l.href} className={`transition-colors ${light ? "hover:text-slate-deep" : "hover:text-white"}`}>
              {l.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="rounded-sm bg-ember px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-ember/25 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-ember-dark hover:shadow-ember/40"
          >
            Request a Proposal
          </Link>
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-sm bg-ember px-4 py-2 text-xs font-semibold text-white sm:text-sm"
          >
            Request a Proposal
          </Link>
          <button
            type="button"
            className={`-mr-2 p-2 ${light ? "text-slate-deep" : "text-white"}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" />
              ) : (
                <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.75" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={`grid overflow-hidden transition-all duration-300 lg:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0">
          <div className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/10 px-5 pb-8 pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
              Experiences
            </p>
            <ul className="mt-2">
              {activities.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/activities/${a.slug}`}
                    tabIndex={open ? 0 : -1}
                    className="block border-b border-white/10 py-3.5 font-display text-lg text-white"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-4">
              {mainNav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    tabIndex={open ? 0 : -1}
                    className="block border-b border-white/10 py-3.5 text-white/80"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
