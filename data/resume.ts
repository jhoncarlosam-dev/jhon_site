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

export type Offer = {
  name: string;
  price: string;
  term: string;
  description: string;
  included: string[];
};

export type CaseStudy = {
  name: string;
  href: string;
  role: string;
  summary: string;
  before: string;
  after: string[];
};

export type SkillIcon = {
  name: string;
  icon:
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
  role: "Desarrollador fullstack freelance",
  tagline:
    "Sitios y sistemas para negocios que ya venden y necesitan verse serios en internet.",
  title: "Jhon Acevedo — Desarrollador fullstack freelance",
  description:
    "Desarrollador fullstack freelance en Arboledas, Norte de Santander. Termino Ingeniería de Sistemas en la UNAD. Diseño y programo sitios y sistemas con React, Next.js, Laravel y MySQL.",
  location: "Arboledas, Norte de Santander",
  locationDetail: "Av 6 #1-23 SECTOR HOSPITAL · Arboledas, Colombia",
  phone: "(322) 4095-117",
  phoneHref: "tel:+573224095117",
  email: "jhoncarlosacevedomendoza@gmail.com",
  whatsapp: {
    href: "https://wa.me/573224095117",
    label: "Escribir por WhatsApp",
    detail: "+57 322 409 5117",
  },
  profileImage: "/profile.webp",
  profileImageFallback: "/profile.jpg",
  summary:
    "Soy ingeniero de sistemas en formación en la UNAD y trabajo como fullstack freelance: frontend, backend y base de datos en un solo encargo. También pruebo lo que entrego —hoy soy QA Analyst en plataformas SaaS internacionales— para que el sitio no se caiga el día del lanzamiento.",
  nav: [
    { id: "inicio", label: "Inicio" },
    { id: "ofertas", label: "Ofertas" },
    { id: "trabajo", label: "Trabajo" },
    { id: "proceso", label: "Proceso" },
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
  offers: [
    {
      name: "Página de presentación",
      price: "1.400.000 COP",
      term: "10 días",
      description:
        "Un sitio nuevo de 4 o 5 páginas: portada, qué ofreces, quién eres y pedido por WhatsApp. Lo dejo listo para publicar.",
      included: [
        "Diseño y desarrollo fullstack",
        "Versión móvil",
        "Formulario o botón de WhatsApp",
      ],
    },
    {
      name: "Rediseño",
      price: "1.060.000 COP",
      term: "8 días",
      description:
        "Rehago un sitio que ya existe —plantilla vieja o cara de 2015— sin perder tu información ni tu dominio.",
      included: [
        "Nueva cara y estructura",
        "Mismos datos del negocio",
        "Publicación en tu hosting",
      ],
    },
    {
      name: "Cuidado mensual",
      price: "150.000 COP",
      term: "mes a mes",
      description:
        "Cambios de texto y fotos, ajustes chicos y que el sitio no se quede tirado después de la entrega.",
      included: [
        "Cambios acordados en el mes",
        "Revisión de que cargue bien",
        "Respuesta por WhatsApp",
      ],
    },
  ] satisfies Offer[],
  offerTerms: [
    "50 % para empezar, 50 % al entregar",
    "Dos rondas de cambios incluidas",
    "El dominio queda a nombre del cliente",
    "El .com, si lo necesitas, se cobra aparte como gasto",
  ],
  caseStudy: {
    name: "Café Marrón",
    href: "https://cafemarron.co/",
    role: "Rediseño fullstack",
    summary:
      "Café artesanal y orgánico de la finca El Cacique Cínera, en Arboledas. Lo fundó Cristian Acevedo en 2024. El sitio tenía una plantilla genérica; hoy cuenta el origen, las presentaciones y el pedido por WhatsApp.",
    before:
      "Plantilla Business Casual: se veía como cualquier cafetería de internet, no como una finca de Norte de Santander.",
    after: [
      "Cuatro páginas propias: portada, presentaciones, origen, horario y pedido",
      "Pedido directo por WhatsApp, domicilio e Interrapidísimo",
      "Favicon de grano y un contador de visitas que sí suma en todos los navegadores",
    ],
  } satisfies CaseStudy,
  process: [
    {
      step: "01",
      title: "Hablamos",
      detail:
        "Me escribes por WhatsApp. Me cuentas qué vendes y si ya tienes sitio o empiezas de cero.",
    },
    {
      step: "02",
      title: "Arrancamos",
      detail:
        "50 % para reservar la fecha. Te digo qué necesito (textos, fotos, logo) y en cuántos días ves la primera versión.",
    },
    {
      step: "03",
      title: "Revisas",
      detail:
        "Dos rondas de cambios. Ajustamos textos, fotos y el pedido. No rehacemos el proyecto desde cero en cada ronda.",
    },
    {
      step: "04",
      title: "Queda tuyo",
      detail:
        "Publicamos. El dominio queda a tu nombre. Si quieres, seguimos con el cuidado mensual.",
    },
  ],
  experience: [
    {
      title: "QA Analyst",
      company: "Nelumbo Consultores",
      location: "Cúcuta, Colombia (remoto)",
      period: "2025 — actual",
      description:
        "Pruebas manuales y automatizadas de plataformas SaaS en México y Europa (CheckPlus, Obras, IDP Health). Investigué y documenté fallos graves: zonas horarias, cuellos de botella y condiciones de carrera. Semilla de automatización con Playwright, matrices de prueba, carga con JMeter y manuales de usuario.",
    },
    {
      title: "Desarrollador fullstack Angular",
      company: "Academia Inglés Para Todos",
      location: "San José de Cúcuta, Colombia",
      period: "febrero 2023 — junio 2023",
      description:
        "Aplicaciones web con Angular y Laravel, MySQL, pruebas de endpoints con Postman, soporte al cliente y supervisión de pruebas EKT en la Universidad Libre de Cúcuta.",
    },
    {
      title: "Desarrollador front-end freelance",
      company: "Artemisa Plant Shop",
      location: "San José de Cúcuta, Colombia",
      period: "agosto 2021 — noviembre 2021",
      description:
        "Tienda en línea para venta de plantas. Maquetación con HTML y CSS, y reuniones para validar cambios y fechas de entrega.",
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
      period: "febrero 2017",
      detail:
        "Semilleros SILUX (distribuciones Linux) y SIAWEB (desarrollo web).",
    },
  ] satisfies Education[],
  skillIcons: [
    { name: "HTML5", icon: "html5" },
    { name: "CSS3", icon: "css3" },
    { name: "JavaScript", icon: "js" },
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "next" },
    { name: "Angular", icon: "angular" },
    { name: "Node.js", icon: "node" },
    { name: "Laravel", icon: "laravel" },
    { name: "MySQL", icon: "database" },
    { name: "Git", icon: "git" },
    { name: "npm", icon: "npm" },
  ] satisfies SkillIcon[],
  skillBadges: [
    "Playwright",
    "Postman",
    "Docker",
    "JMeter",
    "Python",
    "ISTQB (en curso)",
  ],
  workflow: [
    "Sitio que se lee bien en el celular",
    "Pruebo lo que entrego, no solo lo diseño",
    "Frontend, backend y base de datos en el mismo encargo",
    "Trato directo por WhatsApp, sin agencia en el medio",
  ],
  languagesNote: "Español nativo. Inglés en progreso (A2/B1, rumbo a B1).",
  awards: [
    "Python for Data Science — Fractal Analytics (Coursera)",
    "Data Analysis with Python — IBM (Coursera)",
    "Python Essentials 2 — Cisco Networking Academy",
    "JavaScript Essentials 2 — Cisco Networking Academy",
  ],
};
