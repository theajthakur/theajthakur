"use client";

import { useState } from "react";
import ProjectCard from "./_components/ProjectCard";
import ProjectSearch from "./_components/ProjectSearch";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsGrid() {
  const [searchQuery, setSearchQuery] = useState("");

  const projects = [
    {
      name: "Market Gang",
      link: "https://viraldon.vercel.app/",
      description:
        "A modern marketing platform that helps brands analyse trends, reach target audiences, and optimise campaign performance through data-driven insights.",
      thumbnail: ["marketgang.png"],
      tags: ["Next.js", "Analytics", "Marketing", "SaaS"],
    },
    {
      name: "SkillSwap",
      link: "https://skillswapgcet.vercel.app/",
      description:
        "A peer-to-peer skill-exchange platform that matches users based on their profiles, skillsets, and requirements, enabling them to learn directly from each other.",
      thumbnail: ["skillswap.png"],
      tags: ["React", "Education", "Social Network", "P2P"],
    },
    {
      name: "Sewna",
      link: "https://sewna-chi.vercel.app/",
      description:
        "A collaborative hub connecting designers with clients, offering personalised design services, portfolio showcases, and seamless designer-client project interaction.",
      thumbnail: ["sewna_main.png", "sewna_1.png", "sewna_2.png"],
      tags: ["Design", "Marketplace", "Freelance", "Collaboration"],
    },
    {
      name: "AgroVision",
      link: "https://agrovision-psi.vercel.app/",
      description:
        "A smart agriculture solution designed for an SIH problem statement from the Odisha government, predicting crop yields and optimising production using environmental and historical data.",
      thumbnail: ["agrovision.png"],
      tags: ["AI/ML", "Agriculture", "GovTech", "Prediction"],
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
