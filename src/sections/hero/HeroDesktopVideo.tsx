import { useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { AppVideo } from "@/components/ui/AppVideo"

export function HeroDesktopVideo() {
	const [isMuted, setIsMuted] = useState(true)

	return (
		<div className="relative hidden h-125 w-full lg:block">
			<div className="hero-video-wobble absolute inset-0 bg-green-200 shadow-2xl">
				<div className="hero-video-inner absolute inset-2 overflow-hidden">
					<AppVideo
						src="video/green_impact_innovators.mp4"
						autoPlay
						muted={isMuted}
						loop
						playsInline
						preload="metadata"
						aria-label="Green Impact Innovators video"
						className="h-full w-full object-cover"
						style={{ height: "100%" }}
					/>
				</div>
				<button
					type="button"
					aria-label={isMuted ? "Unmute video" : "Mute video"}
					aria-pressed={!isMuted}
					title={isMuted ? "Unmute video" : "Mute video"}
					onClick={() => setIsMuted((muted) => !muted)}
					className="absolute left-10 bottom-25 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-black/65 text-white shadow-lg backdrop-blur transition-colors hover:bg-black/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					{isMuted ? <VolumeX className="text-green-600"/> : <Volume2 className="text-green-600"/>}
				</button>
			</div>
		</div>
	)
}
