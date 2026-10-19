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
  description: string[];
};

export type Education = {
  school: string;
  program: string;
  period: string;
  detail?: string;
};

export type Project = {
  name: string;
  href: string;
  linkLabel: string;
  secondaryHref?: string;
  secondaryLinkLabel?: string;
  role: string;
  summary: string;
  stack: string[];
  points: string[];
};

export type SkillIcon = {
  name: string;
  icon:
    | "python"
    | "html5"
    | "css3"
    | "js"
    | "angular"
    | "react"
    | "next"
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
  brand: "Jhon Acevedo",
  role: "Desarrollador backend",
  roleShort: "Backend · Python y MySQL",
  tagline:
    "APIs y bases de datos relacionales, con el mismo cuidado con el que pruebo un sistema que ya está en producción.",
  title: "Jhon Acevedo — Desarrollador backend",
  description:
    "Desarrollador backend en Norte de Santander. Ingeniería de Sistemas en la UNAD, etapa final. APIs con Python (FastAPI y Django), Laravel y MySQL. También hago pruebas de plataformas SaaS.",
  location: "Norte de Santander, Colombia",
  locationDetail: "Arboledas, Norte de Santander · teletrabajo en Colombia",
  phone: "(322) 4095-117",
  phoneHref: "tel:+573224095117",
  email: "jhoncarlosacevedomendoza@gmail.com",
  whatsapp: {
    href: "https://wa.me/573224095117",
    label: "WhatsApp",
    detail: "+57 322 409 5117",
  },
  profileImage: "/profile.webp",
  profileImageFallback: "/profile.jpg",
  summary:
    "Estoy terminando Ingeniería de Sistemas en la UNAD. Construyo APIs en Python (FastAPI y Django) y ya trabajé con Laravel y MySQL en aplicaciones web. Hoy, como QA Analyst, pruebo plataformas SaaS que usan equipos en México y Europa: zonas horarias, cuellos de botella y condiciones de carrera.",
  nav: [
    { id: "inicio", label: "Inicio" },
    { id: "proyectos", label: "Proyectos" },
    { id: "experiencia", label: "Experiencia" },
    { id: "stack", label: "Stack" },
    { id: "formacion", label: "Formación" },
    { id: "contacto", label: "Contacto" },
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
  projects: [
    {
      name: "Arrenda",
      href: "https://github.com/jhoncarlosam-dev/arrenda",
      linkLabel: "Ver la API en GitHub",
      role: "API REST · proyecto propio",
      summary:
        "Backend para contratos de arriendo, con dos roles: arrendador y arrendatario. El arrendador crea y edita contratos; el arrendatario consulta y exporta el recibo.",
      stack: ["FastAPI", "SQLAlchemy", "MySQL", "JWT", "Pytest"],
      points: [
        "Autenticación con JWT y contraseñas con bcrypt",
        "Modelo relacional, migraciones con Alembic y validación con Pydantic",
        "Pruebas de la API con Pytest y HTTPX",
      ],
    },
    {
      name: "Créditos y tareas",
      href: "https://github.com/jhoncarlosam-dev/sistema_credito",
      linkLabel: "Ver el sistema de créditos",
      secondaryHref: "https://github.com/jhoncarlosam-dev/django-react-crud",
      secondaryLinkLabel: "Ver la API de tareas",
      role: "Django · proyecto propio",
      summary:
        "Dos piezas en Django. Un sistema de créditos, pagos y garantías, y una API de tareas con Django REST Framework y documentación OpenAPI.",
      stack: ["Django", "Django REST Framework", "SQLite", "OpenAPI"],
      points: [
        "CRUD de usuarios, créditos, pagos y garantías",
        "API de tareas documentada con Swagger",
      ],
    },
    {
      name: "Café Marrón",
      href: "https://cafemarron.co/",
      linkLabel: "Ver cafemarron.co",
      role: "Sitio en producción",
      summary:
        "Sitio de la finca El Cacique Cínera, en Arboledas. Sustituí una plantilla genérica por cuatro páginas propias y el pedido quedó por WhatsApp.",
      stack: ["HTML", "CSS", "JavaScript"],
      points: [
        "Portada, presentaciones, origen y pedido",
        "Publicado en el dominio del negocio",
        "El encargo salió a producción, no se quedó en un boceto",
      ],
    },
  ] satisfies Project[],
  experience: [
    {
      title: "QA Analyst",
      company: "Nelumbo Consultores",
      location: "Cúcuta, Colombia (remoto)",
      period: "2025 — actual",
      description: [
        "Pruebas manuales y automatizadas de plataformas SaaS usadas en México y Europa: CheckPlus, Obras e IDP Health.",
        "Investigué y documenté fallos de zona horaria, cuellos de botella y condiciones de carrera para el equipo de desarrollo.",
        "Dejé una base de automatización con Playwright, matrices de prueba, carga con JMeter y manuales de usuario.",
      ],
    },
    {
      title: "Desarrollador fullstack",
      company: "Academia Inglés Para Todos",
      location: "San José de Cúcuta, Colombia",
      period: "febrero 2023 — junio 2023",
      description: [
        "Aplicaciones web con Angular en el cliente y Laravel más MySQL en el servidor.",
        "Probé endpoints con Postman antes de entregarlos a soporte.",
        "Acompañé las pruebas EKT en la Universidad Libre de Cúcuta.",
      ],
    },
    {
      title: "Desarrollador front-end freelance",
      company: "Artemisa Plant Shop",
      location: "San José de Cúcuta, Colombia",
      period: "agosto 2021 — noviembre 2021",
      description: [
        "Tienda en línea para venta de plantas, maquetada con HTML y CSS.",
        "Reuniones para cerrar cambios y fechas de entrega.",
      ],
    },
  ] satisfies Experience[],
  education: [
    {
      school: "Universidad Nacional Abierta y a Distancia (UNAD)",
      program: "Ingeniería de Sistemas — en curso, etapa final",
      period: "febrero 2025 — actual",
    },
    {
      school: "Universidad Autónoma de Bucaramanga (UNAB)",
      program: "Diplomado en Desarrollo de Software — Misión TIC 2022",
      period: "marzo 2022 — octubre 2022",
      detail: "Ingeniería de software, programación y fundamentos de sistemas.",
    },
    {
      school: "Universidad Francisco de Paula Santander",
      program: "Ingeniería de Sistemas",
      period: "desde febrero 2017",
      detail:
        "Semilleros SILUX (distribuciones Linux) y SIAWEB (desarrollo web). Ahí participé, con dos compañeros, en la API EasyCredit.",
    },
  ] satisfies Education[],
  skillIcons: [
    { name: "Python", icon: "python" },
    { name: "MySQL", icon: "database" },
    { name: "Laravel", icon: "laravel" },
    { name: "Node.js", icon: "node" },
    { name: "JavaScript", icon: "js" },
    { name: "Git", icon: "git" },
    { name: "Angular", icon: "angular" },
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "next" },
  ] satisfies SkillIcon[],
  skillBadges: [
    "FastAPI",
    "Django",
    "SQL",
    "JWT",
    "Postman",
    "Docker",
    "Playwright",
    "Pytest",
    "JMeter",
  ],
  workflow: [
    "API REST con recursos claros y códigos HTTP coherentes",
    "El modelo relacional queda definido antes de la pantalla",
    "Pruebo endpoints, carga y fallos de concurrencia",
    "El trabajo queda en un repositorio, con README",
  ],
  languagesNote: "Español nativo. Inglés en progreso (A2/B1, rumbo a B1).",
  awards: [
    "Python for Data Science — Fractal Analytics (Coursera)",
    "Data Analysis with Python — IBM (Coursera)",
    "Python Essentials 2 — Cisco Networking Academy",
    "JavaScript Essentials 2 — Cisco Networking Academy",
  ],
};
