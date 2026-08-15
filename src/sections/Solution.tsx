import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { Sprout } from 'lucide-react';
import { solutionPillars } from '@/data/content';

export function Solution() {
  return (
    <Section id="solution" className="py-20 bg-linear-to-b from-slate-50/50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Container styled with precise desktop grid layout extracted from Front End Mentor challenge reference */}
        <div className="relative flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-8 items-start">
          
          {/* Left Column: Heading & Description */}
          <div className="flex flex-col gap-6 text-center lg:text-start lg:col-start-1 lg:col-span-5 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-wide uppercase mx-auto lg:mx-0 w-fit">
              <Sprout className="w-3.5 h-3.5" /> Our Core Approach
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold tracking-tight text-slate-900 leading-[110%]">
              Our Solution: <span className="text-emerald-600">The Forest Garden</span> Approach
            </h2>
            <p className="text-slate-600 text-base sm:text-base leading-relaxed">
              A low-cost, highly scalable model that seamlessly integrates climate-smart agriculture, environmental restoration, waste upcycling, and youth leadership to transform schools into hubs of resilience.
            </p>
          </div>

          {/* Right Column: Explicit Desktop Grid Placement matching LimitsSection.jsx reference */}
          <div className="flex flex-col gap-4 w-full sm:flex-row sm:flex-wrap sm:justify-center lg:contents">
            {solutionPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              
              // Exact grid positioning matching the 5-item staggered layout from LimitsSection reference
              const gridPositions = [
                "lg:col-start-8 lg:col-end-12 lg:row-start-1", // 1. Climate-Smart Food Production
                "lg:col-start-5 lg:col-end-9 lg:row-start-2", // 2. Tree Growing & Restoration
                "lg:col-start-9 lg:col-end-13 lg:row-start-2", // 3. Waste Management & Eco Art
                "lg:col-start-3 lg:col-end-7 lg:row-start-3", // 4. Youth Climate Leadership
                "lg:col-start-7 lg:col-end-11 lg:row-start-3", // 5. Community Resilience
              ];

              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100/80 border border-slate-100 hover:shadow-2xl hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between w-full ${gridPositions[index]}`}
                >
                  <div>
                    <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                    <span>Pillar 0{index + 1}</span>
                    <span className="w-8 h-px bg-emerald-200 group-hover:w-12 transition-all duration-300"></span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </Section>
  );
}
