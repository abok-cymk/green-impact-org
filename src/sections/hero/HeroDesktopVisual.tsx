import { AppImage } from "@/components/ui/AppImage"

interface HeroImageItem {
  src: string
  alt: string
}

interface HeroDesktopVisualProps {
  images: HeroImageItem[]
}

export function HeroDesktopVisual({ images }: HeroDesktopVisualProps) {
  return (
    <div className="relative hidden h-125 w-full lg:block">
      {/* Main Image - Priority for LCP */}
      <div className="absolute top-0 right-0 z-10 h-3/4 w-3/4 overflow-hidden rounded-2xl shadow-2xl">
        <AppImage
          src={images[0].src}
          alt={images[0].alt}
          priority
          className="h-full w-full object-cover"
          transformation="w-1000,h-800,c-at_max"
        />
      </div>

      {/* Secondary Image - Priority for LCP */}
      <div className="absolute bottom-0 left-0 z-20 h-1/2 w-1/2 overflow-hidden rounded-2xl border-4 border-off-white shadow-xl">
        <AppImage
          src={images[1].src}
          alt={images[1].alt}
          priority
          className="h-full w-full object-cover"
          transformation="w-600,h-400,c-at_max"
        />
      </div>

      {/* Decorative Element */}
      <div className="absolute top-10 left-10 -z-10 h-24 w-24 rounded-full bg-brand-gold/20 blur-2xl"></div>
    </div>
  )
}
