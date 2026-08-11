import { motion } from "framer-motion"
import { HeroContent } from "./hero/HeroContent"
import { HeroMobileCarousel } from "./hero/HeroMobileCarousel"
import { HeroDesktopVisual } from "./hero/HeroDesktopVisual"

const heroImages = [
  { src: "images/tree-nursery-05.webp", alt: "Students planting trees" },
  { src: "images/forest-garden-approach-01.webp", alt: "Forest garden spiral" },
  { src: "images/gallery-05.webp", alt: "Garden spiral" },
]

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-off-white pt-24 pb-12">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <HeroContent />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full"
        >
          <HeroMobileCarousel images={heroImages} />
          <HeroDesktopVisual images={heroImages} />
        </motion.div>
      </div>
    </section>
  )
}
