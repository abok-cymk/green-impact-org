import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/sections/Hero"
import { Problem } from "@/sections/Problem"
import { Solution } from "@/sections/Solution"
import { Impact } from "@/sections/Impact"
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider"
import { ImageMarquee } from "@/components/ui/ImageMarquee"
import { Awards } from "@/sections/Awards"
import { CTA } from "@/sections/CTA"
import { Footer } from "@/components/layout/Footer"
import { Founder } from "@/sections/Founder"
import { Community } from "@/sections/Community"
import { marqueeRow1, marqueeRow2, marqueeRow3 } from "@/data/marquees"
import MissionVision from "@/sections/MissionVision"
import { missionVision } from "@/data/mission-vision"

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
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  )
}

export default App
