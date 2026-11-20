import lifestylePreview from '../assets/images/project_lifestyle_preview_1795189963549.jpg';
import rpsPreview from '../assets/images/project_rps_preview_1795189964076.jpg';

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  technologies: string[];
  highlights: string[];
  githubUrl: string;
  previewImage: string;
  previewAlt: string;
  featured: boolean;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'lifestyle-shopping-website',
    number: '01',
    title: 'Lifestyle Shopping Website',
    category: 'E-Commerce Front-End Interface',
    summary:
      'A multi-section lifestyle e-commerce homepage inspired by modern retail storefronts, built with semantic HTML5 and structured CSS3 styling.',
    technologies: ['HTML5', 'CSS3'],
    highlights: [
      'Developed a lifestyle e-commerce homepage using HTML5 and CSS3.',
      'Designed a multi-section interface including navigation bar, search bar, categories, promotional sections, and footer.',
      'Recreated a Lifestyle-inspired layout with detailed CSS styling.',
      'Implemented hover effects, product cards, dropdown menus, and structured page layout.',
    ],
    githubUrl: 'https://github.com/RamanC6/Life-Style',
    previewImage: lifestylePreview,
    previewAlt: 'Preview of the Lifestyle Shopping Website interface featuring navigation, promotional banner, and product cards',
    featured: true,
  },
  {
    id: 'rock-paper-scissors-game',
    number: '02',
    title: 'Rock-Paper-Scissors Game',
    category: 'Interactive Browser Game',
    summary:
      'An interactive browser-based Rock-Paper-Scissors game with real-time outcome evaluation and instant round reset.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    highlights: [
      'Developed an interactive Rock-Paper-Scissors game.',
      'Implemented game logic to detect wins, draws, and losses.',
      'Added a restart feature to reset the game.',
    ],
    githubUrl: 'https://github.com/RamanC6/Rock-Paper-Scissors-Game',
    previewImage: rpsPreview,
    previewAlt: 'Preview of the Rock-Paper-Scissors interactive web game showing move selection and round result',
    featured: false,
  },
];
