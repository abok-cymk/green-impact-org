import { lazy, Suspense } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/sections/Hero"
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider"
import { ImageMarquee } from "@/components/ui/ImageMarquee"
import { Footer } from "@/components/layout/Footer"
import MissionVision from "@/sections/MissionVision"
import { missionVision } from "@/data/mission-vision"
import { marqueeRow1, marqueeRow2, marqueeRow3 } from "@/data/marquees"
import { Skeleton } from "@/components/ui/skeleton"

// Lazy loaded below-the-fold sections for optimal Vite bundling and FCP
const Problem = lazy(() => import("@/sections/Problem").then(m => ({ default: m.Problem })))
const Solution = lazy(() => import("@/sections/Solution").then(m => ({ default: m.Solution })))
const Impact = lazy(() => import("@/sections/Impact").then(m => ({ default: m.Impact })))
const Community = lazy(() => import("@/sections/Community").then(m => ({ default: m.Community })))
const Awards = lazy(() => import("@/sections/Awards").then(m => ({ default: m.Awards })))
const Founder = lazy(() => import("@/sections/Founder").then(m => ({ default: m.Founder })))
const CTA = lazy(() => import("@/sections/CTA").then(m => ({ default: m.CTA })))

function SectionFallback() {
  return (
    <div className="w-full py-24 px-6 max-w-7xl mx-auto space-y-4">
      <Skeleton className="h-10 w-1/3 rounded-lg mx-auto" />
      <Skeleton className="h-64 w-full rounded-2xl" />
    </div>
  )
}

function App() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-off-white">
        <Navbar />
        <main>
          <Hero />
          <MissionVision
            vision={missionVision.vision}
            mission={missionVision.mission}
          />
          <Suspense fallback={<SectionFallback />}>
            <Problem />
            <Solution />
            <Impact />
            <ImageMarquee
              row1={marqueeRow1}
              row2={marqueeRow2}
              row3={marqueeRow3}
            />
            <Community />
            <Awards />
            <Founder />
            <CTA />
          </Suspense>
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  )
}

export default App
