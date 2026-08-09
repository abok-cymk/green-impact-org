import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppImage } from '../ui/AppImage';

const navLinks = [
  { name: 'Mission', href: '#mission' },
  { name: 'Solution', href: '#solution' },
  { name: 'Impact', href: '#impact' },
  { name: 'Awards', href: '#awards' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/50 py-4' 
          : 'bg-transparent py-6'
      )}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          {/* <div className="h-8 w-8 rounded-full bg-brand-green flex items-center justify-center text-white font-bold text-sm">
            GII
          </div>
          <span className={cn(
            "font-bold text-lg tracking-tight transition-colors",
            isScrolled ? "text-slate-900" : "text-slate-900" 
          )}>
            Green Impact
          </span> */}
          <AppImage src='images/logo.png' alt='Green Impact Innovators' 
          className='w-40 rounded-none bg-none'/>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-brand-green transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#support"
            className="inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-lime transition-colors"
          >
            Support Us
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-slate-900"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-base font-medium text-slate-700 hover:text-brand-green"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#support"
                onClick={() => setIsMobileOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-brand-green px-5 py-3 text-base font-medium text-white text-center"
              >
                Support Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
