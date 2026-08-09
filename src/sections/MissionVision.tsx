import { AppImage } from "@/components/ui/AppImage";
import { Compass, Target } from "lucide-react";

interface SectionData {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
}

export interface MissionVisionProps {
  vision: SectionData;
  mission: SectionData;
}

export default function MissionVision({ vision, mission }: MissionVisionProps) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-24 lg:gap-32">
          
          {/* Row 1: Vision (Image Left, Text Right on large screens) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Container */}
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-lg lg:order-1">
              {vision.image && vision.image !== "images/" ? (
                <AppImage
                  src={vision.image}
                  alt={vision.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                // Fallback elegant placeholder with natural tones
                <div className="flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-emerald-50 to-emerald-100/50 p-8 text-center">
                  <Compass className="h-12 w-12 text-emerald-700 animate-pulse" />
                  <span className="mt-4 text-sm font-medium text-emerald-800">Vision Image Placeholder</span>
                </div>
              )}
            </div>

            {/* Text Content */}
            <div className="flex flex-col justify-center lg:order-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800 w-fit">
                <Compass className="h-4 w-4" />
                {vision.eyebrow}
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {vision.title}
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                {vision.description}
              </p>
            </div>
          </div>

          {/* Row 2: Mission (Text Left, Image Right on large screens) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Container */}
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-lg lg:order-2">
              {mission.image && mission.image !== "images/" ? (
                <AppImage
                  src={mission.image}
                  alt={mission.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                // Fallback elegant placeholder with natural tones
                <div className="flex h-full w-full flex-col items-center justify-center bg-lineart-to-br from-emerald-50 to-emerald-100/50 p-8 text-center">
                  <Target className="h-12 w-12 text-emerald-700 animate-pulse" />
                  <span className="mt-4 text-sm font-medium text-emerald-800">Mission Image Placeholder</span>
                </div>
              )}
            </div>

            {/* Text Content */}
            <div className="flex flex-col justify-center lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800 w-fit">
                <Target className="h-4 w-4" />
                {mission.eyebrow}
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {mission.title}
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                {mission.description}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}