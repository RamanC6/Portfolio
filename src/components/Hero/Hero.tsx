import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Download, Github, Mail, Terminal } from 'lucide-react';
import { motion } from 'motion/react';
import { PROFILE } from '../../data/profile';

interface HeroProps {
  onDownloadResume: () => void;
  onOpenResumePreview: () => void;
}

const TERMINAL_LINES = [
  { prefix: '>', text: 'booting developer workspace' },
  { prefix: '>', text: `profile: ${PROFILE.name}` },
  { prefix: '>', text: 'stack: HTML5 / CSS3 / JavaScript ES6+' },
  { prefix: '>', text: 'languages: Python / Java / C' },
  { prefix: '>', text: 'database & tools: SQL / MySQL / Git / VS Code' },
  { prefix: '>', text: 'status: ready_to_build' },
];

const QUICK_CHIPS = [
  'HTML5',
  'CSS3',
  'JavaScript ES6+',
  'Python',
  'Java',
  'SQL',
  'Git',
];

export function Hero({ onDownloadResume, onOpenResumePreview }: HeroProps) {
  const [visibleLines, setVisibleLines] = useState(TERMINAL_LINES.length);
  const [workspaceTab, setWorkspaceTab] = useState<'terminal' | 'stack'>('terminal');

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisibleLines(TERMINAL_LINES.length);
      return;
    }

    setVisibleLines(1);
    const interval = window.setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= TERMINAL_LINES.length) {
          window.clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 260);

    return () => window.clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      className="relative border-b border-white/[0.08] pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          {/* Left Column: Primary Identity & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between lg:col-span-7"
          >
            <div>
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-mono text-[#A0AAB8]">
                <span className="text-[#C6F36B] font-medium">{PROFILE.availability}</span>
                <span className="hidden sm:inline" aria-hidden="true">·</span>
                <span>{PROFILE.location}</span>
              </div>

              <p className="mt-5 font-display text-base sm:text-lg font-medium text-[#70D9FF]">
                {PROFILE.name} — {PROFILE.role}
              </p>

              <h1 className="mt-2 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.08] text-[#F5F7FA] text-balance">
                {PROFILE.headline}
              </h1>

              <p className="mt-5 max-w-xl text-base sm:text-[17px] leading-relaxed text-[#A0AAB8]">
                {PROFILE.supportingText}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#C6F36B] px-4 py-2.5 text-sm font-semibold text-[#080A0E] hover:bg-[#d4f78c] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F36B]"
              >
                <span>Explore My Work</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onDownloadResume}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/[0.12] bg-[#141A21] px-3.5 py-2.5 text-sm font-medium text-[#F5F7FA] hover:border-[#C6F36B]/50 hover:bg-[#1A212A] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F36B]"
              >
                <Download className="h-4 w-4 text-[#C6F36B]" aria-hidden="true" />
                <span>Download Resume</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/[0.12] bg-transparent px-3.5 py-2.5 text-sm font-medium text-[#F5F7FA] hover:border-white/30 hover:bg-[#141A21] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F36B]"
              >
                <Mail className="h-4 w-4 text-[#70D9FF]" aria-hidden="true" />
                <span>Contact Me</span>
              </button>

              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-transparent px-3 py-2.5 text-sm font-medium text-[#A0AAB8] hover:text-[#F5F7FA] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F36B]"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span>GitHub Profile</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Developer Workspace Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex lg:col-span-5"
          >
            <div className="flex w-full flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#10141A] p-5 sm:p-6 shadow-2xl">
              <div>
                {/* Terminal Window Top Bar */}
                <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] pb-3.5">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#A0AAB8]">
                    <Terminal className="h-4 w-4 text-[#C6F36B]" aria-hidden="true" />
                    <span>workspace.sh</span>
                  </div>

                  <div className="flex items-center gap-1 rounded-md bg-[#080A0E] p-1">
                    <button
                      type="button"
                      onClick={() => setWorkspaceTab('terminal')}
                      aria-pressed={workspaceTab === 'terminal'}
                      className={`rounded px-2.5 py-1 font-mono text-xs transition-colors whitespace-nowrap ${
                        workspaceTab === 'terminal'
                          ? 'bg-[#1A212A] text-[#F5F7FA]'
                          : 'text-[#A0AAB8] hover:text-[#F5F7FA]'
                      }`}
                    >
                      Terminal
                    </button>
                    <button
                      type="button"
                      onClick={() => setWorkspaceTab('stack')}
                      aria-pressed={workspaceTab === 'stack'}
                      className={`rounded px-2.5 py-1 font-mono text-xs transition-colors whitespace-nowrap ${
                        workspaceTab === 'stack'
                          ? 'bg-[#1A212A] text-[#F5F7FA]'
                          : 'text-[#A0AAB8] hover:text-[#F5F7FA]'
                      }`}
                    >
                      Stack
                    </button>
                  </div>
                </div>

                {/* Terminal / Stack Content */}
                {workspaceTab === 'terminal' ? (
                  <div className="mt-5 space-y-2.5 font-mono text-xs sm:text-[13px] leading-relaxed min-h-[188px]">
                    {TERMINAL_LINES.slice(0, visibleLines).map((line, index) => {
                      const isLast = index === TERMINAL_LINES.length - 1;
                      return (
                        <div key={line.text} className="flex items-start gap-2.5">
                          <span
                            className={isLast ? 'text-[#C6F36B]' : 'text-[#70D9FF]'}
                            aria-hidden="true"
                          >
                            {line.prefix}
                          </span>
                          <span
                            className={
                              isLast ? 'text-[#C6F36B] font-medium' : 'text-[#F5F7FA]/90'
                            }
                          >
                            {line.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-5 space-y-3 min-h-[188px]">
                    <p className="text-xs font-mono text-[#A0AAB8]">
                      Core technologies & tools from portfolio projects
                    </p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {QUICK_CHIPS.map((chip) => (
                        <div
                          key={chip}
                          className="rounded-lg border border-white/[0.08] bg-[#141A21] px-3 py-2 font-mono text-xs text-[#F5F7FA]"
                        >
                          {chip}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-4">
                <span className="font-mono text-xs text-[#A0AAB8]">
                  A4 One-Page Resume Ready
                </span>
                <button
                  type="button"
                  onClick={onOpenResumePreview}
                  className="font-mono text-xs font-medium text-[#70D9FF] hover:text-[#C6F36B] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F36B] rounded-sm"
                >
                  Preview Resume
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Focus Strip Below Hero Split */}
        <div className="mt-12 grid grid-cols-1 gap-4 border-t border-white/[0.08] pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1">
            <p className="font-mono text-xs text-[#A0AAB8]">Degree Track</p>
            <p className="text-sm font-medium text-[#F5F7FA]">
              B.E. Computer Science & Engineering
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-mono text-xs text-[#A0AAB8]">Primary Focus</p>
            <p className="text-sm font-medium text-[#F5F7FA]">
              Responsive Web Interfaces & ES6+
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-mono text-xs text-[#A0AAB8]">Core Foundations</p>
            <p className="text-sm font-medium text-[#F5F7FA]">
              OOP, Data Structures & SQL
            </p>
          </div>
          <div className="flex items-center justify-between sm:justify-start lg:justify-end">
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="inline-flex items-center gap-2 font-mono text-xs text-[#A0AAB8] hover:text-[#C6F36B] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F36B] rounded-sm"
            >
              <span>Scroll to About</span>
              <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
