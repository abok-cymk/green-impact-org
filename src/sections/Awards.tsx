import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { AppImage } from '@/components/ui/AppImage';
import { awards } from '@/data/awards';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Awards() {
  return (
    <Section id="awards">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Recognized for Impact
        </h2>
        <p className="text-slate-600 text-lg">
          Honored by global institutions and local partners for our climate-smart approach.
        </p>
      </div>

      <div className="space-y-24">
        {awards.map((award, index) => (
          <motion.div
            key={award.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="grid md:grid-cols-12 gap-8 items-center"
          >
            {/* 1. Logo (Clickable) */}
            <div className="md:col-span-2 flex md:justify-center">
              <a 
                href={award.logoLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-slate-500 hover:text-brand-green transition-colors"
                title={`${award.logoLink ? `Visit ${award.orgName}` : `${award.orgName}`}`}
              >
                <AppImage 
                  src={award.logoSrc} 
                  alt={award.orgName} 
                  className="h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-all" 
                />
                {award.logoLink ? <ExternalLink className={cn("h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity", )} /> : null}
              </a>
            </div>

            {/* 2. Image Carousel */}
            <div className="md:col-span-5">
              <Carousel className="w-full max-w-sm mx-auto">
                <CarouselContent>
                  {award.images.map((img, i) => (
                    <CarouselItem key={i}>
                      <div className="p-1">
                        <div className="aspect-4/3 rounded-xl overflow-hidden shadow-lg border border-slate-100 bg-slate-100">
                          <AppImage 
                            src={img} 
                            alt={`${award.title} ceremony ${i + 1}`} 
                            className="w-full h-full object-cover"
                            transformation="w-600,h-450,c-fill"
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 h-8 w-8" />
                <CarouselNext className="right-2 h-8 w-8" />
              </Carousel>
            </div>

            {/* 3. Text Content */}
            <div className="md:col-span-5 space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold uppercase tracking-wider">
                {award.orgName}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                {award.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {award.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
