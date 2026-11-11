"use client";

import {useState, useEffect } from "react";
import { IconBrandLinkedin } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LinkedInPulseIconProps {
  href: string;
  label: string;
  variant?: "overlay" | "inline";
  className?: string;
}

export function LinkedInPulseIcon({
  href,
  label,
  variant = "overlay",
  className,
}: LinkedInPulseIconProps) {
  const [isPulsing, setIsPulsing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPulsing(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (variant === "inline") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={cn(
          "inline-flex items-center justify-center align-middle rounded-md p-0.5 text-[#0A66C2] transition-colors hover:bg-accent",
          isPulsing && "animate-pulse ring-2 ring-[#0A66C2]/40 bg-[#0A66C2]/10",
          className
        )}
      >
        <IconBrandLinkedin className="h-8 w-8" />
      </a>
    );
  }

  return (
    <Button
      asChild
      size="icon"
      variant="secondary"
      className={cn(
        "h-11 w-11 rounded-full bg-white/95 shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white",
        isPulsing
          ? "opacity-100 animate-pulse ring-4 ring-[#0A66C2]/40"
          : "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
        className
      )}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        <IconBrandLinkedin className="h-6 w-6 text-[#0A66C2]" />
      </a>
    </Button>
  );
}
