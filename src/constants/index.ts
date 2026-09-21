import { StaticImageData } from 'next/image';
import zadexBanner from '../assets/Projects/zadex-banner-mockup.jpg';
import telosBanner from '../assets/Projects/telos-banner-mockup.jpg';
import artisaneBanner from '../assets/Projects/artisane-banner-mockup.jpg';
import telosDigitalBanner from '../assets/Projects/telos-digital-banner.jpg';
import threadviewBanner from '../assets/Projects/threadview-banner-mockup.jpg';
import iotBanner from '../assets/Projects/iot-banner-mockup.jpg';

export interface Project {
  title: string;
  category: string;
  status: 'concept' | 'live';
  focus: string;
  monogram: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  liveLabel?: string;
  image?: StaticImageData | string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  contributions: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  CGPA?: string;
  location: string;
  achivement?: string;
  group?: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'Telos Digital Ecommerce',
    category: 'Full-Stack Platform',
    status: 'live',
    focus: 'E-Commerce & Payments',
    monogram: 'TE',
    description:
      'Modern digital electronics e-commerce store with catalog filtering, shopping cart state, secure checkout, and responsive design.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Redux'],
    github:
      'https://github.com/millathossain115/Telos-Digital-Ecommerce-Frontend',
    live: 'https://www.teloscart.website/',
    liveLabel: 'Live Site',
    image: telosBanner,
  },
  {
    title: 'Artisane - Craft Marketplace',
    category: 'Full-Stack Platform',
    status: 'live',
    focus: 'Marketplace & Creators',
    monogram: 'AR',
    description:
      'Curated artisan marketplace connecting independent craft makers with buyers, featuring category exploration, seller spotlights, and smooth checkout.',
    tags: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/millathossain115/Artisane_Client',
    live: 'https://artisane-client.vercel.app/',
    liveLabel: 'Live Site',
    image: artisaneBanner,
  },
  {
    title: 'ZaDEX Logistics Platform',
    category: 'Full-Stack Platform',
    status: 'live',
    focus: 'Operations & Tracking',
    monogram: 'ZL',
    description:
      'End-to-end courier operations for parcel booking, live tracking, rider workflows, dispatch controls, and admin analytics.',
    tags: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/millathossain115/ZaDEX-Client',
    live: 'https://zadex-puce.vercel.app',
    liveLabel: 'Live Site',
    image: zadexBanner,
  },
  {
    title: 'Telos Digital Agency',
    category: 'Software & Product Studio',
    status: 'live',
    focus: 'Engineering & Interfaces',
    monogram: 'TD',
    description:
      'Agency platform engineering scalable software and interfaces, mission-critical React applications, mobile cores, and refined digital experiences.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/millathossain115/telos-digital',
    live: 'https://telos-digital.vercel.app/',
    liveLabel: 'Live Site',
    image: telosDigitalBanner,
  },
  {
    title: 'ThreadView Forum',
    category: 'Community Platform',
    status: 'live',
    focus: 'Discussion & Moderation',
    monogram: 'TV',
    description:
      'A community forum with threaded discussions, post editing, moderation controls, and role-aware administration.',
    tags: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
    github: 'https://github.com/millathossain115/ThreadView',
    live: 'https://thread-view-rust.vercel.app',
    liveLabel: 'Live Demo',
    image: threadviewBanner,
  },
  {
    title: 'IoT Home Automation & Security',
    category: 'Embedded System',
    status: 'live',
    focus: 'Automation & Sensing',
    monogram: 'IH',
    description:
      'Arduino-based home automation and security with remote appliance control, motion detection, and environmental sensing.',
    tags: ['Arduino', 'C++', 'IoT', 'Sensors', 'Automation'],
    github:
      'https://github.com/millathossain115/IOT-based-Home-Automation-Security-Control',
    live: 'https://www.youtube.com/watch?v=9_pd3rIbLUc',
    liveLabel: 'Demo',
    image: iotBanner,
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'HTML5', 'CSS3'],
  },
  {
    title: 'Frameworks & Libraries',
    skills: [
      'React',
      'Next.js',
      'Node.js',
      'Express.js',
      'Tailwind CSS',
      'Redux',
    ],
  },
  {
    title: 'Databases & Backend',
    skills: [
      'MongoDB',
      'PostgreSQL',
      'MySQL',
      'REST APIs',
      'JWT Auth',
      'Firebase',
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: ['Git', 'GitHub', 'Docker', 'Postman', 'Vercel', 'Netlify'],
  },
];

export const SKILLS: string[] = [
  'JavaScript (ES6+)',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Express',
  'NestJS',
  'Go',
  'Python',
  'PostgreSQL',
  'MongoDB',
  'Tailwind CSS',
  'Docker',
  'Kubernetes',
  'Git',
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'Undergraduate Grader',
    company: 'UNITED INTERNATIONAL UNIVERSITY ',
    duration: 'Summer 2023',
    contributions: [
      'Collaborated with faculty to prepare and refine course materials, ensuring alignment with curriculum objectives  ',
      'Supported faculty member in grading assignments, providing constructive feedback to students, and maintaining accuracy and consistency in assessment procedures',
      'Contributed to analyzing course outcomes and student performance data to improve teaching methods and academic strategies',
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'B.Sc. in Computer Science & Engineering ',
    institution: 'UNITED INTERNATIONAL UNIVERSITY',
    duration: '2020 - 2024',
    CGPA: '3.65',
    location: 'Madani Avenue, Dhaka, ',
    achivement:
      'Received Academic Scholarship (Scholarship Award | BSCSE) in several trimesters for excellent results',
  },
  {
    degree: 'Higher Secondary Certificate',
    institution: 'ABDUL KADIR MOLLAH CITY COLLEGE ',
    duration: '2015 - 2017',
    group: 'Science',
    location: 'Narsingdi,Dhaka',
  },
  {
    degree: 'Secondary School Certificate',
    institution: 'PANCHRUKHI HAZI SHAHEB ALI FAKIR HIGH SCHOOL',
    duration: '2010 - 2015',
    location: 'Narayanganj,Dhaka',
    group: 'Science',
  },
];
