export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  category: string;
  description: string;
}

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'infosys-ict-test-engineer',
    title: 'Test Engineer – Infosys Foundation Finishing School for Employability Program By ICT Academy (A Grade)',
    issuer: 'Infosys Foundation & ICT Academy',
    category: 'Employability Program',
    description:
      'Completed the Test Engineer training under the Infosys Foundation Finishing School for Employability Program by ICT Academy with an A Grade.',
  },
  {
    id: 'technical-whiz-quiz',
    title: 'Merit Certificate on Technical Whiz Quiz',
    issuer: 'Technical Quiz Competition',
    category: 'Technical Recognition',
    description: 'Awarded a merit certificate for technical knowledge and problem-solving performance.',
  },
  {
    id: 'linkedin-learning',
    title: 'Python Quick Start, SQL for Data Analysis',
    issuer: 'LinkedIn Learning',
    category: 'Programming & Data',
    description: 'Completed structured coursework covering Python fundamentals and SQL querying for data analysis.',
  },
  {
    id: 'ibm-skills-build',
    title: 'Digital Marketing Course',
    issuer: 'IBM Skills Build',
    category: 'Digital Foundations',
    description: 'Completed digital marketing fundamentals through the IBM SkillsBuild learning program.',
  },
  {
    id: 'alpha-to-omega',
    title: 'AI Innovation Camp',
    issuer: 'Alpha to Omega',
    category: 'Emerging Technology',
    description: 'Participated in the AI Innovation Camp exploring applied problem-solving concepts.',
  },
];
