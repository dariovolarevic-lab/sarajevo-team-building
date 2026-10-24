const W = 1440;
const H = 800;

// Closed wavy ring, like a contour line on a topographic map. Rounded so server and client markup match.
function ring(cx: number, cy: number, r: number, seed: number) {
  const steps = 72;
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const wobble =
      1 +
      0.07 * Math.sin(3 * a + seed) +
      0.045 * Math.sin(5 * a + seed * 1.7) +
      0.03 * Math.sin(2 * a + seed * 0.6);
    const x = cx + Math.cos(a) * r * wobble * 1.25;
    const y = cy + Math.sin(a) * r * wobble * 0.85;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ") + "Z";
}

const peaks = [
  { cx: 1060, cy: 400, rings: 15, start: 70, gap: 46, seed: 0.4 },
  { cx: 120, cy: 820, rings: 7, start: 80, gap: 52, seed: 2.1 },
];

export default function HeroLines() {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 -z-10 h-full w-full"
      fill="none"
      strokeWidth="1.2"
    >
      <defs>
        <linearGradient id="hero-lines-fade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="white" stopOpacity="0.15" />
          <stop offset="0.45" stopColor="white" stopOpacity="0.5" />
          <stop offset="1" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <mask id="hero-lines-mask">
          <rect width={W} height={H} fill="url(#hero-lines-fade)" />
        </mask>
      </defs>
      <g mask="url(#hero-lines-mask)">
        {peaks.map((p) =>
          Array.from({ length: p.rings }, (_, i) => (
            <path
              key={`${p.cx}-${i}`}
              d={ring(p.cx, p.cy, p.start + i * p.gap, p.seed + i * 0.22)}
              stroke={i % 4 === 0 ? "rgba(168,90,36,0.42)" : "rgba(32,36,44,0.16)"}
            />
          )),
        )}
      </g>
    </svg>
  );
}
