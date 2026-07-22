import type { Metadata } from "next";
import { Portfolio } from "./portfolio/Portfolio";

export const metadata: Metadata = {
  title: "Sanskar Manohare — Full Stack Developer",
  description:
    "Full stack developer crafting responsive React interfaces, high-performance FastAPI systems, and AI-integrated products.",
};

export default function Home() {
  return <Portfolio />;
}
