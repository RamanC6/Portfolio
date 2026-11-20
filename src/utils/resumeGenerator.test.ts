import test from 'node:test';
import assert from 'node:assert/strict';
import { RESUME_DATA } from '../data/resume';
import { buildResumePdfDocument, RESUME_FILENAME } from './resumeGenerator';

test('resume PDF generator produces exactly one A4 page with selectable text and links', () => {
  const result = buildResumePdfDocument(RESUME_DATA);

  assert.equal(result.pageCount, 1);
  assert.equal(result.doc.getNumberOfPages(), 1);
  assert.equal(RESUME_FILENAME, 'Venkataramana_Kundarapu_Resume.pdf');

  // A4 height is 297mm; ensure final Y stays comfortably within page margins
  assert.ok(result.finalY > 140 && result.finalY < 285, `Unexpected finalY: ${result.finalY}`);

  // Verify selectable PDF text output contains core factual resume details
  const rawPdf = result.doc.output('datauristring');
  assert.ok(rawPdf.startsWith('data:application/pdf'));

  const pdfBytes = Buffer.from(result.doc.output('arraybuffer')).toString('latin1');
  assert.ok(pdfBytes.includes('VENKATARAMANA KUNDARAPU'));
  assert.ok(pdfBytes.includes('k.venky6123@gmail.com'));
  assert.ok(pdfBytes.includes('https://github.com/RamanC6'));
  assert.ok(pdfBytes.includes('CGPA: 8.1 / 10 \\(Till 5th Semester\\)'));
  assert.ok(pdfBytes.includes('PERCENTAGE: 81.0'));
  assert.ok(pdfBytes.includes('CGPA: 9.8 / 10'));
  assert.ok(pdfBytes.includes('Infosys Foundation Finishing School for Employability Program By ICT Academy'));
  assert.ok(pdfBytes.includes('Lifestyle Shopping Website'));
  assert.ok(pdfBytes.includes('Rock-Paper-Scissors Game'));
  assert.ok(pdfBytes.includes('mailto:k.venky6123@gmail.com'));
});

test('resume PDF overflow control adapts density tier when summary is longer', () => {
  const extendedResume = {
    ...RESUME_DATA,
    summary: `${RESUME_DATA.summary} Focused on writing clean, semantic, maintainable front-end markup and accessible user interfaces across viewports.`,
  };

  const result = buildResumePdfDocument(extendedResume);
  assert.equal(result.pageCount, 1);
  assert.equal(result.doc.getNumberOfPages(), 1);
});
