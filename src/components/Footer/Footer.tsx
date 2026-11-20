import { ArrowUp, Github, Mail } from 'lucide-react';
import { PROFILE } from '../../data/profile';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#10141A] py-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div>
          <p className="font-display text-base font-semibold text-[#F5F7FA]">
            {PROFILE.name}
          </p>
          <p className="mt-1 text-sm text-[#A0AAB8]">
            {PROFILE.role} · Built with curiosity and code.
          </p>
          <p className="mt-1 font-mono text-xs text-[#A0AAB8]/80 tabular-nums">
            © {currentYear} {PROFILE.name}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-white/[0.08] bg-[#141A21] px-3.5 py-2 text-xs font-medium text-[#A0AAB8] hover:text-[#F5F7FA] hover:border-white/25 transition-colors"
          >
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
            <span>GitHub</span>
          </a>

          <a
            href={`mailto:${PROFILE.email}`}
            aria-label="Send Email"
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-white/[0.08] bg-[#141A21] px-3.5 py-2 text-xs font-medium text-[#A0AAB8] hover:text-[#F5F7FA] hover:border-white/25 transition-colors"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Email</span>
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/[0.1] bg-[#1A212A] px-3.5 py-2 text-xs font-medium text-[#F5F7FA] hover:border-[#C6F36B]/50 hover:text-[#C6F36B] transition-colors"
          >
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
