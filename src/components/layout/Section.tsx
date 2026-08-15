import { cn } from "@/lib/utils";

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
      <div className="mx-auto max-w-6xl">
        {children}
      </div>
    </section>
  );
}
