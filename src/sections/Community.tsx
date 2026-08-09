import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { AppImage } from '@/components/ui/AppImage';
import { Users } from 'lucide-react';

// Replace these with your actual ImageKit paths for the 5 community images
const communityImages = [
  { src: 'images/community-01.webp', alt: 'Community members planting trees together' },
  { src: 'images/community-students.webp', alt: 'Students participating in tree watering' },
  { src: 'images/community-03.webp', alt: 'Local farmers learning climate-smart agriculture' },
  { src: 'images/community-02.webp', alt: 'Community gathering around the forest garden' },
  { src: 'images/community-student-01.webp', alt: 'Youth leaders presenting their eco-art' },
];

export function Community() {
  return (
    <Section id="community">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-brand-green mb-4">
          <Users className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-wider">Community Engagement</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Rooted in the Community
        </h2>
        <p className="text-slate-600 text-lg">
          Our forest garden isn't just a school project; it's a community movement. From cleanup drives to shared harvests, we grow together.
        </p>
      </div>

      {/* Bento Grid Layout for 5 Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-50 md:auto-rows-60">
        {communityImages.map((img, index) => {
          // First image spans 2 columns and 2 rows on medium+ screens
          const isHero = index === 0;
          
          return (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`
                relative rounded-2xl overflow-hidden group shadow-sm border border-slate-100
                ${isHero ? 'md:col-span-2 md:row-span-2' : 'col-span-1 row-span-1'}
              `}
            >
              <AppImage 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                transformation="w-800,h-600,c-fill"
              />
              
              {/* Subtle dark overlay on hover for premium feel */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
