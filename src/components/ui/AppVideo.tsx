import { useState, useRef } from "react"
import { IMAGE_KIT_ID } from "@/infrastructure/imagekit"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Play, Pause, VideoOff } from "lucide-react"

interface AppVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string
  width?: number
  height?: number
  className?: string
  transformation?: string
  fallbackSrc?: string
}

const IMAGEKIT_URL_BASE = `https://ik.imagekit.io/${IMAGE_KIT_ID}`
// Replace this with your actual fallback video path if needed
const DEFAULT_FALLBACK = "https://w3schools.com" 

export function AppVideo({
  src,
  className,
  width,
  height,
  transformation,
  fallbackSrc = DEFAULT_FALLBACK,
  style,
  autoPlay = false,
  muted = false,
  ...props
}: AppVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay)
  const [status, setStatus] = useState<"loading" | "loaded" | "error" >("loading")

  // Generates the ImageKit structure for video files
  const getVideoSrc = (source: string) => {
    if (source.startsWith("http")) return source
    const localizedSrc = source.startsWith("/") ? source : `/${source}`
    
    // ImageKit video transformations typically look like: f-auto,q-80 or no transform
    const defaultTransform = "f-auto,q-80"
    const activeTransform = transformation || defaultTransform
    return `${IMAGEKIT_URL_BASE}${localizedSrc}?tr=${activeTransform}`
  }

  const [videoSrc, setVideoSrc] = useState<string>(() => getVideoSrc(src))

  // Custom play/pause trigger
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevents unwanted double triggers if nesting
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((err) => console.error("Video play interrupted:", err))
    }
  }

  return (
    <div
      className="group relative inline-block w-full overflow-hidden rounded-lg bg-black"
      style={{
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
        ...style,
      }}
    >
      {/* Loading Skeleton state */}
      {status === "loading" && (
        <Skeleton
          className={cn(
            "absolute inset-0 z-10 h-full w-full rounded-lg",
            className
          )}
        />
      )}

      {/* Error / Fallback State */}
      {status === "error" && videoSrc === fallbackSrc ? (
        <div
          className={cn(
            "flex h-full min-h-37.5 w-full flex-col items-center justify-center gap-2 rounded-lg border bg-muted text-muted-foreground",
            className
          )}
        >
          <VideoOff className="h-6 w-6 stroke-[1.5]" />
          <span className="text-xs">Video unavailable</span>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            src={videoSrc}
            width={width}
            height={height}
            autoPlay={autoPlay}
            muted={muted}
            onLoadedData={() => setStatus("loaded")}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => {
              if (videoSrc !== fallbackSrc) {
                setVideoSrc(fallbackSrc)
                setStatus("loading")
              } else {
                setStatus("error")
              }
            }}
            className={cn(
              "h-full w-full object-cover transition-opacity duration-300",
              status === "loading" ? "opacity-0" : "opacity-100",
              className
            )}
            {...props}
          />

          {/* Interactive Play/Pause Overlay Controls */}
          {status === "loaded" && (
            <div 
              onClick={togglePlay}
              className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center bg-black/10 opacity-0 transition-opacity duration-200 group-hover:bg-black/30 group-hover:opacity-100"
            >
              <button
                type="button"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black shadow-lg backdrop-blur-sm transition-transform duration-200 hover:scale-110 active:scale-95"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6 fill-current stroke-[1.5]" />
                ) : (
                  <Play className="h-6 w-6 translate-x-0.5 fill-current stroke-[1.5]" />
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
