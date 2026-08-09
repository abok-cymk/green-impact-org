import { AppImage } from "@/components/ui/AppImage";

export function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-900 py-12 px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <div className="mb-2 grid justify-center md:justify-start">
            <AppImage src="images/main-logo.webp" alt="Green Impact Innovators"
             className="w-40 h-40 object-cover"
            // transformation="w-600,h-750,c-fill"
            />
          </div>
          <p className="text-sm">Empowering school communities in Kisumu to tackle climate change.</p>
        </div>
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Green Impact Innovators. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
