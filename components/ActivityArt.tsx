import type { Scene } from "@/lib/activities";

const COPPER = "#e6a46d";
const SILVER = "#c9ced8";
const NIGHT = "#141a26";

const backdrop: Record<Scene, { from: string; to: string }> = {
  oldtown: { from: "#2a2018", to: "#74431f" },
  mountain: { from: "#1c2535", to: "#44587a" },
  cellar: { from: "#1e2333", to: "#424c75" },
};

// Monochrome illustrations (obsidian, silver and one copper accent) standing in for
// photography. Swap for next/image once real photos exist.
export default function ActivityArt({
  scene,
  className = "",
}: {
  scene: Scene;
  className?: string;
}) {
  const p = backdrop[scene];
  const id = `art-${scene}`;

  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor={p.from} />
          <stop offset="1" stopColor={p.to} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${id})`} />

      {scene === "oldtown" && (
        <>
          <circle cx="290" cy="96" r="46" fill={COPPER} opacity="0.5" />
          <g fill={NIGHT} opacity="0.55">
            <rect x="20" y="170" width="56" height="130" />
            <path d="M84 300V176a26 26 0 0152 0v124z" />
            <rect x="108" y="96" width="6" height="80" />
            <path d="M107 96l4-18 4 18z" />
            <rect x="150" y="190" width="70" height="110" />
            <rect x="230" y="150" width="54" height="150" />
            <path d="M236 150a21 21 0 0142 0z" />
            <rect x="300" y="196" width="100" height="104" />
          </g>
          <g fill={NIGHT}>
            <path d="M0 262h400v38H0z" />
            <path d="M0 262l30-22 34 22 36-30 40 30 42-24 38 24 44-28 40 28 38-24 58 24z" />
          </g>
          <g fill={COPPER}>
            <circle cx="60" cy="282" r="3" />
            <circle cx="140" cy="282" r="3" />
            <circle cx="220" cy="282" r="3" />
            <circle cx="300" cy="282" r="3" />
            <circle cx="360" cy="282" r="3" />
          </g>
        </>
      )}

      {scene === "mountain" && (
        <>
          <circle cx="84" cy="70" r="26" fill={SILVER} opacity="0.3" />
          <path d="M0 220L90 120l50 60 80-110 90 120 90-60v170H0z" fill={NIGHT} opacity="0.35" />
          <path d="M0 250l80-80 60 50 90-100 80 90 90-50v140H0z" fill={NIGHT} opacity="0.6" />
          <path d="M20 270L340 60" stroke={COPPER} strokeWidth="1.5" />
          <g transform="translate(206 160)">
            <path d="M0 0v14" stroke={COPPER} strokeWidth="1.5" />
            <rect x="-12" y="14" width="24" height="16" rx="2" fill={COPPER} />
            <rect x="-8" y="18" width="7" height="7" fill={NIGHT} opacity="0.6" />
            <rect x="1" y="18" width="7" height="7" fill={NIGHT} opacity="0.6" />
          </g>
          <path
            fill={NIGHT}
            d="M0 300V262l14-26 12 22 14-30 16 34 14-20 18 28 16-24 20 30 14-18 18 26 16-22 20 28 14-20 16 24 14-26 18 30 14-18 16 24 14-22 16 28v10z"
          />
        </>
      )}

      {scene === "cellar" && (
        <>
          <g fill={SILVER} opacity="0.8">
            <circle cx="40" cy="40" r="2" />
            <circle cx="96" cy="26" r="2" />
            <circle cx="150" cy="48" r="2" />
            <circle cx="214" cy="30" r="2" />
            <circle cx="270" cy="52" r="2" />
            <circle cx="330" cy="28" r="2" />
            <circle cx="372" cy="50" r="2" />
          </g>
          <path d="M20 22c60 24 120 24 180 4s120-20 180 8" stroke={SILVER} strokeWidth="1" fill="none" opacity="0.4" />
          <path d="M123 126h70l-5 40a30 30 0 01-60 0z" fill={COPPER} opacity="0.55" />
          <g stroke={SILVER} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M120 100h76l-8 66a30 30 0 01-60 0z" />
            <path d="M158 196v52M130 250h56" />
            <path d="M250 112h64l-6 56a26 26 0 01-52 0z" opacity="0.8" />
            <path d="M282 194v48M258 244h48" opacity="0.8" />
          </g>
          <path d="M0 268h400v32H0z" fill={NIGHT} opacity="0.7" />
        </>
      )}
    </svg>
  );
}
