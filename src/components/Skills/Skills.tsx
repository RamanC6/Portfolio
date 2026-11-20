import { useMemo, useState } from 'react';
import {
  BarChart3,
  Braces,
  Code,
  Cpu,
  Database,
  FileCode2,
  GitBranch,
  Globe,
  Layers,
  Terminal,
} from 'lucide-react';
import { motion } from 'motion/react';
import { SKILL_CATEGORIES, SKILLS, type SkillCategory, type SkillItem } from '../../data/skills';
import { SectionHeader } from '../UI/SectionHeader';

function getSkillIcon(skill: SkillItem) {
  switch (skill.category) {
    case 'Programming Languages':
      return Code;
    case 'Web Technologies':
      return skill.id === 'responsive-design' ? Globe : FileCode2;
    case 'Python Libraries':
      return BarChart3;
    case 'Database':
      return Database;
    case 'Tools':
      return skill.id === 'vscode' ? Terminal : GitBranch;
    case 'Concepts':
      return skill.id === 'oop' ? Layers : skill.id === 'data-structures' ? Braces : Cpu;
    default:
      return Code;
  }
}

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('All');

  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'All') return SKILLS;
    return SKILLS.filter((skill) => skill.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24 border-b border-white/[0.08]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="02"
          title="Technical Skills"
          subtitle="Languages, web technologies, Python libraries, database systems, tools, and computer science concepts."
        />

        {/* Interactive Filter Tabs */}
        <div
          role="group"
          aria-label="Filter skills by category"
          className="mb-8 flex flex-wrap items-center gap-2"
        >
          {SKILL_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={active}
                className={`min-h-[40px] rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F36B] ${
                  active
                    ? 'bg-[#C6F36B] text-[#080A0E] font-semibold'
                    : 'border border-white/[0.08] bg-[#141A21] text-[#A0AAB8] hover:text-[#F5F7FA] hover:border-white/20'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div
          data-testid="skills-grid"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {filteredSkills.map((skill, index) => {
            const Icon = getSkillIcon(skill);
            return (
              <motion.article
                key={skill.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.22,
                  delay: Math.min(index * 0.02, 0.16),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group rounded-2xl border border-white/[0.08] bg-[#141A21] p-5 hover:border-[#C6F36B]/40 hover:bg-[#1A212A] transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#10141A] text-[#70D9FF] group-hover:text-[#C6F36B] transition-colors">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[11px] text-[#A0AAB8]">
                    {skill.category}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-lg font-semibold text-[#F5F7FA]">
                  {skill.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#A0AAB8]">
                  {skill.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
