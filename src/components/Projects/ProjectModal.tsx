import { useEffect, useRef, useState } from 'react';
import { ExternalLink, FolderGit2, Github, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { ProjectItem } from '../../data/projects';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 30);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/[0.12] bg-[#141A21] shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/[0.08] bg-[#141A21]/95 px-6 py-4 backdrop-blur-md">
              <div className="min-w-0">
                <p className="font-mono text-xs text-[#C6F36B]">
                  Project {project.number} · {project.category}
                </p>
                <h3
                  id="project-modal-title"
                  className="truncate font-display text-xl font-semibold text-[#F5F7FA]"
                >
                  {project.title}
                </h3>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.1] bg-[#10141A] text-[#F5F7FA] hover:border-white/30 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F36B]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#10141A]">
                {!imgFailed ? (
                  <img
                    src={project.previewImage}
                    alt={project.previewAlt}
                    referrerPolicy="no-referrer"
                    onError={() => setImgFailed(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center">
                    <FolderGit2 className="h-8 w-8 text-[#70D9FF]" aria-hidden="true" />
                    <span className="font-display text-base font-medium text-[#F5F7FA]">
                      {project.title}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-mono text-xs text-[#70D9FF]">Overview</h4>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#A0AAB8]">
                  {project.summary}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs text-[#70D9FF]">Key Features & Implementation</h4>
                <ul className="mt-2.5 space-y-2 text-sm text-[#F5F7FA]/90">
                  {project.highlights.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C6F36B]"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
                <div>
                  <span className="block font-mono text-xs text-[#A0AAB8]">Technologies</span>
                  <span className="mt-1 block font-mono text-sm text-[#F5F7FA]">
                    {project.technologies.join(' · ')}
                  </span>
                </div>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#C6F36B] px-4 py-2.5 text-sm font-semibold text-[#080A0E] hover:bg-[#d4f78c] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F36B]"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>Open Repository</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
