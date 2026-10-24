import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "outline" | "outlineDark" | "dark" | "link";

const variants: Record<Variant, string> = {
  primary:
    "bg-ember text-white shadow-lg shadow-ember/25 hover:-translate-y-0.5 hover:bg-ember-dark hover:shadow-xl hover:shadow-ember/40 focus-visible:outline-white",
  outline:
    "border border-white/70 bg-slate-night/55 text-white shadow-lg shadow-slate-night/40 backdrop-blur-md hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-slate-deep",
  outlineDark:
    "border border-slate-deep/30 bg-white text-slate-deep shadow-lg shadow-slate-deep/10 hover:-translate-y-0.5 hover:border-slate-deep hover:bg-slate-deep hover:text-white",
  dark: "bg-slate-deep text-white shadow-lg shadow-slate-deep/20 hover:-translate-y-0.5 hover:bg-slate-mid",
  link: "text-slate-deep hover:text-ember px-0 py-0",
};

export default function ButtonLink({
  variant = "primary",
  arrow = true,
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; arrow?: boolean }) {
  const padding = variant === "link" ? "" : "px-7 py-3.5";
  return (
    <Link
      {...props}
      className={`group/btn inline-flex items-center justify-center gap-2 rounded-sm text-sm font-semibold tracking-wide transition-all duration-300 ease-in-out ${padding} ${variants[variant]} ${className}`}
    >
      {children}
      {arrow && (
        <span
          aria-hidden
          className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1"
        >
          →
        </span>
      )}
    </Link>
  );
}
