"use client";

import { useState, useEffect } from "react";
import ProjectCard from "./_components/ProjectCard";
import ProjectSearch from "./_components/ProjectSearch";
import SearchModal from "./_components/SearchModal";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isInput =
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA" ||
        document.activeElement.isContentEditable;

      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" && !isInput)
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const projects = [
    {
      name: "Oppskills",
      category: "Full-Stack Discovery Platform",
      link: "https://oppskills.com",
      description:
        "A full-stack opportunity discovery platform built using Next.js, NestJS, PostgreSQL, and Redis, serving 10,000+ users. It features an analytics aggregation system, authentication systems, and streamlined user discovery for events and hackathons.",
      thumbnail: ["oppskills.png"],
      tags: ["Next.js", "NestJS", "PostgreSQL", "Redis", "TypeScript", "LLMs", "RAG"],
    },
    {
      name: "Snake & Ladder Multiplayer",
      category: "Real-Time Multiplayer Game",
      link: "https://snake-ladder-rouge.vercel.app",
      description:
        "A modern web-based multiplayer implementation of the classic Snake & Ladder game featuring server-authoritative gameplay for complete fairness. Built with real-time API polling, backend-managed game instances, secure turn validation, lobby creation, room sharing, and synchronized gameplay. Designed with a scalable architecture that can seamlessly transition to WebSockets for lower latency and future features like in-game chat and voice communication.",
      thumbnail: ["snake-ladder.png"],
      tags: [
        "Next.js",
        "FastAPI",
        "Python",
        "Tailwind CSS",
        "REST API",
        "Real-Time Multiplayer",
        "Game Logic"
      ],
    },
    {
      name: "URL Shortener",
      category: "URL Shortener & Windows XP Parody",
      link: "https://shortener-xp.vercel.app",
      description:
        "A nostalgic Windows XP-inspired web experience featuring a humorous GTA-themed parody interface with an integrated high-performance URL shortener. The backend is built independently using FastAPI with PostgreSQL and Redis for efficient URL resolution, caching, analytics, and scalable request handling. Deployed on Google Cloud App Engine with a production-ready architecture separating frontend and backend services.",
      thumbnail: ["url-shortener.png"],
      tags: [
        "Next.js",
        "FastAPI",
        "Python",
        "PostgreSQL",
        "Redis",
        "Google Cloud",
        "App Engine",
        "Tailwind CSS"
      ],
    },
    {
      name: "Ponion",
      category: "Multi-Tenant Food SaaS",
      link: "https://ponion.vercel.app",
      description:
        "A multi-tenant food discovery and ordering platform inspired by modern restaurant marketplaces. It features a customer-facing app for menu browsing and order placement, a dedicated restaurant management portal, and a Super Admin dashboard for onboarding, verification, and platform-wide management.",
      thumbnail: ["ponion.png"],
      tags: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS", "API Development"],
    },
    {
      name: "Rotaract Club Website",
      category: "Official Club Portal",
      link: "https://rotaractgalgotias.org",
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
      <ProjectSearch
        value={searchQuery}
        onChange={setSearchQuery}
        onOpenModal={() => setIsSearchOpen(true)}
      />

      <div className="flex flex-col gap-6 md:gap-8">
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

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        projects={projects}
      />
    </div>
  );
}
