import Link from "next/link";
import { activities } from "@/lib/activities";
import { mainNav, site } from "@/lib/site";
import Skyline from "./Skyline";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-night text-white/70">
      <Skyline
        city="#10151f"
        hills="#232b3b"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 w-full opacity-70"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-28 pt-16 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-2xl text-white">Sarajevo Team Building</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Corporate team building in Sarajevo, designed and run by a local
            team. One named coordinator from first call to final invoice.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block border-b border-ember pb-0.5 text-sm font-semibold text-white transition-colors hover:text-ember-light"
          >
            Request a Proposal →
          </Link>
        </div>

        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">Experiences</p>
          <ul className="mt-4 space-y-3 text-sm">
            {activities.map((a) => (
              <li key={a.slug}>
                <Link href={`/activities/${a.slug}`} className="transition-colors hover:text-white">
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-3 text-sm">
            {mainNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">Contact</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 pb-24 text-xs text-white/45 sm:flex-row sm:justify-between sm:px-8 md:pb-6">
          <p>© {new Date().getFullYear()} Sarajevo Team Building. All rights reserved.</p>
          <p>Corporate team building · Sarajevo, Bosnia and Herzegovina</p>
        </div>
      </div>
    </footer>
  );
}
