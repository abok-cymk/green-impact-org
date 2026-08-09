import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { AppImage } from '@/components/ui/AppImage';
import { Quote } from 'lucide-react';

export function Founder() {
  return (
    <Section id="founder">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="aspect-4/5 rounded-2xl overflow-hidden shadow-xl bg-slate-100">
            <AppImage 
              src="images/ambrose.jpeg" 
              alt="Ambrose Okwach Odima, Founder of Green Impact Innovators" 
              className="w-full h-full object-cover"
              transformation="w-600,h-750,c-fill"
            />
          </div>
          {/* Decorative accent */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-gold/20 rounded-full blur-2xl -z-10" />
        </motion.div>

        {/* Text Side */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <p className="text-brand-green font-semibold uppercase tracking-wider text-sm">
              A Vision Rooted in Action
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              "Climate action couldn't just be a theory—it had to be a meal."
            </h2>
          </div>

          <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
            <p>
              I hold a Bachelor's degree in Horticulture, but my real education happened in the soil of St. Mary's Nyalenda. When I saw over 300 learners missing lunch daily, I knew we had to act.
            </p>
            <p>
              Green Impact Innovators is our answer: a low-cost, scalable forest garden that feeds bodies, restores our local environment, and teaches the next generation how to survive and thrive in a changing climate.
            </p>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
              <Quote className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Ambrose Okwach Odima</p>
              <p className="text-sm text-slate-500">Founder & Lead Educator</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
