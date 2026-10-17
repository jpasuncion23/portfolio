/*
  All portfolio content lives here. Every section reads from this file,
  so this is the only place you need to edit. Replace the placeholders.
*/

// ---------- Types ----------

export type ContactLink = {
  label: string;
  href: string;
  /** Text shown on the page, e.g. the email address or a handle. */
  display: string;
  icon: "email" | "github" | "linkedin";
};

export type Stat = {
  /** Number the counter animates up to. */
  value: number;
  /** Appended after the number, e.g. "+" or "%". */
  suffix?: string;
  label: string;
};

export const projectCategories = ["Web", "Mobile", "Backend", "Tools"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  name: string;
  description: string;
  role: string;
  tech: string[];
  category: ProjectCategory;
  highlights: string[];
  /** Live site or repo. Leave empty if there's nothing to link to. */
  link?: string;
  repo?: string;
  /** Path under /public, e.g. "/images/projects/foo.png". */
  image?: string;
  featured?: boolean;
};

export type SkillGroup = {
  category: string;
  skills: string[];
};

export type Education = {
  school: string;
  degree: string;
  start: string;
  end: string;
  details?: string;
};

export type Experience = {
  company: string;
  position: string;
  start: string;
  end: string;
  location?: string;
  points: string[];
};

// ---------- Profile ----------

export const profile = {
  name: "Your Name",
  title: "Full-Stack Developer",
  intro:
    "I build fast, accessible web apps with clean code and thoughtful design. Placeholder intro: replace with one or two sentences about what you do.",
  location: "Manila, Philippines",
  availability: "Open to opportunities",
  /** Path under /public. */
  photo: "/images/profile.jpg",
  /** Where "Download CV" goes. "/cv" is the printable CV page built from this file. */
  cvPath: "/cv",
  /** Your live URL, no trailing slash. Used for SEO, share previews and the sitemap. */
  siteUrl: "https://your-name.vercel.app",
  /** Shown by Google and in link previews. Aim for 120–160 characters. */
  siteDescription:
    "Portfolio of Your Name, a full-stack developer in Manila building fast, accessible web apps with Next.js, TypeScript and Node.js.",
  /** Open Graph locale, e.g. "en_US" or "en_PH". */
  locale: "en_PH",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

/** Button on the right side of the navbar; links to #contact. */
export const navCta = "Let's talk";

export const hero = {
  greeting: "Hi there, I'm",
  /** Shown in the code card next to the headline. */
  stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
  buttons: {
    work: "View work",
    contact: "Contact",
    cv: "Download CV",
  },
};

export const contact: ContactLink[] = [
  { label: "Email", href: "mailto:you@example.com", display: "you@example.com", icon: "email" },
  { label: "GitHub", href: "https://github.com/your-handle", display: "@your-handle", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/your-handle", display: "in/your-handle", icon: "linkedin" },
];

export const stats: Stat[] = [
  { value: 3, suffix: "+", label: "Years coding" },
  { value: 12, suffix: "+", label: "Projects shipped" },
  { value: 8, label: "Technologies used daily" },
  { value: 100, suffix: "%", label: "Commitment" },
];

// ---------- About ----------

export const about = {
  heading: "A bit about me",
  paragraphs: [
    "Placeholder paragraph. Describe how you got into development and what kind of problems you enjoy solving.",
    "Placeholder paragraph. Mention what you're focused on right now and what you're looking for next.",
  ],
  /** Short facts shown on the profile card. */
  facts: [
    { label: "Based in", value: "Manila, PH" },
    { label: "Focus", value: "Web apps" },
    { label: "Languages", value: "English, Filipino" },
  ],
};

// ---------- Projects ----------

export const projects: Project[] = [
  {
    name: "Project One",
    description:
      "Placeholder description. A web app that solves a specific problem for a specific group of users.",
    role: "Full-stack developer",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    category: "Web",
    highlights: [
      "Placeholder highlight: a measurable result",
      "Placeholder highlight: an interesting technical challenge",
      "Placeholder highlight: something you're proud of",
    ],
    link: "https://example.com",
    repo: "https://github.com/your-handle/project-one",
    image: "/images/projects/project-one.png",
    featured: true,
  },
  {
    name: "Project Two",
    description: "Placeholder description. A cross-platform mobile app.",
    role: "Mobile developer",
    tech: ["React Native", "Expo", "Firebase"],
    category: "Mobile",
    highlights: [
      "Placeholder highlight: offline support",
      "Placeholder highlight: push notifications",
    ],
    repo: "https://github.com/your-handle/project-two",
    image: "/images/projects/project-two.png",
    featured: true,
  },
  {
    name: "Project Three",
    description: "Placeholder description. A REST API that powers another app.",
    role: "Backend developer",
    tech: ["Node.js", "Express", "MongoDB", "Docker"],
    category: "Backend",
    highlights: [
      "Placeholder highlight: authentication and roles",
      "Placeholder highlight: automated tests and CI",
    ],
    repo: "https://github.com/your-handle/project-three",
    image: "/images/projects/project-three.png",
  },
  {
    name: "Project Four",
    description: "Placeholder description. A small tool or script that saves time.",
    role: "Solo developer",
    tech: ["Python", "CLI"],
    category: "Tools",
    highlights: ["Placeholder highlight: who uses it and why"],
    repo: "https://github.com/your-handle/project-four",
    image: "/images/projects/project-four.png",
  },
];

// ---------- Skills ----------

export const skills: SkillGroup[] = [
  { category: "Frontend", skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { category: "Backend", skills: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"] },
  { category: "Tools", skills: ["Git", "GitHub", "VS Code", "Figma", "Docker"] },
  { category: "Other", skills: ["Responsive design", "Accessibility", "Agile"] },
];

// ---------- Education & experience ----------

export const education: Education[] = [
  {
    school: "Your University",
    degree: "BS in Computer Science",
    start: "2020",
    end: "2024",
    details: "Placeholder: honors, thesis, or relevant coursework.",
  },
];

export const experience: Experience[] = [
  {
    company: "Company Name",
    position: "Junior Developer",
    start: "2024",
    end: "Present",
    location: "Remote",
    points: [
      "Placeholder: what you built or improved",
      "Placeholder: a result with a number if possible",
    ],
  },
  {
    company: "Another Company",
    position: "Developer Intern",
    start: "2023",
    end: "2023",
    location: "Manila",
    points: ["Placeholder: what you worked on during the internship"],
  },
];
