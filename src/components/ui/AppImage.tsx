import { useState } from "react"
import { IMAGE_KIT_ID } from "@/infrastructure/imagekit"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ImageIcon } from "lucide-react"

interface AppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  transformation?: string
  fallbackSrc?: string
}

const IMAGEKIT_URL_BASE = `https://ik.imagekit.io/${IMAGE_KIT_ID}`
const DEFAULT_FALLBACK = "https://unsplash.com"

export function AppImage({
  src,
  alt,
  className,
  width,
  height,
  transformation,
  fallbackSrc = DEFAULT_FALLBACK,
  style,
  ...props
}: AppImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  )

  const localizedSrc = src.startsWith("/") ? src : `/${src}`

  const defaultTransform = width
    ? `w-${width},q-80,f-auto`
    : "w-800,q-80,f-auto"
  const activeTransform = transformation || defaultTransform

  const finalSrc = src.startsWith("http")
    ? src
    : `${IMAGEKIT_URL_BASE}${localizedSrc}?tr=${activeTransform}`

  return (
    <div
      className="relative inline-block w-full overflow-hidden"
      style={{
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
        ...style,
      }}
    >
      {status === "loading" && (
        <Skeleton
          className={cn(
            "absolute inset-0 z-10 h-full w-full rounded-lg",
            className
          )}
        />
      )}

      {status === "error" ? (
        <div
          className={cn(
            "flex h-full min-h-37.5 w-full flex-col items-center justify-center gap-2 rounded-lg border bg-muted text-muted-foreground",
            className
          )}
        >
          <ImageIcon className="h-6 w-6 stroke-[1.5]" />
          <span className="text-xs">Image unavailable</span>
        </div>
      ) : (
        <img
          {...props}
          src={finalSrc} 
          alt={alt}
          width={width}
          height={height}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={cn(
            "rounded-lg object-cover transition-all duration-300 hover:scale-[1.02]",
            status === "loading" ? "opacity-0" : "opacity-100",
            className
          )}
        />
      )}
    </div>
  )
}
