export type SkillCategory =
  | 'All'
  | 'Programming Languages'
  | 'Web Technologies'
  | 'Python Libraries'
  | 'Database'
  | 'Tools'
  | 'Concepts';

export interface SkillItem {
  id: string;
  name: string;
  category: Exclude<SkillCategory, 'All'>;
  description: string;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  'All',
  'Programming Languages',
  'Web Technologies',
  'Python Libraries',
  'Database',
  'Tools',
  'Concepts',
];

export const SKILLS: SkillItem[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Programming Languages',
    description: 'Core scripting language for interactive browser logic, DOM events, and state flow.',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming Languages',
    description: 'General-purpose programming for problem-solving, scripting, and data analysis.',
  },
  {
    id: 'c-lang',
    name: 'C',
    category: 'Programming Languages',
    description: 'Procedural programming foundation covering memory concepts, pointers, and logic.',
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Programming Languages',
    description: 'Object-oriented language applied to class architecture and algorithmic problems.',
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'Web Technologies',
    description: 'Semantic document structure, accessible markup, and multi-section page layouts.',
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'Web Technologies',
    description: 'Flexbox, Grid, hover transitions, dropdown menus, and visual interface styling.',
  },
  {
    id: 'js-es6',
    name: 'JavaScript ES6+',
    category: 'Web Technologies',
    description: 'Modern syntax, event handling, modular functions, and dynamic DOM updates.',
  },
  {
    id: 'responsive-design',
    name: 'Responsive Web Design',
    category: 'Web Technologies',
    description: 'Fluid layouts and media breakpoints that adapt across desktop, tablet, and mobile.',
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'Python Libraries',
    description: 'Numerical computing with multi-dimensional arrays and vectorized operations.',
  },
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'Python Libraries',
    description: 'Structured tabular data manipulation, filtering, and exploratory analysis.',
  },
  {
    id: 'matplotlib',
    name: 'Matplotlib',
    category: 'Python Libraries',
    description: 'Foundational plotting and visual chart generation for Python datasets.',
  },
  {
    id: 'seaborn',
    name: 'Seaborn',
    category: 'Python Libraries',
    description: 'Statistical data visualization built on top of Matplotlib.',
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Database',
    description: 'Relational querying, filtering, joins, and structured data analysis.',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Database',
    description: 'Relational database management system for schema design and SQL execution.',
  },
  {
    id: 'git',
    name: 'Git',
    category: 'Tools',
    description: 'Distributed version control for branching, committing, and tracking code history.',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Tools',
    description: 'Repository hosting, project documentation, and collaborative code workflows.',
  },
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    category: 'Tools',
    description: 'Primary code editor with integrated terminal, extensions, and debugging workflow.',
  },
  {
    id: 'oop',
    name: 'Object-Oriented Programming',
    category: 'Concepts',
    description: 'Encapsulation, abstraction, inheritance, and polymorphism principles.',
  },
  {
    id: 'data-structures',
    name: 'Data Structures',
    category: 'Concepts',
    description: 'Arrays, linked lists, stacks, queues, trees, and algorithmic complexity.',
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    category: 'Concepts',
    description: 'Breaking down technical requirements into clean, testable logical steps.',
  },
];
