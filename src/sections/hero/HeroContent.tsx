import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { heroContent } from "@/data/content"

export function HeroContent() {
  return (
    <div className="z-10 space-y-6 px-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center rounded-full border border-brand-green/20 bg-emerald-100 px-3 py-1 text-sm font-medium text-brand-green"
      >
        <span className="mr-2 flex h-2 w-2 rounded-full bg-brand-green"></span>
        empower.act.impact
      </motion.div>

      {/* H1 is critical for LCP - rendered immediately without motion delay */}
      <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-slate-900 md:text-6xl font-display">
        {heroContent.headline}
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-lg text-lg text-slate-600"
      >
        {heroContent.subheadline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-wrap gap-4 pt-4"
      >
        <a
          href="#support"
          className="inline-flex items-center justify-center rounded-md bg-brand-green px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-lime"
        >
          Support Our Mission <ArrowRight className="ml-2 h-4 w-4" />
        </a>

        <a
          href="#impact"
          className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 shadow-sm transition-colors hover:bg-slate-50"
        >
          View Impact
        </a>
      </motion.div>
    </div>
  )
}
