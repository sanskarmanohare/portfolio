"use client";

import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { FiArrowDown, FiArrowUpRight, FiCode, FiGithub, FiLinkedin, FiMail, FiSend, FiZap } from "react-icons/fi";
import { projects, roles, skillGroups, stats } from "../../data";
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
          <div><span>EXPERIENCE</span><strong>19+ months</strong></div>
          <div><span>PROJECT SYSTEMS</span><strong>5+</strong></div>
          <div><span>TECHNOLOGIES</span><strong>24+</strong></div>
        </div>
        <div className="hero-actions"><a className="button button--primary" href="#contact">Résumé on request <FiArrowDown /></a><a className="button button--outline" href="#projects">View projects <FiArrowUpRight /></a></div>
        <div className="social-row">
          <span>CONNECT</span>
          <a href="#contact" aria-label="LinkedIn profile available on request"><FiLinkedin /></a>
          <a href="#contact" aria-label="GitHub profile available on request"><FiGithub /></a>
          <a href="#contact" aria-label="Email Sanskar"><FiMail /></a>
        </div>
      </motion.div>
      <motion.div className="hero-portrait" initial={{ opacity: 0, scale: .92, x: 34 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: .85, delay: .12 }} aria-label="Portrait placeholder for Sanskar Manohare">
        <div className="portrait-backdrop"><span className="portrait-code">&lt;/&gt;</span><div className="portrait-initials">SM</div><div className="portrait-orbit portrait-orbit--one" /><div className="portrait-orbit portrait-orbit--two" /></div>
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
      <SectionHeading index="01" eyebrow="About" title="Engineering with intent." copy="I work across the product stack, pairing interface craft with robust backend thinking to create software that feels clear, fast, and genuinely useful." />
      <div className="about-grid">
        <motion.div className="profile-card glass" initial={{ opacity: 0, rotateY: -12 }} whileInView={{ opacity: 1, rotateY: 0 }} viewport={{ once: true }}>
          <div className="profile-visual"><div className="monogram">SM</div><div className="orbit-ring" /></div>
          <div className="profile-info"><span>FULL STACK DEVELOPER</span><h3>Sanskar<br />Manohare</h3><p>Building at the intersection of product design, web engineering, and applied AI.</p></div>
        </motion.div>
        <div className="about-copy">
          <div className="metric-row">
            <div><strong><CountUp value={19} suffix="+" /></strong><span>MONTHS<br />EXPERIENCE</span></div>
            <div><strong><CountUp value={5} suffix="+" /></strong><span>PRODUCT<br />SYSTEMS</span></div>
          </div>
          <div className="timeline-list">
            <div><span>NOW</span><h4>Full Stack & AI</h4><p>React experiences, FastAPI services, Python automation, and intelligent product integrations.</p></div>
            <div><span>FOUNDATION</span><h4>Interface Engineering</h4><p>Responsive design systems, reusable components, REST APIs, SQL-backed applications, and Git workflows.</p></div>
          </div>
          <div className="expertise-cloud">{["React", "FastAPI", "Python", "SQL", "AI Integration", "REST APIs", "Responsive Design"].map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  const [active, setActive] = useState(0);
  const group = skillGroups[active];
  return (
    <section id="skills" className="section-shell content-section skills-section">
      <SectionHeading index="02" eyebrow="Skills universe" title="A connected technology orbit." copy="Explore the systems I use to move from product idea to polished, production-ready experience." />
      <div className="skill-console glass">
        <div className="skill-tabs" role="tablist" aria-label="Skill categories">
          {skillGroups.map((item, index) => <button key={item.category} role="tab" aria-selected={active === index} onClick={() => setActive(index)}><span>0{index + 1}</span>{item.category}</button>)}
        </div>
        <div className="skill-galaxy" style={{ "--skill-accent": group.accent } as React.CSSProperties}>
          <div className="galaxy-core"><FiCode /><span>{group.category}</span></div>
          <div className="orbit orbit--1" /><div className="orbit orbit--2" />
          {group.skills.map((skill, index) => {
            const angle = (360 / group.skills.length) * index - 90;
            return <motion.button key={skill.name} className="skill-planet" style={{ "--angle": `${angle}deg`, "--planet-color": skill.color } as React.CSSProperties} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.06 }} title={skill.name}><skill.icon /><span>{skill.name}</span></motion.button>;
          })}
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="section-shell content-section">
      <SectionHeading index="03" eyebrow="Experience" title="From interface to infrastructure." copy="A growth path centered on shipping complete products—not isolated layers." />
      <div className="experience-track">
        <motion.div className="experience-line" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
        <motion.article className="experience-item" initial={{ opacity: 0, x: 45 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="experience-date">19+ MONTHS</div><div className="experience-dot" />
          <div className="experience-card glass"><div><span>FULL STACK DEVELOPMENT</span><h3>Product-focused engineer</h3></div><p>Building responsive React interfaces and reliable FastAPI/Python services, integrating REST APIs, SQL data, and AI capabilities into cohesive user experiences.</p><ul><li>Designed reusable, responsive frontend systems</li><li>Developed Python APIs and backend workflows</li><li>Connected products with AI and external services</li></ul></div>
        </motion.article>
        <motion.article className="experience-item" initial={{ opacity: 0, x: 45 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="experience-date">CORE PRACTICE</div><div className="experience-dot" />
          <div className="experience-card glass"><div><span>CONTINUOUS DELIVERY</span><h3>Systems, quality & craft</h3></div><p>Turning requirements into maintainable components, documented API contracts, and experiences tested across screen sizes.</p><ul><li>Git and GitHub collaboration</li><li>Postman-driven API verification</li><li>Performance-minded implementation</li></ul></div>
        </motion.article>
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
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "setup" | "error">("idle");
  return (
    <section id="contact" className="section-shell content-section contact-section">
      <SectionHeading index="07" eyebrow="Contact" title="Let’s build the next useful thing." copy="Have a product idea, frontend challenge, API build, or AI workflow in mind? Send the brief and let’s make it tangible." />
      <div className="contact-grid">
        <div className="contact-aside"><span>START A CONVERSATION</span><h3>Good products begin with a clear problem.</h3><p>The form opens your email app with the project brief ready to send. Add the preferred email address in the content file when available.</p><div className="contact-signal"><i /><span>Current status<strong>Available for select projects</strong></span></div></div>
        <form className="contact-form glass" onSubmit={async (event) => {
          event.preventDefault();
          setStatus("sending");
          const form = new FormData(event.currentTarget);
          try {
            const result = await sendContactEmail({ name: String(form.get("name")), email: String(form.get("email")), project: String(form.get("project")), message: String(form.get("message")) });
            setStatus(result.configured ? "sent" : "setup");
            if (result.configured) event.currentTarget.reset();
          } catch { setStatus("error"); }
        }}>
          <div className="field-row"><label><span>Your name</span><input required name="name" placeholder="How should I address you?" /></label><label><span>Email</span><input required type="email" name="email" placeholder="you@company.com" /></label></div>
          <label><span>Project type</span><select name="project"><option>Full-stack product</option><option>React frontend</option><option>FastAPI / Python backend</option><option>AI integration</option><option>Something else</option></select></label>
          <label><span>Tell me about it</span><textarea required name="message" rows={5} placeholder="The problem, desired outcome, and ideal timeline…" /></label>
          <button className="button button--primary send-button" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : <>Send project brief <FiSend /></>}</button>
          {status !== "idle" && status !== "sending" && <p className="form-note" role="status">{status === "sent" ? "Message sent. I’ll get back to you soon." : status === "setup" ? "The form is ready—add the EmailJS values in .env to enable delivery." : "That message could not be sent. Please try again."}</p>}
        </form>
      </div>
    </section>
  );
}
