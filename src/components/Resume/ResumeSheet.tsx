import type { ResumeData } from '../../data/resume';

interface ResumeSheetProps {
  data: ResumeData;
  id?: string;
}

export function ResumeSheet({ data, id }: ResumeSheetProps) {
  return (
    <article
      id={id}
      aria-label="One-Page ATS Resume"
      className="mx-auto w-full max-w-[794px] bg-white text-[#111827] shadow-2xl border border-slate-200 px-8 py-7 sm:px-11 sm:py-9 font-sans leading-snug"
    >
      {/* Header */}
      <header className="border-b-2 border-[#1E3A8A] pb-3">
        <h1 className="text-[22px] sm:text-[25px] font-bold tracking-tight text-[#111827] leading-tight">
          {data.name}
        </h1>
        <p className="mt-0.5 text-[13px] font-semibold text-[#1E3A8A]">
          {data.role} &nbsp;|&nbsp; {data.location}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-[#4B5563]">
          <span>Phone: {data.phone}</span>
          <span aria-hidden="true">|</span>
          <span>
            Email:{' '}
            <a
              href={`mailto:${data.email}`}
              className="text-[#1E3A8A] underline decoration-[#1E3A8A]/40 hover:decoration-[#1E3A8A]"
            >
              {data.email}
            </a>
          </span>
          <span aria-hidden="true">|</span>
          <span>
            GitHub:{' '}
            <a
              href={data.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1E3A8A] underline decoration-[#1E3A8A]/40 hover:decoration-[#1E3A8A]"
            >
              {data.githubUrl.replace(/^https?:\/\//, '')}
            </a>
          </span>
        </div>
      </header>

      {/* Professional Summary */}
      <section className="mt-3.5">
        <h2 className="border-b border-slate-300 pb-0.5 text-[12px] font-bold tracking-wide text-[#1E3A8A] uppercase">
          Professional Summary
        </h2>
        <p className="mt-1.5 text-[12px] leading-[1.45] text-[#111827]">
          {data.summary}
        </p>
      </section>

      {/* Education */}
      <section className="mt-3.5">
        <h2 className="border-b border-slate-300 pb-0.5 text-[12px] font-bold tracking-wide text-[#1E3A8A] uppercase">
          Education
        </h2>
        <div className="mt-1.5 space-y-1.5">
          {data.education.map((edu) => (
            <div
              key={`${edu.title}-${edu.institution}`}
              className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-0.5 items-start"
            >
              <div className="min-w-0">
                <p className="text-[12px] font-semibold text-[#111827] leading-[1.35]">
                  {edu.title}
                </p>
                <p className="text-[11.5px] text-[#4B5563] leading-[1.35]">
                  {edu.institution}
                </p>
              </div>
              <div className="sm:min-w-[205px] text-left sm:text-center leading-[1.35]">
                <p className="text-[11.5px] text-[#111827] tabular-nums">
                  {edu.period}
                </p>
                <p className="text-[11.5px] text-[#4B5563] tabular-nums">
                  {edu.score}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Skills */}
      <section className="mt-3.5">
        <h2 className="border-b border-slate-300 pb-0.5 text-[12px] font-bold tracking-wide text-[#1E3A8A] uppercase">
          Technical Skills
        </h2>
        <div className="mt-1.5 space-y-1 text-[12px]">
          {data.skills.map((row) => (
            <p key={row.label} className="leading-[1.4]">
              <span className="font-semibold text-[#111827]">{row.label}: </span>
              <span className="text-[#1F2937]">{row.items}</span>
            </p>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mt-3.5">
        <h2 className="border-b border-slate-300 pb-0.5 text-[12px] font-bold tracking-wide text-[#1E3A8A] uppercase">
          Projects
        </h2>
        <div className="mt-1.5 space-y-2.5">
          {data.projects.map((project) => (
            <div key={project.title}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-[12.5px] font-bold text-[#111827]">
                  {project.title}
                </h3>
                <span className="text-[11px] font-medium text-[#1E3A8A]">
                  {project.technologies}
                </span>
              </div>
              <ul className="mt-1 list-disc pl-4 space-y-0.5 text-[11.8px] text-[#1F2937]">
                {project.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <p className="mt-0.5 text-[11px] text-[#4B5563]">
                GitHub:{' '}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1E3A8A] underline decoration-[#1E3A8A]/40 hover:decoration-[#1E3A8A]"
                >
                  {project.githubUrl}
                </a>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="mt-3.5">
        <h2 className="border-b border-slate-300 pb-0.5 text-[12px] font-bold tracking-wide text-[#1E3A8A] uppercase">
          Certifications
        </h2>
        <ul className="mt-1.5 list-disc pl-4 space-y-0.5 text-[11.8px] text-[#1F2937]">
          {data.certifications.map((cert) => (
            <li key={cert}>{cert}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
