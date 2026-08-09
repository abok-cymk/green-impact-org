import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { solutionPillars } from '@/data/content';

export function Solution() {
  return (
    <Section id="solution">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Our Solution: The Forest Garden Approach
        </h2>
        <p className="text-slate-600 text-lg">
          A low-cost, scalable model that integrates agriculture, environmental conservation, and youth leadership.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {solutionPillars.map((pillar, index) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md hover:border-brand-green/20 transition-all"
          >
            <div className="h-12 w-12 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green mb-6 group-hover:bg-brand-green group-hover:text-white transition-colors">
              <pillar.icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
            <p className="text-slate-600 leading-relaxed">{pillar.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
