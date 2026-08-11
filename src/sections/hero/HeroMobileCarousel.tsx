import { AppImage } from "@/components/ui/AppImage"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface HeroImageItem {
  src: string
  alt: string
}

interface HeroMobileCarouselProps {
  images: HeroImageItem[]
}

export function HeroMobileCarousel({ images }: HeroMobileCarouselProps) {
  return (
    <div className="group relative w-full lg:hidden">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <div>
                <div className="overflow-hidden bg-slate-100 shadow-xl">
                  <AppImage
                    src={img.src}
                    alt={img.alt}
                    priority={index === 0}
                    className="h-full w-full rounded-none object-cover"
                    transformation="w-800,h-800,c-fill"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute right-0 bottom-1.5 z-20 flex cursor-pointer items-center gap-1 bg-black/90 p-1 shadow-lg backdrop-blur-sm">
          <CarouselPrevious className="static top-auto right-auto bottom-auto left-auto h-8 w-8 translate-y-0 rounded-md border-none bg-transparent text-white hover:bg-white/20" />
          <CarouselNext className="static top-auto right-auto bottom-auto left-auto h-8 w-8 translate-y-0 rounded-md border-none bg-transparent text-white hover:bg-white/20" />
        </div>
      </Carousel>
    </div>
  )
}
