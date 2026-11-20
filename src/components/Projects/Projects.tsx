import { useState } from 'react';
import { PROJECTS, type ProjectItem } from '../../data/projects';
import { SectionHeader } from '../UI/SectionHeader';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 border-b border-white/[0.08]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="03"
          title="Selected Projects"
          subtitle="Hands-on front-end web interfaces and interactive browser logic built from scratch."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
