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
  priority?: boolean
}

const IMAGEKIT_URL_BASE = `https://ik.imagekit.io/${IMAGE_KIT_ID}`
const DEFAULT_FALLBACK = "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80"

export function AppImage({
  src,
  alt,
  className,
  width,
  height,
  transformation,
  fallbackSrc = DEFAULT_FALLBACK,
  style,
  priority = false,
  ...props
}: AppImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    priority ? "loaded" : "loading"
  )

  const getImgSrc = (source: string) => {
    if (source.startsWith("http")) return source
    const localizedSrc = source.startsWith("/") ? source : `/${source}`
    const defaultTransform = width
      ? `w-${width},q-80,f-auto`
      : "w-800,q-80,f-auto"
    const activeTransform = transformation || defaultTransform
    return `${IMAGEKIT_URL_BASE}${localizedSrc}?tr=${activeTransform}`
  }

  const [imgSrc, setImgSrc] = useState<string>(() => getImgSrc(src))

  return (
    <div
      className="relative inline-block w-full overflow-hidden"
      style={{
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
        ...style,
      }}
    >
      {!priority && status === "loading" && (
        <Skeleton
          className={cn(
            "absolute inset-0 z-10 h-full w-full rounded-lg",
            className
          )}
        />
      )}

      {status === "error" && imgSrc === fallbackSrc ? (
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
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          {...props}
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          onLoad={() => !priority && setStatus("loaded")}
          onError={() => {
            if (imgSrc !== fallbackSrc) {
              setImgSrc(fallbackSrc)
              setStatus("loading")
            } else {
              setStatus("error")
            }
          }}
          className={cn(
            "rounded-lg object-cover",
            !priority && "transition-all duration-300 hover:scale-[1.02]",
            !priority && (status === "loading" ? "opacity-0" : "opacity-100"),
            priority && "opacity-100",
            className
          )}
        />
      )}
    </div>
  )
}
