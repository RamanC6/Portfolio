import { useState } from 'react';
import { ArrowUpRight, FolderGit2, Github } from 'lucide-react';
import { motion } from 'motion/react';
import type { ProjectItem } from '../../data/projects';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#141A21] overflow-hidden hover:border-[#C6F36B]/40 transition-colors ${
        project.featured ? 'lg:col-span-7' : 'lg:col-span-5'
      }`}
    >
      <div>
        {/* Preview Media Container */}
        <div className="relative h-56 sm:h-64 lg:h-[290px] w-full overflow-hidden bg-[#10141A] border-b border-white/[0.08]">
          {!imgFailed ? (
            <img
              src={project.previewImage}
              alt={project.previewAlt}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setImgFailed(true)}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#10141A] p-6 text-center">
              <FolderGit2 className="h-8 w-8 text-[#70D9FF]" aria-hidden="true" />
              <span className="font-display text-base font-medium text-[#F5F7FA]">
                {project.title}
              </span>
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-[#A0AAB8]">
            <span className="text-[#C6F36B] tabular-nums">Project {project.number}</span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
          </div>

          <h3 className="mt-2.5 font-display text-2xl font-semibold text-[#F5F7FA]">
            {project.title}
          </h3>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#A0AAB8]">
            {project.summary}
          </p>

          <ul className="mt-4 space-y-1.5 text-sm text-[#A0AAB8]">
            {project.highlights.slice(0, project.featured ? 4 : 3).map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#70D9FF]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Metadata & Actions */}
      <div className="border-t border-white/[0.08] px-6 py-4 sm:px-7 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs text-[#A0AAB8]">
          {project.technologies.join(' · ')}
        </p>

        <div className="flex items-center gap-2.5">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} source code on GitHub`}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/[0.1] bg-[#10141A] px-3.5 py-2 text-xs font-medium text-[#F5F7FA] hover:border-white/25 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F36B]"
          >
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
            <span>GitHub</span>
          </a>

          <button
            type="button"
            onClick={() => onSelect(project)}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-[#C6F36B] px-3.5 py-2 text-xs font-semibold text-[#080A0E] hover:bg-[#d4f78c] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F36B]"
          >
            <span>View Details</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
