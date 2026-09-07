export type NavItem = {
  id: string;
  label: string;
};

export type SocialLink = {
  name: string;
  href: string;
  icon: "linkedin" | "github" | "tiktok" | "x" | "facebook";
};

export type Experience = {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
};

export type Education = {
  school: string;
  program: string;
  period: string;
  detail?: string;
};

export type Language = {
  name: string;
  level: string;
  period?: string;
  description?: string;
};

export type Service = {
  title: string;
  description: string;
  icon: "web" | "qa" | "mentor" | "video" | "systems";
};

export type SkillIcon = {
  name: string;
  icon:
    | "html5"
    | "css3"
    | "js"
    | "angular"
    | "react"
    | "node"
    | "npm"
    | "git"
    | "database"
    | "laravel";
};

export const resume = {
  name: "Jhon",
  lastName: "Acevedo",
  fullName: "Jhon Acevedo",
  brand: "Jhon {DEV}",
  tagline:
    "Convierto ideas en soluciones tecnológicas que impulsan tu negocio o proyecto.",
  title: "Resume — Jhon Acevedo",
  description:
    "QA Analyst with experience testing international SaaS platforms, currently working toward ISTQB Foundation certification and building automation skills with Playwright.",
  location: "Av 6 #1-23 SECTOR HOSPITAL · Arboledas, Colombia",
  phone: "(322) 4095-117",
  phoneHref: "tel:+573224095117",
  email: "jhoncarlosacevedomendoza@gmail.com",
  whatsapp: {
    href: "https://wa.me/573224095117",
    label: "Escríbeme al +57 322 409 5117",
  },
  profileImage: "/profile.webp",
  profileImageFallback: "/profile.jpg",
  summary:
    "QA Analyst with experience testing international SaaS platforms, currently working toward ISTQB Foundation certification and building automation skills with Playwright. I'm also on a path toward DevOps, learning Docker and cloud fundamentals through hands-on projects. Alongside my QA work, I'm a Systems Engineering student and a freelance web developer with experience in Laravel, Angular and MySQL.",
  nav: [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "languages", label: "Languages" },
    { id: "services", label: "Services" },
    { id: "interests", label: "Interests" },
    { id: "awards", label: "Awards" },
  ] satisfies NavItem[],
  socials: [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/jhon-carlos-acevedo-mendoza/",
      icon: "linkedin",
    },
    {
      name: "GitHub",
      href: "https://github.com/jhoncarlosam-dev",
      icon: "github",
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@kenrock55",
      icon: "tiktok",
    },
    {
      name: "X",
      href: "https://x.com/kenrock55qa",
      icon: "x",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/iamjhoncarlosam/",
      icon: "facebook",
    },
  ] satisfies SocialLink[],
  experience: [
    {
      title: "QA Analyst",
      company: "Nelumbo Consultores",
      location: "Cúcuta, Colombia (Remote)",
      period: "2025 — Present",
      description:
        "Manual and automated testing of international SaaS platforms, including CheckPlus (Mexico), Obras (Mexico) and IDP Health (Europe). Investigation and documentation of critical bugs (timezone issues, performance bottlenecks, race conditions). Building a Playwright-based automation seed project to support test data preparation. Creation of test matrices, load/stress test configurations with JMeter, incident reports and user manuals.",
    },
    {
      title: "Full Stack Developer Angular",
      company: "Academia Inglés Para Todos",
      location: "San José de Cúcuta, Colombia",
      period: "February 2023 — June 2023",
      description:
        "Desarrollo de aplicaciones web responsivas utilizando Angular (frontend) y Laravel (backend). Administración y consultas de bases de datos MySQL. Pruebas e integración de endpoints con Postman. Experiencia en trabajo colaborativo y resolución de desafíos técnicos. Atención al cliente y soporte técnico. Supervisión de pruebas EKT en la Universidad Libre de Cúcuta.",
    },
    {
      title: "Freelance Front-End Developer",
      company: "Artemisa Plant Shop",
      location: "San José de Cúcuta, Colombia",
      period: "August 2021 — November 2021",
      description:
        "Diseño y desarrollo de tienda en línea para la venta de plantas. Maquetación y programación usando HTML y CSS. Organización de reuniones para validación de cambios y tiempos de entrega.",
    },
  ] satisfies Experience[],
  education: [
    {
      school: "Universidad Nacional Abierta y a Distancia (UNAD) — Colombia",
      program: "Ingeniería de Sistemas",
      period: "February 2025 — Present",
    },
    {
      school: "Universidad Autónoma de Bucaramanga (UNAB)",
      program: "Diplomado en Desarrollo de Software — Misión TIC 2022",
      period: "March 2022 — October 2022",
      detail: "Ingeniería de Software, programación y fundamentos de sistemas.",
    },
    {
      school: "Universidad Francisco de Paula Santander",
      program: "Ingeniería de Sistemas",
      period: "February 2017",
      detail:
        "Miembro de los semilleros de investigación SILUX (distribuciones Linux) y SIAWEB (desarrollo web).",
    },
  ] satisfies Education[],
  skillIcons: [
    { name: "HTML5", icon: "html5" },
    { name: "CSS3", icon: "css3" },
    { name: "JavaScript", icon: "js" },
    { name: "Angular", icon: "angular" },
    { name: "React", icon: "react" },
    { name: "Node.js", icon: "node" },
    { name: "npm", icon: "npm" },
    { name: "Git", icon: "git" },
    { name: "MySQL", icon: "database" },
    { name: "Laravel", icon: "laravel" },
  ] satisfies SkillIcon[],
  skillBadges: [
    "Playwright",
    "JMeter",
    "Postman",
    "Docker",
    "MySQL",
    "ISTQB (in progress)",
  ],
  workflow: [
    "Mobile-First, Responsive Design",
    "Cross Browser Testing & Debugging",
    "Cross Functional Teams",
    "Agile Development & Scrum",
  ],
  languages: [
    {
      name: "Spanish",
      level: "Native",
    },
    {
      name: "English",
      level: "Working toward B1 — currently A2/B1",
      period: "In progress",
      description:
        "Actively improving English proficiency through a structured daily study routine combining input, written output and vocabulary practice (Anki), using real day-to-day experiences as practice material.",
    },
  ] satisfies Language[],
  services: [
    {
      title: "Desarrollo Web (React / Python)",
      description: "Sitios y aplicaciones web modernas, rápidas y funcionales.",
      icon: "web",
    },
    {
      title: "QA Manual y Automatizado",
      description:
        "Pruebas funcionales y automatización con Playwright para asegurar calidad.",
      icon: "qa",
    },
    {
      title: "Asesorías y Mentorías",
      description:
        "Acompañamiento en programación, QA y desarrollo de proyectos.",
      icon: "mentor",
    },
    {
      title: "Edición de Videos",
      description:
        "Edición de contenido para redes y proyectos personales o de marca.",
      icon: "video",
    },
    {
      title: "Formateo e Instalación de Sistemas",
      description:
        "Optimización de equipos e instalación de Windows o Linux listos para usar.",
      icon: "systems",
    },
  ] satisfies Service[],
  interests: [
    "Besides being a web developer, I enjoy taking advantage of my time in different plans that allow me to disconnect and recharge my batteries. When I have the opportunity, I like to go out to see new cities, enjoy a good meal or just have a drink in good company.",
    "During my free time, I also dedicate space to activities that keep me active, such as going to the gym, going for a run or playing volleyball. In addition, I enjoy relaxing plans like going to the pool or spending an afternoon playing video games.",
    "On the other hand, I am interested in discovering new hobbies; for example, I would like to learn how to dance salsa and I don't rule out the idea of going out for drinks more often with friends I meet through social networks.",
    "When I'm at home, I like to watch movies, especially sagas that combine action and science fiction like The Hunger Games, Blade Runner or musicals like La La Land. I also take the opportunity to explore new music, recommend songs on social networks and every now and then, stream or share content that inspires me.",
    "Although I used to draw, over time I discovered that I enjoy much more the plans where I can connect with other people, since being alone for too long is no longer something that excites me.",
  ],
  awards: [
    "Python for Data Science — Fractal Analytics (Coursera)",
    "Data Analysis with Python — IBM (Coursera)",
    "Python Essentials 2 — Cisco Networking Academy",
    "JavaScript Essentials 2 — Cisco Networking Academy",
  ],
};
