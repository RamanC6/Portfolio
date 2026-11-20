import { jsPDF } from 'jspdf';
import type { ResumeData } from '../data/resume';

export const RESUME_FILENAME = 'Venkataramana_Kundarapu_Resume.pdf';

interface DensityTier {
  marginX: number;
  marginTop: number;
  marginBottom: number;
  nameSize: number;
  roleSize: number;
  contactSize: number;
  headingSize: number;
  bodySize: number;
  lineHeightFactor: number;
  sectionGap: number;
  itemGap: number;
}

const DENSITY_TIERS: DensityTier[] = [
  {
    marginX: 15,
    marginTop: 14,
    marginBottom: 13,
    nameSize: 21,
    roleSize: 10.5,
    contactSize: 8.8,
    headingSize: 10.5,
    bodySize: 9.4,
    lineHeightFactor: 1.38,
    sectionGap: 4.8,
    itemGap: 2.3,
  },
  {
    marginX: 14,
    marginTop: 12,
    marginBottom: 12,
    nameSize: 20,
    roleSize: 10,
    contactSize: 8.5,
    headingSize: 10,
    bodySize: 9,
    lineHeightFactor: 1.32,
    sectionGap: 3.8,
    itemGap: 1.8,
  },
  {
    marginX: 12.5,
    marginTop: 10.5,
    marginBottom: 10.5,
    nameSize: 20,
    roleSize: 9.5,
    contactSize: 8.2,
    headingSize: 10,
    bodySize: 8.6,
    lineHeightFactor: 1.25,
    sectionGap: 3.0,
    itemGap: 1.4,
  },
  {
    marginX: 11.5,
    marginTop: 9.5,
    marginBottom: 9.5,
    nameSize: 20,
    roleSize: 9.2,
    contactSize: 8.0,
    headingSize: 10,
    bodySize: 8.5,
    lineHeightFactor: 1.18,
    sectionGap: 2.3,
    itemGap: 1.1,
  },
];

const PT_TO_MM = 0.352778;

function lineStep(fontSizePt: number, factor: number): number {
  return fontSizePt * PT_TO_MM * factor;
}

function renderResumePass(
  data: ResumeData,
  tier: DensityTier
): { doc: jsPDF; finalY: number; pageCount: number } {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: false,
  });

  doc.setProperties({
    title: `${data.name} - Resume`,
    subject: 'One-Page ATS Resume',
    author: data.name,
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - tier.marginX * 2;
  const maxY = pageHeight - tier.marginBottom;
  let y = tier.marginTop;

  const ACCENT_BLUE: [number, number, number] = [30, 58, 138]; // #1E3A8A
  const INK_BLACK: [number, number, number] = [17, 24, 39];
  const MUTED_SLATE: [number, number, number] = [75, 85, 99];
  const RULE_GRAY: [number, number, number] = [203, 213, 225];

  // Header: Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(tier.nameSize);
  doc.setTextColor(...INK_BLACK);
  doc.text(data.name, tier.marginX, y);
  y += lineStep(tier.nameSize, 1.08);

  // Role & Location
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(tier.roleSize);
  doc.setTextColor(...ACCENT_BLUE);
  doc.text(`${data.role}  |  ${data.location}`, tier.marginX, y);
  y += lineStep(tier.roleSize, 1.3);

  // Contact line with clickable Email and GitHub links
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(tier.contactSize);
  doc.setTextColor(...MUTED_SLATE);

  const phoneSegment = `Phone: ${data.phone}   |   `;
  doc.text(phoneSegment, tier.marginX, y);
  let cursorX = tier.marginX + doc.getTextWidth(phoneSegment);

  const emailPrefix = 'Email: ';
  doc.text(emailPrefix, cursorX, y);
  cursorX += doc.getTextWidth(emailPrefix);

  doc.setTextColor(...ACCENT_BLUE);
  doc.textWithLink(data.email, cursorX, y, { url: `mailto:${data.email}` });
  cursorX += doc.getTextWidth(data.email);

  doc.setTextColor(...MUTED_SLATE);
  const githubPrefix = '   |   GitHub: ';
  doc.text(githubPrefix, cursorX, y);
  cursorX += doc.getTextWidth(githubPrefix);

  const githubLabel = data.githubUrl.replace(/^https?:\/\//, '');
  doc.setTextColor(...ACCENT_BLUE);
  doc.textWithLink(githubLabel, cursorX, y, { url: data.githubUrl });

  y += 2.6;
  doc.setDrawColor(...ACCENT_BLUE);
  doc.setLineWidth(0.5);
  doc.line(tier.marginX, y, pageWidth - tier.marginX, y);
  y += tier.sectionGap + 1.2;

  const drawSectionHeader = (title: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(tier.headingSize);
    doc.setTextColor(...ACCENT_BLUE);
    doc.text(title, tier.marginX, y);
    y += 1.7;
    doc.setDrawColor(...RULE_GRAY);
    doc.setLineWidth(0.28);
    doc.line(tier.marginX, y, pageWidth - tier.marginX, y);
    y += lineStep(tier.bodySize, tier.lineHeightFactor) + 0.5;
  };

  // 1. Professional Summary
  drawSectionHeader('PROFESSIONAL SUMMARY');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(tier.bodySize);
  doc.setTextColor(...INK_BLACK);
  const summaryLines: string[] = doc.splitTextToSize(data.summary, contentWidth);
  for (const line of summaryLines) {
    doc.text(line, tier.marginX, y);
    y += lineStep(tier.bodySize, tier.lineHeightFactor);
  }
  y += tier.sectionGap - 1;

  // 2. Education (Two-Column Layout matching reference)
  drawSectionHeader('EDUCATION');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(tier.bodySize);

  const rightColumnWidth = Math.max(
    ...data.education.flatMap((edu) => [
      doc.getTextWidth(edu.period),
      doc.getTextWidth(edu.score),
    ])
  );
  const columnGap = 6;
  const rightColumnCenterX = pageWidth - tier.marginX - rightColumnWidth / 2;
  const leftColumnMaxWidth = Math.max(
    60,
    contentWidth - rightColumnWidth - columnGap
  );

  for (let idx = 0; idx < data.education.length; idx += 1) {
    const edu = data.education[idx];
    const rowStep = lineStep(tier.bodySize, tier.lineHeightFactor);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(tier.bodySize);
    const titleLines: string[] = doc.splitTextToSize(edu.title, leftColumnMaxWidth);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(tier.bodySize);
    const institutionLines: string[] = doc.splitTextToSize(
      edu.institution,
      leftColumnMaxWidth
    );

    const leftLineCount = titleLines.length + institutionLines.length;
    const rightLineCount = 2; // period + score
    const blockLines = Math.max(leftLineCount, rightLineCount);

    // Left column text
    let leftY = y;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...INK_BLACK);
    for (const line of titleLines) {
      doc.text(line, tier.marginX, leftY);
      leftY += rowStep;
    }

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...MUTED_SLATE);
    for (const line of institutionLines) {
      doc.text(line, tier.marginX, leftY);
      leftY += rowStep;
    }

    // Right column text (aligned neatly on the right, centered within right column block)
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...INK_BLACK);
    doc.text(edu.period, rightColumnCenterX, y, { align: 'center' });
    doc.setTextColor(...MUTED_SLATE);
    doc.text(edu.score, rightColumnCenterX, y + rowStep, { align: 'center' });

    y += blockLines * rowStep + (idx < data.education.length - 1 ? tier.itemGap * 0.75 : 0);
  }
  y += tier.sectionGap - 0.8;

  // 3. Technical Skills
  drawSectionHeader('TECHNICAL SKILLS');
  for (const row of data.skills) {
    const labelText = `${row.label}: `;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(tier.bodySize);
    doc.setTextColor(...INK_BLACK);
    const labelWidth = doc.getTextWidth(labelText);

    doc.setFont('helvetica', 'normal');
    const wrappedItems: string[] = doc.splitTextToSize(row.items, contentWidth - labelWidth);

    doc.setFont('helvetica', 'bold');
    doc.text(labelText, tier.marginX, y);
    doc.setFont('helvetica', 'normal');
    if (wrappedItems.length > 0) {
      doc.text(wrappedItems[0], tier.marginX + labelWidth, y);
    }
    y += lineStep(tier.bodySize, tier.lineHeightFactor);

    for (let i = 1; i < wrappedItems.length; i += 1) {
      doc.text(wrappedItems[i], tier.marginX + labelWidth, y);
      y += lineStep(tier.bodySize, tier.lineHeightFactor);
    }
  }
  y += tier.sectionGap - 0.6;

  // 4. Projects
  drawSectionHeader('PROJECTS');
  for (const project of data.projects) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(tier.bodySize + 0.2);
    doc.setTextColor(...INK_BLACK);
    doc.text(project.title, tier.marginX, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(tier.bodySize - 0.3);
    doc.setTextColor(...ACCENT_BLUE);
    const techText = project.technologies;
    const techWidth = doc.getTextWidth(techText);
    doc.text(techText, pageWidth - tier.marginX - techWidth, y);
    y += lineStep(tier.bodySize, tier.lineHeightFactor);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(tier.bodySize);
    doc.setTextColor(...INK_BLACK);
    for (const bullet of project.bullets) {
      const bulletPrefix = '•  ';
      const prefixWidth = doc.getTextWidth(bulletPrefix);
      const wrappedBullet: string[] = doc.splitTextToSize(
        bullet,
        contentWidth - prefixWidth - 2
      );
      doc.text(bulletPrefix, tier.marginX + 1.5, y);
      for (let i = 0; i < wrappedBullet.length; i += 1) {
        doc.text(wrappedBullet[i], tier.marginX + 1.5 + prefixWidth, y);
        y += lineStep(tier.bodySize, tier.lineHeightFactor);
      }
    }

    doc.setFontSize(tier.contactSize);
    doc.setTextColor(...MUTED_SLATE);
    const repoPrefix = 'GitHub: ';
    doc.text(repoPrefix, tier.marginX + 1.5, y);
    const repoPrefixWidth = doc.getTextWidth(repoPrefix);
    doc.setTextColor(...ACCENT_BLUE);
    doc.textWithLink(project.githubUrl, tier.marginX + 1.5 + repoPrefixWidth, y, {
      url: project.githubUrl,
    });
    y += lineStep(tier.contactSize, tier.lineHeightFactor) + tier.itemGap;
  }
  y += tier.sectionGap - tier.itemGap - 0.4;

  // 5. Certifications
  drawSectionHeader('CERTIFICATIONS');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(tier.bodySize);
  doc.setTextColor(...INK_BLACK);
  for (const cert of data.certifications) {
    const bulletPrefix = '•  ';
    const prefixWidth = doc.getTextWidth(bulletPrefix);
    const wrappedCert: string[] = doc.splitTextToSize(cert, contentWidth - prefixWidth - 2);
    doc.text(bulletPrefix, tier.marginX + 1.5, y);
    for (const line of wrappedCert) {
      doc.text(line, tier.marginX + 1.5 + prefixWidth, y);
      y += lineStep(tier.bodySize, tier.lineHeightFactor);
    }
  }

  const pageCount = doc.getNumberOfPages();
  const fitsSinglePage = pageCount === 1 && y <= maxY;

  return {
    doc,
    finalY: y,
    pageCount: fitsSinglePage ? 1 : Math.max(pageCount, 2),
  };
}

export interface ResumePdfResult {
  doc: jsPDF;
  pageCount: number;
  finalY: number;
  tierUsed: number;
}

export function buildResumePdfDocument(data: ResumeData): ResumePdfResult {
  let lastResult: ResumePdfResult | null = null;

  for (let i = 0; i < DENSITY_TIERS.length; i += 1) {
    const attempt = renderResumePass(data, DENSITY_TIERS[i]);
    lastResult = {
      doc: attempt.doc,
      pageCount: attempt.doc.getNumberOfPages(),
      finalY: attempt.finalY,
      tierUsed: i,
    };

    const maxAllowedY = attempt.doc.internal.pageSize.getHeight() - DENSITY_TIERS[i].marginBottom;
    if (attempt.doc.getNumberOfPages() === 1 && attempt.finalY <= maxAllowedY) {
      return lastResult;
    }
  }

  if (!lastResult || lastResult.pageCount !== 1) {
    throw new Error('Unable to fit resume content onto a single A4 page.');
  }

  return lastResult;
}

export function downloadResumePdf(data: ResumeData): void {
  const { doc, pageCount } = buildResumePdfDocument(data);
  if (pageCount !== 1) {
    throw new Error(`Expected 1-page PDF, generated ${pageCount} pages.`);
  }
  doc.save(RESUME_FILENAME);
}
