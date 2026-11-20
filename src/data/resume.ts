import { PROFILE } from './profile';

export interface ResumeSkillRow {
  label: string;
  items: string;
}

export interface ResumeProjectEntry {
  title: string;
  technologies: string;
  bullets: string[];
  githubUrl: string;
}

export interface ResumeEducationEntry {
  title: string;
  institution: string;
  period: string;
  score: string;
}

export interface ResumeData {
  name: string;
  role: string;
  location: string;
  phone: string;
  email: string;
  githubUrl: string;
  summary: string;
  education: ResumeEducationEntry[];
  skills: ResumeSkillRow[];
  projects: ResumeProjectEntry[];
  certifications: string[];
}

export const RESUME_DATA: ResumeData = {
  name: PROFILE.name.toUpperCase(),
  role: PROFILE.role,
  location: PROFILE.location,
  phone: PROFILE.phone,
  email: PROFILE.email,
  githubUrl: PROFILE.githubUrl,
  summary: PROFILE.summary,
  education: [
    {
      title: 'B.E. in Computer Science and Engineering',
      institution: 'Sri Indu College of Engineering & Technology, Hyderabad',
      period: '2023 – Present',
      score: 'CGPA: 8.1 / 10 (Till 5th Semester)',
    },
    {
      title: 'Telangana State Board of Intermediate Education',
      institution: 'PRBM Junior College',
      period: '2021 – 2023',
      score: 'PERCENTAGE: 81.0',
    },
    {
      title: 'Board of Secondary Education',
      institution: 'Sai Genius High School',
      period: '2021',
      score: 'CGPA: 9.8 / 10',
    },
  ],
  skills: [
    { label: 'Programming', items: 'JavaScript, Python, C, Java' },
    { label: 'Python Libraries', items: 'NumPy, Pandas, Matplotlib, Seaborn' },
    { label: 'Web', items: 'HTML5, CSS3, JavaScript ES6+, Responsive Web Design' },
    { label: 'Database', items: 'SQL, MySQL' },
    { label: 'Tools', items: 'Git, GitHub, Visual Studio Code' },
    { label: 'Concepts', items: 'Object-Oriented Programming, Data Structures, Problem Solving' },
  ],
  projects: [
    {
      title: 'Lifestyle Shopping Website',
      technologies: 'HTML5, CSS3',
      bullets: [
        'Developed a lifestyle e-commerce homepage.',
        'Designed navigation, search, categories, promotions, and footer.',
        'Implemented product cards, dropdown menus, and hover effects.',
      ],
      githubUrl: 'https://github.com/RamanC6/Life-Style',
    },
    {
      title: 'Rock-Paper-Scissors Game',
      technologies: 'HTML5, CSS3, JavaScript',
      bullets: [
        'Developed an interactive game with win, draw, and loss detection.',
        'Implemented game restart functionality.',
      ],
      githubUrl: 'https://github.com/RamanC6/Rock-Paper-Scissors-Game',
    },
  ],
  certifications: [
    'Test Engineer – Infosys Foundation Finishing School for Employability Program By ICT Academy (A Grade)',
    'Merit Certificate on Technical Whiz Quiz',
    'LinkedIn Learning – Python Quick Start, SQL for Data Analysis',
    'IBM Skills Build – Digital Marketing Course',
    'Alpha to Omega – AI Innovation Camp',
  ],
};
