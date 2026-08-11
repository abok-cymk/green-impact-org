import { AppImage } from "@/components/ui/AppImage"
import type { LucideIcon } from "lucide-react"

interface MissionVisionRowProps {
  eyebrow: string
  title: string
  description: string
  image: string
  imagePosition: "left" | "right"
  IconComponent: LucideIcon
  placeholderLabel: string
}

export function MissionVisionRow({
  eyebrow,
  title,
  description,
  image,
  imagePosition,
  IconComponent,
  placeholderLabel,
}: MissionVisionRowProps) {
  const isImageLeft = imagePosition === "left"

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* Image Container */}
      <div
        className={`hidden sm:block relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-lg ${
          isImageLeft ? "lg:order-1" : "lg:order-2"
        }`}
      >
        {image && image !== "images/" ? (
          <AppImage
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-emerald-50 to-emerald-100/50 p-8 text-center">
            <IconComponent className="h-12 w-12 text-emerald-700 animate-pulse" />
            <span className="mt-4 text-sm font-medium text-emerald-800">
              {placeholderLabel}
            </span>
          </div>
        )}
      </div>

      {/* Text Content */}
      <div
        className={`flex flex-col justify-center ${
          isImageLeft ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-800 w-fit">
          <IconComponent className="h-4 w-4" />
          {eyebrow}
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h2>
        <p className="mt-6 text-lg leading-8 text-slate-600">{description}</p>
      </div>
    </div>
  )
}
