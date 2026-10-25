import Image from "next/image";
import { imagePreviews } from "@/lib/image-previews";

export type HeroPhoto = {
  src: string;
  alt: string;
  // CSS object-position, to crop the photo around the people.
  objectPosition: string;
};

type Shape = {
  // Position and size inside the cluster, in percent.
  box: string;
  // Clip path or border radius that gives the photo its shape.
  shape: React.CSSProperties;
  // Thin white lines drawn over the photo, as points on a 0-100 grid.
  lines: string[];
  delay: string;
};

// Large crystal on top, oval bottom left, tilted quad bottom right. Photos are matched by position.
const shapes: Shape[] = [
  {
    box: "left-[10%] top-[2%] h-[54%] w-[84%]",
    shape: { clipPath: "polygon(14% 0, 90% 6%, 100% 58%, 80% 100%, 8% 90%, 0 28%)" },
    lines: ["14,0 52,100", "90,6 8,90", "52,100 100,58", "0,28 90,6"],
    delay: "[animation-delay:150ms]",
  },
  {
    box: "left-0 top-[48%] h-[48%] w-[46%]",
    shape: { borderRadius: "58% 42% 52% 48% / 46% 56% 44% 54%" },
    lines: ["0,70 100,30", "30,0 70,100", "0,30 100,70"],
    delay: "[animation-delay:300ms]",
  },
  {
    box: "left-[40%] top-[56%] h-[40%] w-[58%]",
    shape: { clipPath: "polygon(10% 14%, 100% 0, 90% 88%, 0 100%)" },
    lines: ["10,14 90,88", "100,0 0,100", "55,7 45,94"],
    delay: "[animation-delay:450ms]",
  },
];

export default function HeroShapes({ photos }: { photos: HeroPhoto[] }) {
  return (
    <div
      className="relative aspect-[5/5] mx-5 mb-24 drop-shadow-[0_24px_30px_rgba(23,28,39,0.28)] sm:mx-8 lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:mb-0 lg:aspect-auto lg:w-[47%] lg:py-28 xl:right-[3%]"
    >
      <div className="relative h-full w-full">
        {shapes.slice(0, photos.length).map((s, i) => (
          <div key={i} className={`animate-fade-up absolute ${s.box} ${s.delay}`}>
            <div className="relative h-full w-full overflow-hidden bg-sand-dark" style={s.shape}>
              <Image
                src={photos[i].src}
                alt={photos[i].alt}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                priority
                placeholder={imagePreviews[photos[i].src]?.blurDataURL ? "blur" : "empty"}
                blurDataURL={imagePreviews[photos[i].src]?.blurDataURL}
                className="object-cover"
                style={{ objectPosition: photos[i].objectPosition }}
              />
              <div className="absolute inset-0 bg-slate-night/10" />
              <svg
                aria-hidden
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                fill="none"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="1.5"
              >
                {s.lines.map((l) => (
                  <polyline key={l} points={l} vectorEffect="non-scaling-stroke" />
                ))}
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
