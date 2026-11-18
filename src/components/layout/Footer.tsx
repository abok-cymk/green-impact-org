// import { AppImage } from "@/components/ui/AppImage";
import NewsletterForm from "@/components/ui/NewsletterForm";
import { SocialMediaPlatform } from "@/components/ui/SocialMediaPlatform";
import { socialPlatforms } from "@/data/social";

export function Footer() {
  return (
    <footer className="border-t border-slate-100 px-6 py-12 text-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row">
        <div className="w-full md:max-w-md">
          {/* <div className="flex justify-start">
            <AppImage 
              src="images/logo.png" 
              alt="Green Impact Innovators" 
              className="w-40 h-auto rounded-none bg-none mix-blend-multiply" 
            />
          </div> */}
          {/* <p className="text-slate-600 text-sm leading-relaxed">
            Empowering learners and communities to tackle climate change through climate education and action.
          </p> */}
          
          {/* Form container - Ensure NewsletterForm styling uses green button accents */}
          <div className="mt-2 w-full">
            <NewsletterForm />
          </div>
        </div>

        <div className="flex w-full self-stretch flex-col items-start justify-between gap-5 md:w-auto md:items-end md:text-right">
          <div className="flex flex-col items-start gap-3 md:items-end">
            <a
              href="mailto:info@greenimpactinnovators.works"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-emerald-600"
              aria-label="Email Green Impact Innovators"
            >
              info@greenimpactinnovators.works
            </a>

            <nav
              className="flex flex-wrap items-center gap-4"
              aria-label="Green Impact Innovators social media"
            >
              {socialPlatforms.map((platform) => (
                <SocialMediaPlatform
                  key={platform.name}
                  platform={platform}
                />
              ))}
            </nav>
          </div>

          <p className="mt-auto w-full border-t border-slate-200 pt-4 text-xs text-slate-500 md:w-auto md:border-none md:pt-0">
            &copy; {new Date().getFullYear()} Green Impact Innovators. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
