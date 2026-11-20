import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PROFILE } from '../../data/profile';

export interface NavItem {
  id: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'education', label: 'Education' },
  { id: 'resume', label: 'Resume' },
];

interface NavbarProps {
  activeSection: string;
}

export function Navbar({ activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleNavigate = (id: string) => {
    setMobileOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#080A0E]/90 backdrop-blur-md border-b border-white/[0.08]'
          : 'bg-[#080A0E]/70 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setMobileOpen(false);
          }}
          className="font-display text-xl font-bold tracking-tight text-[#F5F7FA] hover:text-[#C6F36B] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6F36B] rounded-sm"
          aria-label={`${PROFILE.name} — Back to top`}
        >
          {PROFILE.monogram}
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(item.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6F36B] rounded-sm ${
                  isActive
                    ? 'text-[#F5F7FA]'
                    : 'text-[#A0AAB8] hover:text-[#F5F7FA]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-[#C6F36B] rounded-full"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary CTA + Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('contact');
            }}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#C6F36B] px-4 py-2 text-sm font-semibold text-[#080A0E] hover:bg-[#d4f78c] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F36B]"
          >
            Contact
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-lg border border-white/[0.1] bg-[#141A21] text-[#F5F7FA] hover:border-white/25 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F36B]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-navigation-drawer"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-t border-white/[0.08] bg-[#10141A] px-4 py-4 shadow-xl"
          >
            <div className="flex flex-col gap-1">
              {[...NAV_ITEMS, { id: 'contact', label: 'Contact' }].map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate(item.id);
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex min-h-[44px] items-center justify-between rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#1A212A] text-[#C6F36B]'
                        : 'text-[#A0AAB8] hover:bg-[#141A21] hover:text-[#F5F7FA]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="font-mono text-xs text-[#C6F36B]">Active</span>
                    )}
                  </a>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
