"use client";

import Lenis from "lenis";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowUp, FiMenu, FiX } from "react-icons/fi";
import { navItems } from "./data";
import type { Project } from "./types";
import { AmbientBackground, CursorGlow, ScrollProgress } from "./components/effects/AmbientEffects";
import { ProjectModal } from "./components/projects/ProjectModal";
import { About, Contact, Experience, Hero, Projects, Skills, Statistics, TechOrbit } from "./components/sections/Sections";

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <a className="logo" href="#home" aria-label="Sanskar Manohare, home">&lt; <span>Sanskar Manohare</span> /&gt;</a>
      <nav className="desktop-nav" aria-label="Main navigation">{navItems.map((item, index) => <a href={`#${item.toLowerCase()}`} key={item}><span>0{index + 1}</span>{item}</a>)}</nav>
      <div className="header-actions">
        <a className="header-cta" href="#contact">Let&apos;s talk <i /></a>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>{open ? <FiX /> : <FiMenu />}</button>
      </div>
      <AnimatePresence>{open && <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>{navItems.map((item, index) => <a href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} key={item}><span>0{index + 1}</span>{item}</a>)}</motion.nav>}</AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="section-shell footer">
      <div><a className="logo" href="#home">&lt; <span>Sanskar Manohare</span> /&gt;</a><p>Designed and engineered with curiosity, clarity, and a healthy obsession with detail.</p></div>
      <div><span>© {new Date().getFullYear()} Sanskar Manohare</span><a href="#home">Back to top <FiArrowUp /></a></div>
    </footer>
  );
}

export function Portfolio() {
  const [project, setProject] = useState<Project | null>(null);
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.88 });
    let raf = 0;
    const frame = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(frame); };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  return (
    <main>
      <ScrollProgress /><CursorGlow /><AmbientBackground />
      <Header />
      <Hero /><About /><Skills /><Experience /><Projects onProject={setProject} /><TechOrbit /><Statistics /><Contact /><Footer />
      <ProjectModal project={project} onClose={() => setProject(null)} />
    </main>
  );
}
