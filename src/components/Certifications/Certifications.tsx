import { Award, BookOpenCheck, Cpu, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import { CERTIFICATIONS } from '../../data/certifications';
import { SectionHeader } from '../UI/SectionHeader';

const CERT_ICONS = [Trophy, BookOpenCheck, Award, Cpu];

export function Certifications() {
  return (
    <section id="certifications" className="py-16 sm:py-20 lg:py-24 border-b border-white/[0.08]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="06"
          title="Certifications"
          subtitle="Verified coursework, technical quiz merit recognition, and applied learning programs."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {CERTIFICATIONS.map((cert, index) => {
            const Icon = CERT_ICONS[index % CERT_ICONS.length];
            return (
              <motion.article
                key={cert.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-2xl border border-white/[0.08] bg-[#141A21] p-6 hover:border-[#C6F36B]/35 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#10141A] text-[#C6F36B]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs text-[#A0AAB8] text-right leading-relaxed">
                    {cert.issuer} · {cert.category}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-lg sm:text-xl font-semibold text-[#F5F7FA] break-words">
                  {cert.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[#A0AAB8]">
                  {cert.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
