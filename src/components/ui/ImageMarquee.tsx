import { AppImage } from './AppImage';

interface ImageMarqueeProps {
  row1: { src: string; alt: string }[];
  row2: { src: string; alt: string }[];
  row3: { src: string; alt: string }[];
}

export function ImageMarquee({ row1, row2, row3 }: ImageMarqueeProps) {
  const loop = (arr: typeof row1) => [...arr, ...arr];

  return (
    <div className="relative flex flex-col gap-6 overflow-hidden py-16 bg-off-white">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-off-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-off-white to-transparent z-10" />

      {/* Row 1: Scrolls Left (Forward) */}
      <div className="flex gap-6 w-max animate-marquee hover:paused">
        {loop(row1).map((img, i) => (
          <div key={`r1-${i}`} className="w-72 h-52 shrink-0 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
            <AppImage src={img.src} alt={img.alt} className="w-full h-full object-cover" transformation="w-400,h-300,c-fill" />
          </div>
        ))}
      </div>

      {/* Row 2: Scrolls Right (Reverse) */}
      <div className="flex gap-6 w-max animate-marquee-reverse hover:paused">
        {loop(row2).map((img, i) => (
          <div key={`r2-${i}`} className="w-72 h-52 shrink-0 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
            <AppImage src={img.src} alt={img.alt} className="w-full h-full object-cover" transformation="w-400,h-300,c-fill" />
          </div>
        ))}
      </div>

      {/* Row 3: Scrolls Left (Forward) */}
      <div className="flex gap-6 w-max animate-marquee hover:paused">
        {loop(row3).map((img, i) => (
          <div key={`r3-${i}`} className="w-72 h-52 shrink-0 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
            <AppImage src={img.src} alt={img.alt} className="w-full h-full object-cover" transformation="w-400,h-300,c-fill" />
          </div>
        ))}
      </div>
    </div>
  );
}
