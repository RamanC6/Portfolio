import { useCallback, useMemo, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { About } from './components/About/About';
import { Certifications } from './components/Certifications/Certifications';
import { Contact } from './components/Contact/Contact';
import { Education } from './components/Education/Education';
import { Footer } from './components/Footer/Footer';
import { GitHubSection } from './components/GitHub/GitHubSection';
import { Hero } from './components/Hero/Hero';
import { Navbar } from './components/Navbar/Navbar';
import { Projects } from './components/Projects/Projects';
import { ResumePreviewModal } from './components/Resume/ResumePreviewModal';
import { ResumeSection } from './components/Resume/ResumeSection';
import { ResumeSheet } from './components/Resume/ResumeSheet';
import { Skills } from './components/Skills/Skills';
import { RESUME_DATA } from './data/resume';
import { useActiveSection } from './hooks/useActiveSection';
import { downloadResumePdf } from './utils/resumeGenerator';

export default function App() {
  const sectionIds = useMemo(
    () => [
      'home',
      'about',
      'skills',
      'projects',
      'github',
      'education',
      'certifications',
      'resume',
      'contact',
    ],
    []
  );
  const activeSection = useActiveSection(sectionIds);

  const [resumePreviewOpen, setResumePreviewOpen] = useState(false);
  const [pdfStatus, setPdfStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [pdfError, setPdfError] = useState<string | null>(null);

  const handleDownloadResume = useCallback(() => {
    try {
      setPdfError(null);
      downloadResumePdf(RESUME_DATA);
      setPdfStatus('success');
    } catch (err) {
      setPdfStatus('error');
      setPdfError(
        err instanceof Error
          ? err.message
          : 'Failed to generate resume PDF. Please try again.'
      );
    }
  }, []);

  const handlePrintResume = useCallback(() => {
    document.body.classList.add('printing-resume');
    const cleanup = () => {
      document.body.classList.remove('printing-resume');
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    window.print();
    window.setTimeout(cleanup, 1000);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#080A0E] text-[#F5F7FA] bg-subtle-grid">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#C6F36B] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#080A0E]"
        >
          Skip to main content
        </a>

        <Navbar activeSection={activeSection} />

        <main id="main-content">
          <Hero
            onDownloadResume={handleDownloadResume}
            onOpenResumePreview={() => setResumePreviewOpen(true)}
          />
          <About />
          <Skills />
          <Projects />
          <GitHubSection />
          <Education />
          <Certifications />
          <ResumeSection
            onOpenPreview={() => setResumePreviewOpen(true)}
            onDownloadPdf={handleDownloadResume}
            onPrintResume={handlePrintResume}
            pdfStatus={pdfStatus}
            pdfError={pdfError}
          />
          <Contact />
        </main>

        <Footer />

        <ResumePreviewModal
          isOpen={resumePreviewOpen}
          data={RESUME_DATA}
          onClose={() => setResumePreviewOpen(false)}
          onDownload={handleDownloadResume}
          onPrint={handlePrintResume}
        />

        {/* Dedicated Print-Only A4 Sheet ensures Print works with or without modal open */}
        <div className="hidden print:block">
          <ResumeSheet id="printable-resume-sheet" data={RESUME_DATA} />
        </div>
      </div>
    </MotionConfig>
  );
}
