import { Code2, Cpu, Layers, MapPin, Wrench } from 'lucide-react';
import { motion } from 'motion/react';
import { PROFILE } from '../../data/profile';
import { SectionHeader } from '../UI/SectionHeader';

const FOCUS_CARDS = [
  {
    icon: Layers,
    title: 'Web Development',
    description:
      'Building semantic, structured, and responsive user interfaces with HTML5, CSS3, and modern JavaScript (ES6+).',
  },
  {
    icon: Code2,
    title: 'Programming',
    description:
      'Writing clean, maintainable code across JavaScript, Python, C, and Java with attention to clarity and logic.',
  },
  {
    icon: Cpu,
    title: 'Problem Solving',
    description:
      'Applying object-oriented programming and data structures to break down requirements into reliable solutions.',
  },
  {
    icon: Wrench,
    title: 'Building Projects',
    description:
      'Translating concepts into working applications through hands-on storefront layouts and interactive browser games.',
  },
];

export function About() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 border-b border-white/[0.08]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="01"
          title="About Me"
          subtitle="Engineering undergraduate focused on front-end craft, programming fundamentals, and continuous hands-on building."
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Primary Profile Summary Bento Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#141A21] p-6 sm:p-8 lg:col-span-7"
          >
            <div>
              <p className="font-mono text-xs text-[#C6F36B]">Developer Profile</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-[#F5F7FA]">
                {PROFILE.name}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[#A0AAB8]">
                {PROFILE.summary}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-5 text-sm text-[#A0AAB8]">
              <span className="inline-flex items-center gap-2 text-[#F5F7FA]">
                <MapPin className="h-4 w-4 text-[#70D9FF]" aria-hidden="true" />
                <span>{PROFILE.location}</span>
              </span>
              <span className="font-mono text-xs text-[#A0AAB8]">
                {PROFILE.role} · CSE Student
              </span>
            </div>
          </motion.div>

          {/* Right Bento Column: Current Focus & Technical Direction */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#10141A] p-6 sm:p-8 lg:col-span-5"
          >
            <div>
              <p className="font-mono text-xs text-[#70D9FF]">Current Focus</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-[#F5F7FA]">
                Interactive Interfaces & Core CS
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#A0AAB8]">
                Combining front-end web technologies with relational database querying (SQL / MySQL) and Python data libraries while strengthening algorithmic thinking.
              </p>
            </div>

            <div className="mt-6 space-y-3 border-t border-white/[0.08] pt-5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#A0AAB8]">Primary Stack</span>
                <span className="font-mono text-xs text-[#F5F7FA]">
                  HTML5 · CSS3 · ES6+
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#A0AAB8]">Languages</span>
                <span className="font-mono text-xs text-[#F5F7FA]">
                  JavaScript · Python · C · Java
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#A0AAB8]">Version Control</span>
                <span className="font-mono text-xs text-[#F5F7FA]">
                  Git · GitHub · VS Code
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bottom 4 Bento Pillar Cards */}
          {FOCUS_CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.35,
                  delay: 0.04 * index,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-2xl border border-white/[0.08] bg-[#141A21] p-6 lg:col-span-3"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#1A212A] text-[#C6F36B]">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-[#F5F7FA]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#A0AAB8]">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
