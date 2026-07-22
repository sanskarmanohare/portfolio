import { motion } from "framer-motion";

export function SectionHeading({ index, eyebrow, title, copy }: { index: string; eyebrow: string; title: string; copy?: string }) {
  return (
    <motion.header
      className="section-heading"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
    >
      <div className="section-kicker"><span>{index}</span>{eyebrow}</div>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </motion.header>
  );
}
