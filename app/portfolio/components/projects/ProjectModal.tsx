"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiGithub, FiX } from "react-icons/fi";
import type { Project } from "../../types";

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <Dialog.Root open={Boolean(project)} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {project && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            </Dialog.Overlay>
            <Dialog.Content asChild aria-describedby={`project-${project.id}-description`}>
              <motion.article
                className="project-modal glass"
                initial={{ opacity: 0, scale: 0.94, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
                transition={{ type: "spring", damping: 26, stiffness: 260 }}
              >
                <div className={`modal-visual bg-gradient-to-br ${project.gradient}`}>
                  <span>{project.number}</span><strong>{project.glyph}</strong>
                  <div className="modal-scan" />
                </div>
                <div className="modal-body">
                  <div className="modal-topline"><span>{project.eyebrow}</span><Dialog.Close className="icon-button" aria-label="Close project"><FiX /></Dialog.Close></div>
                  <Dialog.Title>{project.title}</Dialog.Title>
                  <Dialog.Description id={`project-${project.id}-description`}>{project.description}</Dialog.Description>
                  <div className="modal-columns">
                    <div><small>THE PROBLEM</small><p>{project.problem}</p></div>
                    <div><small>THE SOLUTION</small><p>{project.solution}</p></div>
                  </div>
                  <div className="architecture" aria-label="Project architecture">
                    {project.architecture.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</div>)}
                  </div>
                  <div className="modal-columns">
                    <div><small>TECH STACK</small><div className="tag-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
                    <div><small>FEATURES</small><ul>{project.features.map((item) => <li key={item}>{item}</li>)}</ul></div>
                  </div>
                  <div className="modal-actions" aria-label="Project links unavailable until supplied">
                    <span className="button button--outline is-disabled"><FiGithub /> Repository on request</span>
                    <span className="button button--primary is-disabled">Demo on request <FiArrowUpRight /></span>
                  </div>
                </div>
              </motion.article>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
