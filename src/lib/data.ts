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
  icon: "email" | "github" | "linkedin" | "instagram";
};

export type Stat = {
  /** Number the counter animates up to. */
  value: number;
  /** Appended after the number, e.g. "+" or "%". */
  suffix?: string;
  label: string;
};

export const projectCategories = ["Web", "Mobile", "IoT"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

/** How each category reads in the "Type" cell under a project image. */
export const categoryTypes: Record<ProjectCategory, string> = {
  Web: "Web app",
  Mobile: "Mobile app",
  IoT: "IoT system",
};

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
  name: "John Patrick D. Asuncion",
  title: "Full-Stack Developer",
  intro:
    "I build web, mobile and IoT applications, from the database and server logic to the interface people use every day.",
  location: "Baliuag, Bulacan, Philippines",
  availability: "Open to opportunities",
  /**
   * Your photo, as a path under /public (e.g. "/images/profile.jpg").
   * Leave empty to show your initials instead.
   */
  photo: "",
  /** Where "Download CV" goes. "/cv" is the printable CV page built from this file. */
  cvPath: "/cv",
  /** Your live URL, no trailing slash. Used for SEO, share previews and the sitemap. */
  siteUrl: "https://your-name.vercel.app",
  /** Shown by Google and in link previews. Aim for 120–160 characters. */
  siteDescription:
    "Portfolio of John Patrick D. Asuncion, a full-stack developer from Baliuag, Bulacan building web, mobile and IoT applications.",
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
export const navCta = "Get in touch";

export const hero = {
  /** Shown on the profile card next to the headline, and used for SEO keywords. */
  stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
  buttons: {
    work: "View projects",
    contact: "Contact me",
    cv: "Download CV",
  },
  /** Row labels on the profile card. */
  card: {
    location: "Location",
    availability: "Availability",
    stack: "Core stack",
  },
};

export const contact: ContactLink[] = [
  { label: "Email", href: "mailto:jpasuncion2328@gmail.com", display: "jpasuncion2328@gmail.com", icon: "email" },
  { label: "GitHub", href: "https://github.com/jpasuncion23", display: "@jpasuncion23", icon: "github" },
  { label: "Instagram", href: "https://www.instagram.com/jp.asuncionn", display: "@jp.asuncionn", icon: "instagram" },
];

export const contactSection = {
  eyebrow: "Contact",
  title: "Get in touch",
  description:
    "Have a project, a role or a question in mind? Email is the quickest way to reach me, and I'm also on GitHub and Instagram.",
  emailLabel: "Email",
  sendEmail: "Send an email",
  copyEmail: "Copy address",
  copiedEmail: "Copied",
  cvTitle: "Curriculum vitae",
  cvDescription: "One-page CV, ready to print or save as PDF",
};

// ---------- About ----------

export const about = {
  eyebrow: "About",
  heading: "About me",
  paragraphs: [
    "I'm John Patrick D. Asuncion, a full-stack developer from Baliuag, Bulacan, Philippines. I build web, mobile and IoT applications and usually work across the whole stack: database design, server logic and the interface people use.",
    "My recent work includes an online store with GCash payments and a delivery workflow, a Flutter marketplace for gamers with tournament brackets, and the web dashboard for CrayThrive, a team-built IoT system that monitors crayfish tanks.",
    "I care about software that keeps working when real people use it: checkouts that can't oversell stock, access rules enforced by the database, and dashboards that flag problems before they grow.",
  ],
  /** "What I build" list in the About section. */
  focusTitle: "What I build",
  focus: [
    {
      title: "Web applications",
      description: "Storefronts and admin dashboards with sign-in, payments, email notifications and reports.",
      tech: "React · Next.js · Supabase",
    },
    {
      title: "Mobile apps",
      description: "Cross-platform apps with real-time chat, role-based access and live data.",
      tech: "Flutter · Firebase",
    },
    {
      title: "IoT dashboards",
      description: "Web views for sensor readings, alerts and thresholds coming from connected devices.",
      tech: "Supabase · Recharts",
    },
  ],
  availabilityTitle: "Currently",
  /** Short facts shown on the profile cards (location and availability come from `profile`). */
  facts: [
    { label: "Focus", value: "Web, mobile and IoT applications" },
    { label: "Languages", value: "English, Filipino" },
  ],
};

// ---------- Projects ----------

export const workSection = {
  eyebrow: "Selected work",
  title: "Projects",
  description:
    "Recent projects, with the problems they solve, the technology behind them, and links to the live sites and source code.",
  filterAll: "All",
  liveLabel: "Live site",
  sourceLabel: "Source code",
  /** Labels for the strip under each project image. */
  meta: {
    type: "Type",
    role: "Role",
    stack: "Stack",
  },
};

export const projects: Project[] = [
  {
    name: "Brass & Thread",
    description:
      "An online store for overrun shirts, with ShopTrack, an admin dashboard for inventory and orders, and a driver portal for deliveries.",
    role: "Full-stack developer",
    tech: ["JavaScript", "HTML", "CSS", "Supabase", "PostgreSQL", "PayMongo", "Resend"],
    category: "Web",
    highlights: [
      "GCash payments through PayMongo, with orders marked paid automatically by a webhook",
      "Checkout runs as one database transaction that re-checks stock, so two buyers can't take the last unit",
      "One login that sends customers, admins and drivers to their own views, enforced by Row Level Security",
      "Drivers mark deliveries from their phone with a required proof-of-delivery photo; customers get status emails and can track orders by number",
    ],
    link: "https://brassthread.netlify.app",
    repo: "https://github.com/jpasuncion23/brass-and-thread",
    image: "/images/projects/brass-and-thread-hero.png",
    featured: true,
  },
  {
    name: "GameLink",
    description:
      "A marketplace app where gamers post rank-boosting or coaching requests and approved sellers send offers, plus community tournaments with brackets.",
    role: "Mobile developer",
    tech: ["Flutter", "Dart", "Firebase Auth", "Cloud Firestore", "Firebase Storage"],
    category: "Mobile",
    highlights: [
      "Buyer, seller and admin roles: admins approve seller applications and resolve disputes",
      "Requests for 9 games, each with its own rank ladder, plus offers, real-time chat and reviews",
      "Tournament registration with a single-elimination bracket generated automatically when the last slot fills",
      "Runs on Android, web and Windows from one codebase",
    ],
    repo: "https://github.com/jpasuncion23/gamelink",
    image: "/images/projects/gamelink-home.png",
    featured: true,
  },
  {
    name: "CrayThrive",
    description:
      "A smart aquaculture system for crayfish keepers that combines IoT tank sensors, a mobile app and a web dashboard. Team project; I built the web dashboard.",
    role: "Web dashboard developer",
    tech: ["React", "Vite", "JavaScript", "Supabase", "Recharts", "React Router"],
    category: "IoT",
    highlights: [
      "Tank monitoring with temperature, pH, turbidity, water level and ammonia readings from the tank sensors",
      "Alerts for out-of-range readings, feeding and pump activity, with adjustable thresholds",
      "Ammonia reading records captured by an ESP32-CAM, with a history view",
      "Reports with charts, CSV export and print, plus management of a crayfish-only marketplace",
    ],
    // The source lives in a private team repository, so only the live site is linked.
    link: "https://www.craythrive.site",
    image: "/images/projects/craythrive-landing.png",
    featured: true,
  },
];

/**
 * Counters in the About section. Worked out from `projects`, so they stay
 * accurate as projects are added or removed.
 */
export const stats: Stat[] = [
  { value: projects.length, label: "Featured projects" },
  { value: projects.filter((project) => project.link).length, label: "Live deployments" },
  { value: new Set(projects.flatMap((project) => project.tech)).size, label: "Technologies used" },
  { value: new Set(projects.map((project) => project.category)).size, label: "Platforms" },
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
