import { Compass, Target } from "lucide-react"
import { MissionVisionRow } from "./mission-vision/MissionVisionRow"

interface SectionData {
  eyebrow: string
  title: string
  description: string
  image: string
}

export interface MissionVisionProps {
  vision: SectionData
  mission: SectionData
}

export default function MissionVision({ vision, mission }: MissionVisionProps) {
  return (
    <section
      id="mission-vision"
      className="relative overflow-hidden py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <MissionVisionRow
            eyebrow={vision.eyebrow}
            title={vision.title}
            description={vision.description}
            image={vision.image}
            imagePosition="left"
            IconComponent={Compass}
            placeholderLabel="Vision Image Placeholder"
          />

          <MissionVisionRow
            eyebrow={mission.eyebrow}
            title={mission.title}
            description={mission.description}
            image={mission.image}
            imagePosition="right"
            IconComponent={Target}
            placeholderLabel="Mission Image Placeholder"
          />
        </div>
      </div>
    </section>
  )
}
