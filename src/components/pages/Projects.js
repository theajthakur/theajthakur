"use client";

import { useState } from "react";
import ProjectCard from "./_components/ProjectCard";
import ProjectSearch from "./_components/ProjectSearch";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsGrid() {
  const [searchQuery, setSearchQuery] = useState("");

  const projects = [
    {
      name: "Oppskills",
      category: "Full-Stack Discovery Platform",
      link: "https://github.com/theajthakur",
      description:
        "A full-stack opportunity discovery platform built using Next.js, NestJS, PostgreSQL, and Redis, serving 10,000+ users. It features an analytics aggregation system, authentication systems, and streamlined user discovery for events and hackathons.",
      thumbnail: ["oppskills.png"],
      tags: ["Next.js", "NestJS", "PostgreSQL", "Redis", "TypeScript", "LLMs", "RAG"],
    },
    {
      name: "Ponion",
      category: "Multi-Tenant Food SaaS",
      link: "https://github.com/theajthakur",
      description:
        "A multi-tenant food discovery and ordering platform inspired by modern restaurant marketplaces. It features a customer-facing app for menu browsing and order placement, a dedicated restaurant management portal, and a Super Admin dashboard for onboarding, verification, and platform-wide management.",
      thumbnail: ["ponion.png"],
      tags: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS", "API Development"],
    },
    {
      name: "Rotaract Club Website",
      category: "Official Club Portal",
      link: "https://github.com/theajthakur",
      description:
        "Official website for the Rotaract Club of Galgotias Educational Institutions, supporting the organization's digital initiatives, registrations, and event promotions.",
      thumbnail: ["rotaract.png"],
      tags: ["Web Development", "React", "SEO", "Maintenance"],
    },
  ];

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="w-full">
      <ProjectSearch value={searchQuery} onChange={setSearchQuery} />

      <div className="flex flex-col gap-8 md:gap-12">
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((e, index) => (
              <ProjectCard key={e.name} project={e} index={index} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center py-20 text-muted-foreground"
            >
              <p className="text-lg">
                No projects found matching "{searchQuery}"
              </p>
              <p className="text-sm">Try adjusting your search terms</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
