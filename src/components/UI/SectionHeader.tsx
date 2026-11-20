interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ number, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-10 max-w-2xl">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-xs tracking-wider text-[#C6F36B] tabular-nums">
          {number}.
        </span>
        <span className="h-px w-8 bg-white/[0.14]" aria-hidden="true" />
      </div>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#F5F7FA] text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-[#A0AAB8]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
