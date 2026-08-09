import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AppImage } from '@/components/ui/AppImage';
import { heroContent } from '@/data/content';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const heroImages = [
  { src: 'images/tree-nursery-05.webp', alt: 'Students planting trees' },
  { src: 'images/forest-garden-approach-01.webp', alt: 'Forest garden spiral' },
  { src: 'images/gallery-05.webp', alt: 'Garden spiral' },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-off-white">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 z-10 px-6"
        >
          <div className="inline-flex items-center rounded-full border border-brand-green/20 bg-brand-green/5 px-3 py-1 text-sm font-medium text-brand-green">
            <span className="flex h-2 w-2 rounded-full bg-brand-green mr-2"></span>
            Green Impact Innovators
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
            {heroContent.headline}
          </h1>
          
          <p className="text-lg text-slate-600 max-w-lg">
            {heroContent.subheadline}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="inline-flex items-center justify-center rounded-md bg-brand-green px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-brand-lime transition-colors">
              Support Our Mission
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 transition-colors">
              View Impact
            </button>
          </div>
        </motion.div>

        {/* Right: Visuals */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full"
        >
          {/* MOBILE CAROUSEL */}
          <div className="lg:hidden w-full relative group">
            <Carousel className="w-full">
              <CarouselContent>
                {heroImages.map((img, index) => (
                  <CarouselItem key={index}>
                    <div>
                      <div className="overflow-hidden shadow-xl bg-slate-100">
                        <AppImage 
                          src={img.src} 
                          alt={img.alt} 
                          className="w-full h-full object-cover rounded-none"
                          transformation="w-800,h-800,c-fill"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              <div className="absolute cursor-pointer bottom-1.5 right-0 flex items-center gap-1 bg-black/90 backdrop-blur-sm p-1 z-20 shadow-lg">
                <CarouselPrevious 
                  className="static h-8 w-8 rounded-md bg-transparent text-white hover:bg-white/20 border-none translate-y-0 left-auto right-auto top-auto bottom-auto" 
                />
                <CarouselNext 
                  className="static h-8 w-8 rounded-md bg-transparent text-white hover:bg-white/20 border-none translate-y-0 left-auto right-auto top-auto bottom-auto" 
                />
              </div>
            </Carousel>
          </div>


          {/* DESKTOP OVERLAPPING LAYOUT (Visible on large screens) */}
          <div className="hidden lg:block relative h-125 w-full">
            {/* Main Image */}
            <div className="absolute top-0 right-0 w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-2xl z-10">
              <AppImage 
                src={heroImages[0].src} 
                alt={heroImages[0].alt} 
                className="w-full h-full object-cover"
                transformation="w-800,h-600,c-at_max"
              />
            </div>

            {/* Secondary Image */}
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 rounded-2xl overflow-hidden shadow-xl border-4 border-off-white z-20">
              <AppImage 
                src={heroImages[1].src} 
                alt={heroImages[1].alt} 
                className="w-full h-full object-cover"
                transformation="w-600,h-400,c-at_max"
              />
            </div>

            {/* Decorative Element */}
            <div className="absolute top-10 left-10 w-24 h-24 bg-brand-gold/20 rounded-full blur-2xl -z-10"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
