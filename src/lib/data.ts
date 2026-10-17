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
  /** Set to false to keep a link off the printable CV (it still shows on the site). */
  showOnCv?: boolean;
};

export type Stat = {
  /** Number the counter animates up to. */
  value: number;
  /** Appended after the number, e.g. "+" or "%". */
  suffix?: string;
  label: string;
};

export const projectCategories = ["Web", "Mobile"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

/** How each category reads in the "Type" cell under a project image. */
export const categoryTypes: Record<ProjectCategory, string> = {
  Web: "Web app",
  Mobile: "Mobile app",
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
  /** One short line under the category name. */
  description?: string;
  skills: string[];
};

export type Education = {
  school: string;
  degree: string;
  /** Years, e.g. "2023" and "2027". Leave out until you want them shown. */
  start?: string;
  end?: string;
  /** Shown when there are no years, e.g. "Currently enrolled". */
  status?: string;
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
    "I build web and mobile applications, from the database and server logic to the interface people use every day.",
  location: "Baliuag, Bulacan, Philippines",
  availability: "Open to opportunities",
  /**
   * Your photo, as a path under /public (e.g. "/images/profile.jpg").
   * Leave empty to show your initials instead.
   */
  photo: "",
  /** Contact number. Shown on the CV only, not in the site's Contact section. */
  phone: {
    display: "0962 274 0103",
    href: "tel:+639622740103",
  },
  /** Where "Download CV" goes. "/cv" is the printable CV page built from this file. */
  cvPath: "/cv",
  /** Your live URL, no trailing slash. Used for SEO, share previews and the sitemap. */
  siteUrl: "https://your-name.vercel.app",
  /** Shown by Google and in link previews. Aim for 120–160 characters. */
  siteDescription:
    "Portfolio of John Patrick D. Asuncion, an IT student at National University building web and mobile applications.",
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
  stack: ["React", "Flutter", "Supabase", "Firebase"],
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
  {
    label: "Instagram",
    href: "https://www.instagram.com/jp.asuncionn",
    display: "@jp.asuncionn",
    icon: "instagram",
    showOnCv: false,
  },
];

export const contactSection = {
  eyebrow: "Contact",
  title: "Get in touch",
  description:
    "Have a project, a role or a question in mind? Email is the quickest way to reach me, and I'm also on GitHub and Instagram.",
  emailLabel: "Email",
  /** Pre-filled subject for emails started from the site. */
  emailSubject: "Inquiry from your portfolio",
  sendEmail: "Send via Gmail",
  /** Fallback that opens the visitor's own email app (mailto:). */
  emailApp: "Email app",
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
    "I'm John Patrick D. Asuncion, an Information Technology student at National University and a full-stack developer from Baliuag, Bulacan, Philippines. I build web and mobile applications and usually work across the whole stack: database design, server logic and the interface people use.",
    "My recent work includes an online store with GCash payments and a delivery workflow, a service-booking marketplace built with PHP and MySQL, a Flutter marketplace for gamers with tournament brackets, and the web dashboard for CrayThrive, a team project that helps crayfish keepers monitor their tanks.",
    "I care about software that keeps working when real people use it: checkouts that can't oversell stock, access rules enforced by the database, and dashboards that flag problems before they grow.",
  ],
  /** "What I build" list in the About section. */
  focusTitle: "What I build",
  focus: [
    {
      title: "Web applications",
      description: "Storefronts and web apps with sign-in, payments, email notifications and order tracking.",
      tech: "React · Supabase · PostgreSQL",
    },
    {
      title: "Mobile apps",
      description: "Cross-platform apps with real-time chat, role-based access and live data.",
      tech: "Flutter · Firebase",
    },
    {
      title: "Admin dashboards",
      description: "Back-office views with charts, reports, alerts and user management for the people running a system.",
      tech: "React · Supabase · Recharts",
    },
  ],
  availabilityTitle: "Currently",
  /** Short facts shown on the profile cards (location and availability come from `profile`). */
  facts: [
    { label: "Education", value: "BSIT, National University" },
    { label: "Focus", value: "Web and mobile applications" },
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
      "Web dashboard for CrayThrive, a platform that helps crayfish keepers monitor tanks and water quality. Team project: built the web dashboard.",
    role: "Web dashboard developer",
    tech: ["React", "Vite", "JavaScript", "Supabase", "Recharts", "React Router"],
    category: "Web",
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
  {
    name: "H.A.N.A.P",
    description:
      "Handy Access Network for Available Providers: a marketplace for booking verified local service providers, with client, provider and admin dashboards.",
    role: "Full-stack developer",
    tech: ["PHP", "MySQL", "Bootstrap", "JavaScript", "PHPMailer"],
    category: "Web",
    highlights: [
      "Separate sign-ups for clients and service providers, with email OTP verification and password reset sent through PHPMailer",
      "Admin review of provider applications: verify, reject or suspend, with status filters",
      "Client and provider dashboards for bookings, reviews and messages",
      "Hashed passwords and session-based access for clients, providers and admins",
    ],
    // Captured from the local XAMPP copy; it has no images/ folder, so broken images were hidden for the shot.
    image: "/images/projects/hanap-home.png",
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

export const skillsSection = {
  eyebrow: "Skills",
  title: "Tools and technologies",
  description: "Grouped by area and drawn from the projects above, so every item here has been used in real work.",
  usedIn: "Used in",
};

/**
 * Skill names that match a project's `tech` entry exactly get a "Used in"
 * line listing those projects automatically.
 */
export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    description: "Web interfaces, routing and data visualisation.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Vite", "React Router", "Recharts", "Bootstrap"],
  },
  {
    category: "Mobile",
    description: "Cross-platform apps for Android, web and desktop.",
    skills: ["Flutter", "Dart"],
  },
  {
    category: "Backend & data",
    description: "Databases, authentication, storage and access rules.",
    skills: ["PHP", "MySQL", "Supabase", "PostgreSQL", "Row Level Security", "Firebase Auth", "Cloud Firestore", "Firebase Storage"],
  },
  {
    category: "Integrations",
    description: "Payments, transactional email and event-driven updates.",
    skills: ["PayMongo", "Resend", "PHPMailer", "Webhooks"],
  },
  {
    category: "Tools & deployment",
    description: "Version control and hosting.",
    skills: ["Git", "GitHub", "Netlify", "Vercel"],
  },
];

// ---------- Education & experience ----------

export const education: Education[] = [
  {
    school: "National University",
    degree: "Bachelor of Science in Information Technology",
    status: "Currently enrolled",
  },
];

/**
 * Work experience (jobs, OJT, freelance). Empty for now, so the CV hides the
 * section. Example entry:
 * { company: "Company", position: "IT Intern", start: "2026", end: "2026", location: "Bulacan", points: ["What you did"] }
 */
export const experience: Experience[] = [];

// ---------- CV ----------

export const cv = {
  /** Line under your name on the CV. */
  headline: "BS Information Technology Student · Full-Stack Developer",
  summary:
    "Information Technology student at National University who builds web and mobile applications, including an online store with GCash payments, a PHP and MySQL service-booking marketplace, a Flutter marketplace app and the web dashboard of a team-built monitoring platform.",
  /** How many of each project's highlights are listed on the CV (1 keeps four projects on one page). */
  projectHighlights: 1,
  /** Last section of the CV. Remove the text to hide the section. */
  references: "Available upon request.",
};
