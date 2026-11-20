import { GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { EDUCATION } from '../../data/education';
import { SectionHeader } from '../UI/SectionHeader';

export function Education() {
  return (
    <section id="education" className="py-16 sm:py-20 lg:py-24 border-b border-white/[0.08]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="05"
          title="Education"
          subtitle="Academic background in Computer Science and Engineering and foundational schooling."
        />

        <div className="relative space-y-6">
          {/* Vertical Timeline Connector */}
          <div
            className="hidden sm:block absolute left-6 top-8 bottom-8 w-px bg-white/[0.1]"
            aria-hidden="true"
          />

          {EDUCATION.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.35,
                delay: index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative sm:pl-16"
            >
              {/* Timeline Node */}
              <div
                className="hidden sm:flex absolute left-0 top-6 h-12 w-12 items-center justify-center rounded-xl border border-white/[0.1] bg-[#141A21] text-[#C6F36B]"
                aria-hidden="true"
              >
                <GraduationCap className="h-5 w-5" />
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#141A21] p-6 sm:p-7 hover:border-white/20 transition-colors">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-[#A0AAB8]">
                  <span className="text-[#C6F36B] tabular-nums">Stage {item.step}</span>
                  {item.boardOrUniversity && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{item.boardOrUniversity}</span>
                    </>
                  )}
                </div>

                <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold text-[#F5F7FA]">
                  {item.qualification}
                </h3>

                <p className="mt-1.5 text-base font-medium text-[#70D9FF]">
                  {item.institution}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-[#A0AAB8]">
                  {item.focus}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
