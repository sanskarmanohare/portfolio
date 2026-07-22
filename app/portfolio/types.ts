import type { IconType } from "react-icons";

export type Skill = { name: string; icon: IconType; color: string };
export type SkillGroup = { category: string; accent: string; skills: Skill[] };

export type Project = {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  problem: string;
  solution: string;
  stack: string[];
  features: string[];
  gradient: string;
  glyph: string;
  architecture: string[];
};
