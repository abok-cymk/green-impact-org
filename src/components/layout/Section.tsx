import { cn } from "@/lib/utils";
import { SocialMediaPlatform } from "@/components/ui/SocialMediaPlatform"
import { socialPlatforms } from "@/data/social"

const heroPlatforms = socialPlatforms.filter(
  (platform) => platform.name !== "LinkedIn" && platform.name !== "WhatsApp"
);

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export function Section({ children, className, id, dark = false }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full py-16 md:py-24 px-6 md:px-12",
        dark ? "text-white" : "text-slate-900",
        className
      )}
    >
      <div className="mx-auto max-w-6xl relative">
      <div className="hidden lg:flex flex-col gap-3.5 absolute left-8 xl:-left-30 top-1/2 -translate-y-1/2 z-20">
        {heroPlatforms.map((platform) => (
          <SocialMediaPlatform
            key={platform.name}
            platform={platform}
            iconClassName="h-8 w-8"
          />
        ))}
      </div>
        {children}
      </div>
    </section>
  );
}
