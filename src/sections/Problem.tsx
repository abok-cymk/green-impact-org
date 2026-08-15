import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { problemStats } from '@/data/content';
import { AlertTriangle } from 'lucide-react';

export function Problem() {
  return (
    <Section id="problem" className="bg-linear-to-b from-slate-50/50 to-white">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 text-emerald-800 mb-4 bg-emerald-100 rounded-full w-fit px-3 py-1">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">The Crisis</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
            Climate change is turning hunger into a learning crisis.
          </h2>
          <p className="text-slate-900 text-base leading-relaxed">
            In Kisumu County, over 300 learners at St. Mary's Nyalenda miss lunch daily. 
            According to the FAO (2023), 63% of Kenyans face moderate to severe food insecurity. 
            Hunger is the hidden reason many learners are falling behind, and climate change is making it worse.
          </p>
        </motion.div>

        <div className="grid gap-6">
          {problemStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm"
            >
              <div className="text-4xl font-bold text-brand-green mb-2">{stat.value}</div>
              <div className="text-slate-800 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
