import {
  SiCss, SiFastapi, SiFlask, SiGit, SiGithub,
  SiHtml5, SiJavascript, SiNodedotjs, SiPostman, SiPython,
  SiReact, SiRender, SiTailwindcss,
} from "react-icons/si";
import { VscDatabase } from "react-icons/vsc";
import { FiCloud, FiCode, FiCpu } from "react-icons/fi";
import type { Project, SkillGroup } from "./types";

export const navItems = ["Home", "Skills", "Experience", "Projects", "Contact"];

export const roles = [
  "Full Stack Developer", "FastAPI Developer", "Python Developer", "React Developer", "AI Integration Developer",
];

export const experienceItems = [
  { period: "SEP 2024 — OCT 2025", role: "Associate Software Developer", company: "Togglr Solutions Pvt Ltd", summary: "Developed responsive React interfaces and connected them to RESTful services for dynamic, reliable product experiences.", achievements: ["Built interactive interfaces with React.js, HTML, CSS, and JavaScript", "Collaborated across UI/UX and backend teams on API integration", "Improved responsiveness, browser compatibility, debugging, and performance", "Contributed to code reviews and agile team ceremonies"] },
  { period: "MAR 2024 — JUN 2024", role: "Jr. Software Developer", company: "Sajal Technologies", summary: "Created reusable frontend building blocks and integrated asynchronous product data in an agile development environment.", achievements: ["Built reusable UI components for scalable applications", "Implemented React Router for seamless client-side navigation", "Integrated third-party APIs and handled asynchronous data", "Worked with mentorship through agile development practices"] },
  { period: "JUL 2022 — JAN 2023", role: "Front End Developer Intern", company: "Sabertooth Technologies", summary: "Built a practical foundation in modern frontend development while contributing to live product work under senior guidance.", achievements: ["Trained hands-on with HTML, CSS, JavaScript, and React.js", "Debugged frontend modules and improved UI/UX", "Contributed to live projects with guidance from the team", "Gained exposure to the complete software development lifecycle"] },
] as const;

export const skillGroups: SkillGroup[] = [
  { category: "Frontend", accent: "#00f5ff", skills: [
    { name: "React", icon: SiReact, color: "#61dafb" }, { name: "HTML", icon: SiHtml5, color: "#e34f26" },
    { name: "CSS", icon: SiCss, color: "#1572b6" }, { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#38bdf8" },
  ]},
  { category: "Backend", accent: "#8b5cf6", skills: [
    { name: "Python", icon: SiPython, color: "#ffd43b" }, { name: "FastAPI", icon: SiFastapi, color: "#00b88a" },
    { name: "Flask", icon: SiFlask, color: "#07546c" }, { name: "Node.js", icon: SiNodedotjs, color: "#5fa04e" },
  ]},
  { category: "Database", accent: "#ff6b6b", skills: [
    { name: "SQL", icon: VscDatabase, color: "#00a6a6" },
  ]},
  { category: "AI Systems", accent: "#00f5ff", skills: [
    { name: "OpenAI API", icon: FiCpu, color: "#10a37f" }, { name: "AI Chatbots", icon: FiCpu, color: "#07546c" },
  ]},
  { category: "Tools", accent: "#8b5cf6", skills: [
    { name: "Git", icon: SiGit, color: "#f05032" }, { name: "GitHub", icon: SiGithub, color: "#181717" },
    { name: "Postman", icon: SiPostman, color: "#ff6c37" }, { name: "VS Code", icon: FiCode, color: "#23a8f2" },
  ]},
  { category: "Cloud", accent: "#ff6b6b", skills: [
    { name: "Render", icon: SiRender, color: "#46e3b7" }, { name: "AWS Basics", icon: FiCloud, color: "#ff9900" },
  ]},
];

export const projects: Project[] = [
  {
    id: "fleet", number: "01", title: "Fleet Management Dashboard", eyebrow: "Operations intelligence",
    description: "A high-signal command center that turns fleet telemetry into decisions operators can act on instantly.",
    problem: "Fleet teams need to monitor assets, exceptions, and maintenance signals without drowning in disconnected data.",
    solution: "A responsive analytics workspace that prioritizes live status, risk, utilization, and actionable alerts.",
    stack: ["React", "FastAPI", "Python", "SQL"],
    features: ["Live fleet overview", "Exception-first workflows", "Responsive data views", "Role-aware actions"],
    gradient: "from-cyan-400/30 via-indigo-500/20 to-transparent", glyph: "FM",
    architecture: ["Vehicle signals", "FastAPI services", "SQL data layer", "React command center"],
  },
  {
    id: "tracking", number: "02", title: "Vehicle Tracking Platform", eyebrow: "Real-time mobility",
    description: "A location experience designed to make movement, route health, and asset status immediately legible.",
    problem: "Operations teams lose time when location data is delayed, visually noisy, or separated from vehicle context.",
    solution: "A unified tracking surface pairing map intelligence with clear states, history, and alert-driven navigation.",
    stack: ["React", "REST APIs", "FastAPI", "Maps"],
    features: ["Live status model", "Route history", "Map-led interactions", "Geofence-ready UX"],
    gradient: "from-violet-500/35 via-cyan-500/15 to-transparent", glyph: "VT",
    architecture: ["GPS provider", "Tracking API", "Event processing", "Interactive map UI"],
  },
  {
    id: "disaster", number: "03", title: "Disaster Recovery Dashboard", eyebrow: "Resilience operations",
    description: "A calm, decisive interface for understanding system readiness and coordinating recovery under pressure.",
    problem: "During an incident, fragmented recovery metrics make it difficult to assess health and choose the next action.",
    solution: "A severity-led dashboard that consolidates service status, recovery objectives, owners, and progress.",
    stack: ["React", "Python", "SQL", "REST APIs"],
    features: ["Recovery readiness", "Incident severity", "RTO/RPO visibility", "Operational timelines"],
    gradient: "from-rose-500/30 via-violet-500/20 to-transparent", glyph: "DR",
    architecture: ["Service monitors", "Recovery engine", "Operational database", "Resilience dashboard"],
  },
  {
    id: "ai", number: "04", title: "AI Integrated Web Applications", eyebrow: "Applied intelligence",
    description: "Human-centered AI product patterns that turn language models into useful, dependable workflows.",
    problem: "AI features often feel bolted on, lack context, and provide little visibility into what users should do next.",
    solution: "Purpose-built interactions combining grounded context, predictable states, and API-first orchestration.",
    stack: ["OpenAI API", "LLMs", "RAG", "FastAPI"],
    features: ["Context grounding", "Streaming responses", "Prompt orchestration", "Resilient fallbacks"],
    gradient: "from-cyan-400/30 via-emerald-500/15 to-transparent", glyph: "AI",
    architecture: ["Product context", "RAG pipeline", "LLM orchestration", "Conversational interface"],
  },
  {
    id: "fullstack", number: "05", title: "React + FastAPI Systems", eyebrow: "Full-stack engineering",
    description: "End-to-end products where polished React experiences meet typed, performant Python APIs.",
    problem: "Product velocity suffers when frontend and backend contracts drift or infrastructure obscures the user goal.",
    solution: "A pragmatic system with crisp API boundaries, reusable UI primitives, and maintainable service layers.",
    stack: ["React", "FastAPI", "Python", "Tailwind"],
    features: ["Typed contracts", "Reusable components", "API documentation", "Responsive delivery"],
    gradient: "from-indigo-500/30 via-cyan-400/15 to-transparent", glyph: "RF",
    architecture: ["React client", "REST contract", "FastAPI domain layer", "SQL persistence"],
  },
];

export const stats = [
  { value: 5, suffix: "+", label: "Product systems" },
  { value: 25, suffix: "+", label: "Months hands-on experience" },
  { value: 24, suffix: "+", label: "Technologies" },
  { value: 100, suffix: "%", label: "Craft commitment" },
];
