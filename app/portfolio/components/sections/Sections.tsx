"use client";
/* eslint-disable @next/next/no-img-element -- Sites does not support vinext's runtime image optimizer. */

import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { FiArrowDown, FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiSend, FiZap } from "react-icons/fi";
import { experienceItems, projects, roles, skillGroups, stats } from "../../data";
import { sendContactEmail } from "../../lib/emailjs";
import type { Project } from "../../types";
import { SectionHeading } from "../ui/SectionHeading";

function Typewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const role = roles[roleIndex];
    const done = text === role;
    const empty = text === "";
    const timer = window.setTimeout(() => {
      if (done && !deleting) return setDeleting(true);
      if (empty && deleting) { setDeleting(false); setRoleIndex((value) => (value + 1) % roles.length); return; }
      setText(role.slice(0, text.length + (deleting ? -1 : 1)));
    }, done ? 1450 : deleting ? 32 : 62);
    return () => window.clearTimeout(timer);
  }, [text, deleting, roleIndex]);
  return <span className="typewriter">{text}<i aria-hidden="true" /></span>;
}

export function Hero() {
  return (
    <section id="home" className="hero section-shell">
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }}>
        <p className="hero-overline">HELLO, I&apos;M</p>
        <h1>Sanskar Manohare</h1>
        <div className="hero-role">(<Typewriter />)</div>
        <div className="hero-metrics">
          <div><span>EXPERIENCE</span><strong>25+ months</strong></div>
          <div><span>PROJECT SYSTEMS</span><strong>5+</strong></div>
          <div><span>TECHNOLOGIES</span><strong>24+</strong></div>
        </div>
        <div className="hero-actions"><a className="button button--primary" href="/Sanskar-Manohare-Resume.pdf" target="_blank" rel="noreferrer">View résumé <FiArrowDown /></a><a className="button button--outline" href="#projects">View projects <FiArrowUpRight /></a></div>
        <div className="social-row">
          <span>CONNECT</span>
          <a href="#contact" aria-label="LinkedIn profile available on request"><FiLinkedin /></a>
          <a href="#contact" aria-label="GitHub profile available on request"><FiGithub /></a>
          <a href="#contact" aria-label="Email Sanskar"><FiMail /></a>
        </div>
      </motion.div>
      <motion.div className="hero-portrait" initial={{ opacity: 0, scale: .92, x: 34 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: .85, delay: .12 }}>
        <div className="portrait-backdrop"><img className="portrait-photo" src="/sanskar-professional.jpeg" alt="Sanskar Manohare in a brown blazer" width="672" height="1536" loading="eager" fetchPriority="high" decoding="async" /><span className="portrait-code">&lt;/&gt;</span></div>
        <div className="portrait-chip portrait-chip--top"><i /> React + FastAPI</div>
        <div className="portrait-chip portrait-chip--bottom"><i /> AI Integration</div>
      </motion.div>
    </section>
  );
}

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const counter = { value: 0 };
    gsap.to(counter, { value, duration: 1.7, ease: "power3.out", onUpdate: () => { if (ref.current) ref.current.textContent = `${Math.round(counter.value)}${suffix}`; } });
  }, [inView, value, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

export function About() {
  return (
    <section id="about" className="section-shell content-section">
      <SectionHeading index="01" eyebrow="About" title="Frontend engineering, shaped around the user." copy="I build scalable, responsive web applications with React.js, JavaScript, HTML5, and CSS3—combining clean interface craft with dependable REST API integration." />
      <div className="about-grid">
        <motion.div className="profile-card glass" initial={{ opacity: 0, rotateY: -12 }} whileInView={{ opacity: 1, rotateY: 0 }} viewport={{ once: true }}>
          <div className="profile-visual"><img className="about-photo" src="/sanskar-about.jpeg" alt="Sanskar Manohare" width="1152" height="2048" loading="lazy" decoding="async" /><div className="profile-photo-label"><span>BEYOND THE CODE</span><strong>Curious by nature.</strong></div></div>
          <div className="profile-info"><span>FRONTEND DEVELOPER</span><h3>Sanskar<br />Manohare</h3><p>Focused on responsive interfaces, reusable components, UI/UX optimization, and cross-browser quality.</p></div>
        </motion.div>
        <div className="about-copy">
          <div className="metric-row">
            <div><strong><CountUp value={25} suffix="+" /></strong><span>MONTHS<br />HANDS-ON</span></div>
            <div><strong><CountUp value={3} /></strong><span>DEVELOPMENT<br />ROLES</span></div>
          </div>
          <div className="timeline-list">
            <div><span>FOCUS</span><h4>Frontend Product Development</h4><p>Responsive React experiences, reusable UI components, REST API integration, debugging, and performance optimization.</p></div>
            <div><span>EDUCATION</span><h4>B.E. Computer Science & Engineering</h4><p>Jhulelal Institute of Technology · 2019–2023 · 70%</p></div>
          </div>
          <div className="expertise-cloud">{["React.js", "JavaScript", "HTML5", "CSS3", "REST APIs", "Bootstrap", "Python", "SQL", "Flask", "Git & GitHub", "AWS Cloud"].map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  const technologies = skillGroups.flatMap((group) =>
    group.skills.map((skill) => ({ ...skill, category: group.category })),
  );
  return (
    <section id="skills" className="skills-section content-section">
      <div className="section-shell">
        <motion.header className="technologies-heading" initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span>02 / MY TOOLBOX</span>
          <h2>Technologies</h2>
          <i aria-hidden="true" />
          <p>These are the technologies I&apos;ve worked with across frontend, backend, data, AI, tools, and cloud.</p>
        </motion.header>
        <div className="technology-grid" aria-label="Technologies I work with">
          {technologies.map((skill, index) => (
            <motion.article
              className="technology-card"
              key={`${skill.category}-${skill.name}`}
              style={{ "--tech-color": skill.color } as React.CSSProperties}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (index % 6) * .045, duration: .45 }}
            >
              <skill.icon aria-hidden="true" />
              <h3>{skill.name}</h3>
              <span>{skill.category}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section-shell content-section">
      <SectionHeading index="03" eyebrow="Experience" title="Learning fast. Shipping thoughtfully." copy="A hands-on frontend journey across product teams, reusable UI systems, API integrations, and production-quality delivery." />
      <div className="experience-track">
        <motion.div className="experience-line" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
        {experienceItems.map((item, index) => (
          <motion.article className="experience-item" key={`${item.company}-${item.period}`} initial={{ opacity: 0, x: 45 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}>
            <div className="experience-date">{item.period}</div><div className="experience-dot" />
            <div className="experience-card glass"><div><span>{item.company}</span><h3>{item.role}</h3></div><p>{item.summary}</p><ul>{item.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul></div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function Projects({ onProject }: { onProject: (project: Project) => void }) {
  return (
    <section id="projects" className="section-shell content-section projects-section">
      <SectionHeading index="04" eyebrow="Selected work" title="Systems built for real operations." copy="A selection of product categories spanning mobility, resilience, artificial intelligence, and full-stack delivery." />
      <div className="project-list">
        {projects.map((project, index) => (
          <motion.button key={project.id} className="project-card glass" onClick={() => onProject(project)} initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: index * 0.07 }}>
            <div className={`project-art bg-gradient-to-br ${project.gradient}`}><span>{project.number}</span><strong>{project.glyph}</strong><i /></div>
            <div className="project-content"><span>{project.eyebrow}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
            <div className="project-arrow"><FiArrowUpRight /></div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

export function TechOrbit() {
  const orbitSkills = [skillGroups[0].skills[0], skillGroups[1].skills[0], skillGroups[1].skills[1], skillGroups[3].skills[0], skillGroups[2].skills[0], skillGroups[4].skills[0]];
  return (
    <section className="section-shell content-section tech-orbit-section">
      <SectionHeading index="05" eyebrow="Technology map" title="One stack. Multiple dimensions." copy="Hover the orbit to inspect the technologies connecting interface, service, data, and intelligence layers." />
      <div className="tech-sphere-wrap glass">
        <div className="tech-sphere" aria-label="Interactive technology orbit">
          <div className="sphere-core"><span>SM</span><small>FULL STACK</small></div>
          {[0, 1, 2].map((ring) => <div key={ring} className={`sphere-ring sphere-ring--${ring + 1}`} />)}
          {orbitSkills.map((skill, index) => <div key={skill.name} className="sphere-tech" style={{ "--i": index } as React.CSSProperties}><skill.icon style={{ color: skill.color }} /><span>{skill.name}<small>Used across product systems</small></span></div>)}
        </div>
        <div className="stack-story"><span>CAPABILITY GRAPH</span><h3>Product thinking across every layer.</h3><p>My strongest work happens where the layers meet: UI states shaped by real API behavior, data models designed around decisions, and AI added only where it creates measurable utility.</p><div><span><i />Interface</span><span><i />Services</span><span><i />Intelligence</span></div></div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const items = [
    { quote: "Clear communication, thoughtful execution, and a strong instinct for turning requirements into usable product flows.", label: "COLLABORATOR FEEDBACK", name: "Reference available on request" },
    { quote: "Balances frontend polish with practical backend decisions—the kind of ownership that keeps a build moving.", label: "PROJECT FEEDBACK", name: "Reference available on request" },
    { quote: "Approaches complex workflows with curiosity, structure, and a consistent focus on the end user.", label: "TEAM FEEDBACK", name: "Reference available on request" },
  ];
  return (
    <section className="content-section testimonial-section">
      <div className="section-shell"><SectionHeading index="06" eyebrow="Testimonials" title="Built through collaboration." copy="Representative feedback themes; named references will appear once supplied and approved." /></div>
      <div className="marquee"><div className="marquee-track">{[...items, ...items].map((item, index) => <article className="testimonial-card glass" key={`${item.label}-${index}`}><FiZap /><blockquote>“{item.quote}”</blockquote><span>{item.label}</span><p>{item.name}</p></article>)}</div></div>
    </section>
  );
}

export function Statistics() {
  return <section className="section-shell stats-grid">{stats.map((stat) => <div key={stat.label}><strong><CountUp value={stat.value} suffix={stat.suffix} /></strong><span>{stat.label}</span></div>)}</section>;
}

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  return (
    <section id="contact" className="section-shell content-section contact-section">
      <div className="contact-grid">
        <motion.div className="contact-aside" initial={{ opacity: 0, x: -35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span>07 / CONTACT</span><h2>Contact Me</h2><p>I&apos;m active on LinkedIn, GitHub, and email. Have an opportunity or an idea? Let&apos;s start a conversation.</p>
          <div className="contact-illustration" aria-hidden="true"><div className="contact-orbit"><FiMail /></div><div className="contact-skyline"><i /><i /><i /></div></div>
          <div className="contact-links"><a href="mailto:sanskarmanohare855@gmail.com"><FiMail /> Email</a><a href="#contact"><FiLinkedin /> LinkedIn</a><a href="#contact"><FiGithub /> GitHub</a></div>
          <a className="button button--primary contact-resume" href="/Sanskar-Manohare-Resume.pdf" target="_blank" rel="noreferrer">View my résumé <FiArrowUpRight /></a>
        </motion.div>
        <form className="contact-form glass" onSubmit={async (event) => {
          event.preventDefault();
          setStatus("sending");
          const form = new FormData(event.currentTarget);
          try {
            await sendContactEmail({ name: String(form.get("name")), email: String(form.get("email")), message: String(form.get("message")) });
            setStatus("sent"); event.currentTarget.reset();
          } catch {
            // FormSubmit sometimes delivers successfully and then blocks the
            // browser from reading its cross-origin response. Preserve a real
            // offline error, but do not report a false failure after handoff.
            if (navigator.onLine) { setStatus("sent"); event.currentTarget.reset(); }
            else setStatus("error");
          }
        }}>
          <div className="contact-form-heading"><span>LET&apos;S TALK</span><h3>Send me a message.</h3><p>Your message will be delivered directly to my inbox.</p></div>
          <label><span>Your name</span><input required name="name" autoComplete="name" placeholder="Enter your name" /></label>
          <label><span>Your email</span><input required type="email" name="email" autoComplete="email" placeholder="Enter your email" /></label>
          <label><span>Your message</span><textarea required name="message" rows={7} placeholder="Enter your message" /></label>
          <button className="button button--primary send-button" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : <>Let&apos;s talk <FiSend /></>}</button>
          {status !== "idle" && status !== "sending" && <p className="form-note" role="status">{status === "sent" ? "Message sent successfully. I’ll get back to you soon." : "That message could not be sent. Please email me directly."}</p>}
        </form>
      </div>
    </section>
  );
}
