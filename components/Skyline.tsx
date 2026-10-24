const W = 1440;
const H = 260;

// [x, width, height]; deterministic so server and client markup always match.
const blocks: [number, number, number][] = [
  [0, 90, 60], [90, 70, 85], [160, 60, 50], [220, 80, 70], [300, 54, 96],
  [354, 90, 60], [444, 60, 80], [504, 100, 55], [604, 70, 75], [674, 60, 104],
  [734, 90, 60], [824, 70, 85], [894, 80, 55], [974, 60, 90], [1034, 100, 65],
  [1134, 70, 80], [1204, 90, 55], [1294, 60, 95], [1354, 90, 60],
];
const domeBlocks = [4, 9, 13];
const minarets: [number, number][] = [
  [338, 175], [520, 150], [712, 190], [1010, 165], [1182, 150], [1330, 180],
];

export default function Skyline({
  city = "#141a26",
  hills = "#2a3346",
  className = "",
}: {
  city?: string;
  hills?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden
    >
      <path
        d={`M0 150 C140 90 250 70 380 105 S600 40 760 76 S1010 20 1160 64 S1360 92 ${W} 52 V${H} H0Z`}
        fill={hills}
      />
      <path
        d={`M0 190 C180 150 320 140 470 165 S760 120 940 150 S1250 130 ${W} 160 V${H} H0Z`}
        fill={hills}
        opacity="0.55"
      />
      <g fill={city}>
        {blocks.map(([x, w, h], i) => (
          <g key={x}>
            <rect x={x} y={H - h} width={w} height={h} />
            {domeBlocks.includes(i) && (
              <path
                d={`M${x + 6} ${H - h} a${(w - 12) / 2} ${(w - 12) / 2} 0 0 1 ${w - 12} 0z`}
              />
            )}
          </g>
        ))}
        {minarets.map(([x, h]) => (
          <g key={x}>
            <rect x={x} y={H - h} width="7" height={h} />
            <rect x={x - 3} y={H - h + 34} width="13" height="4" />
            <path d={`M${x - 1} ${H - h} L${x + 3.5} ${H - h - 28} L${x + 8} ${H - h}z`} />
          </g>
        ))}
        <rect x="0" y={H - 14} width={W} height="14" />
      </g>
    </svg>
  );
}
