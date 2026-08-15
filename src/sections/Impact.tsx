import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { impactNumbers } from '@/data/content';

export function Impact() {
  return (
    <Section id="impact">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Real Impact, Real Fast
        </h2>
        <p className="text-slate-600 text-lg">
          From a single school in Kisumu to a model for climate resilience.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {impactNumbers.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
          >
            <div className="text-4xl md:text-5xl font-bold text-brand-green mb-2">
              {item.value}
            </div>
            <div className="text-sm md:text-base text-slate-600 font-medium">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
