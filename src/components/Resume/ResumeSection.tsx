import { AlertCircle, CheckCircle2, Download, Eye, FileText, Printer } from 'lucide-react';
import { RESUME_DATA } from '../../data/resume';
import { RESUME_FILENAME } from '../../utils/resumeGenerator';
import { SectionHeader } from '../UI/SectionHeader';
import { ResumeSheet } from './ResumeSheet';

interface ResumeSectionProps {
  onOpenPreview: () => void;
  onDownloadPdf: () => void;
  onPrintResume: () => void;
  pdfStatus: 'idle' | 'success' | 'error';
  pdfError: string | null;
}

export function ResumeSection({
  onOpenPreview,
  onDownloadPdf,
  onPrintResume,
  pdfStatus,
  pdfError,
}: ResumeSectionProps) {
  return (
    <section id="resume" className="py-16 sm:py-20 lg:py-24 border-b border-white/[0.08]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="07"
          title="One-Page ATS Resume"
          subtitle="Clean white-paper A4 resume engineered for campus placements, fresher software roles, and recruiter readability."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Action & Details Panel */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#141A21] p-6 sm:p-8 lg:col-span-5 space-y-6">
            <div className="flex items-start gap-3.5">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#10141A] text-[#C6F36B]">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-[#F5F7FA]">
                  Single-Page Format
                </h3>
                <p className="mt-1 font-mono text-xs text-[#70D9FF]">
                  {RESUME_FILENAME} · A4 · 1 Page
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-[#A0AAB8]">
              Generated directly with selectable text, clickable email and GitHub links, structured section dividers, and automatic overflow control to remain strictly one page.
            </p>

            <div className="space-y-2 border-t border-white/[0.08] pt-5 text-sm text-[#A0AAB8]">
              <div className="flex items-center justify-between">
                <span>Format</span>
                <span className="font-mono text-xs text-[#F5F7FA]">A4 Portrait (1 Page)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Text Layer</span>
                <span className="font-mono text-xs text-[#F5F7FA]">Selectable & ATS-Friendly</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Hyperlinks</span>
                <span className="font-mono text-xs text-[#F5F7FA]">Email & GitHub Active</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 pt-1">
              <button
                type="button"
                onClick={onDownloadPdf}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#C6F36B] px-4 py-2.5 text-sm font-semibold text-[#080A0E] hover:bg-[#d4f78c] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F36B]"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span>Download Resume</span>
              </button>

              <button
                type="button"
                onClick={onOpenPreview}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-white/[0.12] bg-[#10141A] px-4 py-2.5 text-sm font-medium text-[#F5F7FA] hover:border-[#70D9FF]/50 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F36B]"
              >
                <Eye className="h-4 w-4 text-[#70D9FF]" aria-hidden="true" />
                <span>View Resume</span>
              </button>

              <button
                type="button"
                onClick={onOpenPreview}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-transparent px-4 py-2.5 text-sm font-medium text-[#A0AAB8] hover:text-[#F5F7FA] hover:border-white/25 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F36B]"
              >
                <span>Preview Resume</span>
              </button>

              <button
                type="button"
                onClick={onPrintResume}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-transparent px-4 py-2.5 text-sm font-medium text-[#A0AAB8] hover:text-[#F5F7FA] hover:border-white/25 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F36B]"
              >
                <Printer className="h-4 w-4" aria-hidden="true" />
                <span>Print Resume</span>
              </button>
            </div>

            {pdfStatus === 'success' && (
              <div
                role="status"
                className="flex items-start gap-2.5 rounded-lg border border-[#C6F36B]/30 bg-[#C6F36B]/10 p-3 text-xs text-[#C6F36B]"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  Downloaded <strong>{RESUME_FILENAME}</strong> (verified 1 A4 page).
                </span>
              </div>
            )}

            {pdfStatus === 'error' && pdfError && (
              <div
                role="alert"
                className="flex items-start justify-between gap-3 rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-xs text-red-200"
              >
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{pdfError}</span>
                </div>
                <button
                  type="button"
                  onClick={onDownloadPdf}
                  className="shrink-0 font-semibold underline hover:text-white"
                >
                  Retry
                </button>
              </div>
            )}
          </div>

          {/* Right Live Embedded Resume Preview Card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/[0.08] bg-[#10141A] p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-[#A0AAB8]">
                  Live Resume Document Preview
                </span>
                <button
                  type="button"
                  onClick={onOpenPreview}
                  className="font-mono text-xs text-[#70D9FF] hover:text-[#C6F36B] transition-colors whitespace-nowrap"
                >
                  Expand Fullscreen
                </button>
              </div>

              <div className="max-h-[540px] overflow-y-auto rounded-xl border border-white/[0.08]">
                <ResumeSheet data={RESUME_DATA} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
