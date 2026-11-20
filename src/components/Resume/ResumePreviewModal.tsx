import { useEffect, useRef, useState } from 'react';
import { Download, Printer, X, ZoomIn, ZoomOut } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { ResumeData } from '../../data/resume';
import { ResumeSheet } from './ResumeSheet';

interface ResumePreviewModalProps {
  isOpen: boolean;
  data: ResumeData;
  onClose: () => void;
  onDownload: () => void;
  onPrint: () => void;
}

const ZOOM_LEVELS = [0.75, 0.9, 1, 1.15];

export function ResumePreviewModal({
  isOpen,
  data,
  onClose,
  onDownload,
  onPrint,
}: ResumePreviewModalProps) {
  const [zoomIndex, setZoomIndex] = useState(2); // 100%
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
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
  }, [isOpen, onClose]);

  const zoom = ZOOM_LEVELS[zoomIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-sm p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-preview-title"
        >
          {/* Modal Toolbar */}
          <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 rounded-t-2xl border border-white/[0.12] bg-[#141A21] px-4 py-3 sm:px-6">
            <div>
              <h3
                id="resume-preview-title"
                className="font-display text-base sm:text-lg font-semibold text-[#F5F7FA]"
              >
                One-Page A4 Resume Preview
              </h3>
              <p className="font-mono text-xs text-[#A0AAB8]">
                ATS-friendly single-page format · Selectable text
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Zoom Controls */}
              <div className="hidden sm:flex items-center gap-1 rounded-lg border border-white/[0.08] bg-[#10141A] p-1">
                <button
                  type="button"
                  onClick={() => setZoomIndex((prev) => Math.max(0, prev - 1))}
                  disabled={zoomIndex === 0}
                  aria-label="Zoom out resume preview"
                  className="inline-flex h-8 w-8 items-center justify-center rounded text-[#A0AAB8] hover:text-[#F5F7FA] disabled:opacity-40 transition-colors"
                >
                  <ZoomOut className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="min-w-[46px] text-center font-mono text-xs text-[#F5F7FA] tabular-nums">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setZoomIndex((prev) => Math.min(ZOOM_LEVELS.length - 1, prev + 1))
                  }
                  disabled={zoomIndex === ZOOM_LEVELS.length - 1}
                  aria-label="Zoom in resume preview"
                  className="inline-flex h-8 w-8 items-center justify-center rounded text-[#A0AAB8] hover:text-[#F5F7FA] disabled:opacity-40 transition-colors"
                >
                  <ZoomIn className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                onClick={onPrint}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/[0.12] bg-[#10141A] px-3.5 py-2 text-xs font-medium text-[#F5F7FA] hover:border-white/30 transition-colors whitespace-nowrap"
              >
                <Printer className="h-3.5 w-3.5 text-[#70D9FF]" aria-hidden="true" />
                <span>Print</span>
              </button>

              <button
                type="button"
                onClick={onDownload}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-[#C6F36B] px-3.5 py-2 text-xs font-semibold text-[#080A0E] hover:bg-[#d4f78c] transition-colors whitespace-nowrap"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Download PDF</span>
              </button>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close resume preview"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.1] bg-[#10141A] text-[#F5F7FA] hover:border-white/30 transition-colors"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Scrollable Preview Viewport */}
          <div className="mx-auto flex-1 w-full max-w-5xl overflow-auto rounded-b-2xl border-x border-b border-white/[0.12] bg-[#0B0E13] p-4 sm:p-8">
            <div
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'top center',
              }}
              className="transition-transform duration-150"
            >
              <ResumeSheet data={data} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
