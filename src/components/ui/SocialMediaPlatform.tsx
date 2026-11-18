import type { SocialPlatform } from "@/data/social";
import { cn } from "@/lib/utils";

interface SocialMediaPlatformProps {
  platform: SocialPlatform;
  className?: string;
  iconClassName?: string;
}

export function SocialMediaPlatform({
  platform,
  className,
  iconClassName,
}: SocialMediaPlatformProps) {
  return (
    <a
      href={platform.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("transition-transform hover:scale-105", className)}
      aria-label={platform.label}
      title={platform.label}
    >
      <img
        src={platform.icon}
        alt={platform.name}
        className={cn("h-6 w-6 object-contain", iconClassName)}
      />
    </a>
  );
}
