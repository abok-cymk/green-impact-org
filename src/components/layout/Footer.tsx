import { AppImage } from "@/components/ui/AppImage";
import NewsletterForm from "@/components/ui/NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-800 py-12 px-6 border-t border-slate-100">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-start gap-8">
        
        {/* Left Side: Branding and Subscription */}
        <div className="w-full md:max-w-md flex flex-col gap-4">
          <div className="flex justify-start">
            <AppImage 
              src="images/logo.png" 
              alt="Green Impact Innovators" 
              className="w-44 h-auto rounded-none bg-none object-contain" 
            />
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            Empowering school communities in Kisumu to tackle climate change.
          </p>
          
          {/* Form container - Ensure NewsletterForm styling uses green button accents */}
          <div className="mt-2 w-full">
            <NewsletterForm />
          </div>
        </div>

        {/* Right Side: Contact, Socials and Copyright */}
        <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-5 md:text-right self-stretch justify-between">
          <div className="flex flex-col items-start md:items-end gap-3">
            <a 
              href="mailto:info@greenimpactinnovators.works" 
              className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors" 
              aria-label="Email Green Impact Innovators"
            >
              info@greenimpactinnovators.works
            </a>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4 flex-wrap">
              <a 
                href="https://www.facebook.com/profile.php?id=61591609450557" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="transition-transform hover:scale-105" 
                aria-label="Facebook - Green Impact Innovators" 
                title="@Green Impact Innovators"
              >
                <img src="/facebook.svg" alt="Facebook" className="w-6 h-6 object-contain" />
              </a>
                <a 
                href="https://www.tiktok.com/@greenimpactinnovators?_r=1&_t=ZS-98sLjoAON9N" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="transition-transform hover:scale-105" 
                aria-label="TikTok - Green Impact Innovators" 
                title="@greenimpactinnovators"
              >
                <img src="/tiktok.svg" alt="TikTok" className="w-6 h-6 object-contain" />
              </a>
              <a 
                href="https://www.linkedin.com/groups/18521004" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="transition-transform hover:scale-105" 
                aria-label="LinkedIn - Green Impact Innovators" 
                title="@Green Impact Innovators"
              >
                <img src="/linkedin.webp" alt="LinkedIn" className="w-6 h-6 object-contain" />
              </a>
              <a 
                href="https://wa.me/254792931210" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="transition-transform hover:scale-105" 
                aria-label="WhatsApp 0792931210" 
                title="WhatsApp 0792931210"
              >
                <img src="/whatsapp.svg" alt="WhatsApp" className="w-6 h-6 object-contain" />
              </a>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="text-slate-500 text-xs mt-auto pt-4 md:pt-0 border-t border-slate-200 w-full md:border-none md:w-auto">
            &copy; {new Date().getFullYear()} Green Impact Innovators. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
