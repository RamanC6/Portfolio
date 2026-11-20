export interface EducationItem {
  id: string;
  step: string;
  qualification: string;
  institution: string;
  boardOrUniversity?: string;
  focus: string;
}

export const EDUCATION: EducationItem[] = [
  {
    id: 'be-cse',
    step: '01',
    qualification: 'B.E. in Computer Science and Engineering',
    institution: 'Sri Indu College of Engineering & Technology, Hyderabad',
    focus: 'Undergraduate studies in computer science fundamentals, programming, data structures, and web technologies.',
  },
  {
    id: 'intermediate',
    step: '02',
    qualification: 'Intermediate',
    institution: 'PRBM Junior College',
    boardOrUniversity: 'Telangana State Board of Intermediate Education',
    focus: 'Higher secondary education under the Telangana State Board curriculum.',
  },
  {
    id: 'ssc',
    step: '03',
    qualification: 'SSC',
    institution: 'Sai Genius High School',
    boardOrUniversity: 'Board of Secondary Education',
    focus: 'Secondary school certificate foundation.',
  },
];
