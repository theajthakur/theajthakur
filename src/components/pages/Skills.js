"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ReactFlow,
  Background,
  Controls,
  Position,
  Handle,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import {
  React as ReactIcon,
  NextJs,
  TailwindCSS,
  JavaScript,
  TypeScript,
  Python,
  CPlusPlus,
  NodeJs,
  NestJS,
  ExpressJsDark,
  FastAPI,
  Django,
  PostgreSQL,
  MongoDB,
  Redis,
  Git,
  Docker,
  AWS,
  GoogleCloud,
  OpenAI,
  Linux,
} from "developer-icons";

// Custom SVG Illustrations for missing skills (minimalist 2D design)
const SeoIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const VectorDbIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="3" x2="12" y2="21" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="6" cy="6" r="1" fill="currentColor" />
    <circle cx="18" cy="18" r="1" fill="currentColor" />
    <circle cx="6" cy="18" r="1" fill="currentColor" />
    <circle cx="18" cy="6" r="1" fill="currentColor" />
  </svg>
);

const N8nIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="3" />
    <circle cx="5" cy="5" r="2.5" />
    <circle cx="19" cy="5" r="2.5" />
    <circle cx="5" cy="19" r="2.5" />
    <circle cx="19" cy="19" r="2.5" />
    <line x1="7" y1="7" x2="10" y2="10" />
    <line x1="17" y1="7" x2="14" y2="10" />
    <line x1="7" y1="17" x2="10" y2="14" />
    <line x1="17" y1="17" x2="14" y2="14" />
  </svg>
);

const LangchainIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 17H7A5 5 0 0 1 7 7h2" />
    <path d="M15 7h2a5 5 0 0 1 0 10h-2" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
  </svg>
);

const LanggraphIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="6" cy="18" r="2" />
    <circle cx="18" cy="18" r="2" />
    <circle cx="12" cy="6" r="2" />
    <line x1="12" y1="8" x2="6" y2="16" />
    <line x1="12" y1="8" x2="18" y2="16" />
    <line x1="8" y1="18" x2="16" y2="18" />
  </svg>
);

const RagIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 6h16M4 10h16M4 14h12" />
    <path d="M21 15a2 2 0 0 0-2-2H15a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2z" />
    <path d="M9 18H4" />
    <path d="M13 18l-3-3 3-3" />
  </svg>
);

const VertexAiIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="12,2 22,22 2,22" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
    <line x1="12" y1="2" x2="12" y2="12" />
    <line x1="2" y1="22" x2="12" y2="12" />
    <line x1="22" y1="22" x2="12" y2="12" />
  </svg>
);

const VectorEmbeddingsIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 3v18h18" />
    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
    <circle cx="18.7" cy="8" r="1.5" fill="currentColor" />
    <circle cx="13.6" cy="13.2" r="1.5" fill="currentColor" />
    <circle cx="10.8" cy="10.5" r="1.5" fill="currentColor" />
    <circle cx="7" cy="14.3" r="1.5" fill="currentColor" />
  </svg>
);

const levelText = {
  1: "Familiar",
  2: "Intermediate",
  3: "Advanced",
  4: "Expert",
};

const levelClasses = {
  1: "bg-card/30 border-border/40 hover:bg-card/45 hover:border-primary/50 hover:bg-primary/5",
  2: "bg-card/45 border-border/70 hover:bg-card/60 hover:border-primary/60 hover:bg-primary/10",
  3: "bg-card/60 border-primary/25 hover:bg-card/75 hover:border-primary/70 hover:bg-primary/15 shadow-[0_0_8px_rgba(0,139,155,0.03)]",
  4: "bg-card/75 border-primary/50 hover:bg-card/90 hover:border-primary/85 hover:bg-primary/20 shadow-[0_0_12px_rgba(0,139,155,0.06)]",
};

// ----------------------------------------------------
// React Flow Custom Node Components
// ----------------------------------------------------

const HubNode = () => (
  <div className="flex items-center justify-center w-28 h-28 rounded-full border-2 border-primary bg-card/90 backdrop-blur-md shadow-[0_0_25px_rgba(0,139,155,0.35)] relative group animate-pulse">
    <Handle
      type="source"
      position={Position.Bottom}
      style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: 0, pointerEvents: "none" }}
    />
    <div className="text-center font-heading text-sm font-bold text-primary tracking-wider leading-tight">
      MY<br />SKILLS
    </div>
  </div>
);

const CategoryNode = ({ data }) => {
  const isHighlighted = data.isHighlighted;
  const isDimmed = data.isDimmed;
  return (
    <div
      className={`px-5 py-2.5 rounded-full border transition-all duration-300 font-heading text-xs font-semibold whitespace-nowrap shadow-md select-none ${
        isHighlighted
          ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(0,139,155,0.3)] scale-105"
          : isDimmed
          ? "bg-card/10 border-border/20 text-muted-foreground/30 opacity-40"
          : "bg-card/85 border-primary/20 text-primary hover:border-primary/50 hover:bg-primary/5"
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: 0, pointerEvents: "none" }}
        id="t"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: 0, pointerEvents: "none" }}
        id="s"
      />
      {data.label}
    </div>
  );
};

const SkillNode = ({ data }) => {
  const Icon = data.icon;
  const isHighlighted = data.isHighlighted;
  const isDimmed = data.isDimmed;
  const levelClass = levelClasses[data.level];

  return (
    <div
      className={`relative transition-all duration-300 cursor-pointer ${
        isHighlighted ? "scale-110 z-30" : isDimmed ? "opacity-30 scale-95" : "hover:scale-105"
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: 0, pointerEvents: "none" }}
      />
      <div
        className={`flex items-center justify-center w-12 h-12 border rounded-xl rotate-45 transition-all duration-300 ${
          isHighlighted
            ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(0,139,155,0.25)]"
            : "bg-card/75 backdrop-blur-sm text-muted-foreground " + levelClass
        }`}
      >
        <div className="-rotate-45 flex items-center justify-center">
          <Icon className="w-5.5 h-5.5 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// Graph generator helper
// ----------------------------------------------------

const generateGraph = (skills, activeFilter, hoveredSkillName, hoveredCategoryName) => {
  const nodes = [];
  const edges = [];

  // 1. Hub Node placed at center
  nodes.push({
    id: "hub",
    type: "hub",
    position: { x: -56, y: -56 }, // Offset half of node dimensions (112x112)
    data: { label: "My Skills" },
  });

  const categories = ["Languages", "Frontend", "Backend", "Databases", "DevOps", "AI & Automation"];

  // Compute active category based on activeFilter, hovered node, or hovered category
  let activeCategory = activeFilter !== "All" ? activeFilter : null;
  if (hoveredSkillName) {
    const hoveredSkill = skills.find((s) => s.name === hoveredSkillName);
    if (hoveredSkill) {
      activeCategory = hoveredSkill.category;
    }
  } else if (hoveredCategoryName) {
    activeCategory = hoveredCategoryName;
  }

  // 2. Category Nodes & Edges
  categories.forEach((cat, idx) => {
    // Distribute categories in a circle centered at (0, 0)
    // Offset by -Math.PI / 2 to start the first category at the top
    const theta = (idx * 2 * Math.PI) / categories.length - Math.PI / 2;
    const Rc = 250; // Radius for category circle
    const catX = Rc * Math.cos(theta);
    const catY = Rc * Math.sin(theta);
    const catId = `cat-${cat}`;

    const isHighlighted = activeCategory === cat;
    const isDimmed = activeCategory !== null && activeCategory !== cat;

    nodes.push({
      id: catId,
      type: "category",
      position: { x: catX - 80, y: catY - 20 }, // Offset half of dimensions (approx 160x40)
      data: {
        label: cat,
        isHighlighted,
        isDimmed,
      },
    });

    // Edge from Hub to Category
    const edgeId = `hub-to-${catId}`;
    edges.push({
      id: edgeId,
      source: "hub",
      target: catId,
      animated: isHighlighted,
      type: "smoothstep",
      style: isHighlighted
        ? { stroke: "var(--color-primary)", strokeWidth: 3.5, opacity: 1 }
        : isDimmed
        ? { stroke: "var(--border)", strokeWidth: 1.5, opacity: 0.15 }
        : { stroke: "var(--color-primary)", strokeWidth: 2, opacity: 0.5 },
    });

    // 3. Child Skill Nodes & Edges
    const catSkills = skills.filter((s) => s.category === cat);
    const M = catSkills.length;

    // Distribute child skills in an outward arc centered at theta (outward projection)
    const span = Math.min(110, (M - 1) * 22) * (Math.PI / 180);
    const startAngle = theta - span / 2;
    const angleStep = M > 1 ? span / (M - 1) : 0;
    const Rs = 160; // Distance of skills from their parent category node

    catSkills.forEach((skill, childIdx) => {
      const childAngle = startAngle + childIdx * angleStep;
      const skillX = catX + Rs * Math.cos(childAngle);
      const skillY = catY + Rs * Math.sin(childAngle);
      const skillId = `skill-${skill.name}`;

      const isSkillHighlighted = activeCategory === cat || hoveredSkillName === skill.name;
      const isSkillDimmed = activeCategory !== null && activeCategory !== cat;

      nodes.push({
        id: skillId,
        type: "skill",
        position: { x: skillX - 24, y: skillY - 24 }, // Offset half of dimensions (48x48)
        data: {
          name: skill.name,
          icon: skill.icon,
          level: skill.level,
          category: skill.category,
          description: skill.description,
          isHighlighted: isSkillHighlighted,
          isDimmed: isSkillDimmed,
        },
      });

      // Edge from Category to Skill
      const skillEdgeId = `${catId}-to-${skillId}`;
      const isEdgeAnimated = hoveredSkillName === skill.name || (activeCategory === cat && !hoveredSkillName);
      edges.push({
        id: skillEdgeId,
        source: catId,
        target: skillId,
        animated: isEdgeAnimated,
        style: isSkillHighlighted
          ? { stroke: "var(--color-primary)", strokeWidth: 2.5, opacity: 0.9 }
          : isSkillDimmed
          ? { stroke: "var(--border)", strokeWidth: 1, opacity: 0.1 }
          : { stroke: "var(--color-primary)", strokeWidth: 1.5, opacity: 0.3, strokeDasharray: "4 4" },
      });
    });
  });

  return { nodes, edges };
};

// ----------------------------------------------------
// Main Skills Component
// ----------------------------------------------------

export default function Skills({ type = "long" }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Graph states
  const [viewMode, setViewMode] = useState("graph");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoveredSkillName, setHoveredSkillName] = useState(null);
  const [hoveredCategoryName, setHoveredCategoryName] = useState(null);

  const reactFlowWrapper = useRef(null);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const skills = [
    { name: "JavaScript", icon: JavaScript, level: 4, category: "Languages", description: "Core programming language for modern web development." },
    { name: "TypeScript", icon: TypeScript, level: 4, category: "Languages", description: "Strongly-typed superset of Javascript that scales codebases." },
    { name: "Python", icon: Python, level: 3, category: "Languages", description: "High-level language for backend services, scripting, and machine learning." },
    { name: "C++", icon: CPlusPlus, level: 2, category: "Languages", description: "Low-level system programming language for performance-critical tasks." },
    { name: "Next.js", icon: NextJs, level: 4, category: "Frontend", description: "Production React framework supporting server rendering and hybrid static/dynamic apps." },
    { name: "React", icon: ReactIcon, level: 4, category: "Frontend", description: "Declarative component-based frontend library for complex web interfaces." },
    { name: "Tailwind CSS", icon: TailwindCSS, level: 4, category: "Frontend", description: "Utility-first CSS framework for writing rapid custom styles." },
    { name: "SEO", icon: SeoIcon, level: 2, category: "Frontend", description: "Search Engine Optimization techniques for boosting page rank and discoverability." },
    { name: "Node.js", icon: NodeJs, level: 4, category: "Backend", description: "Asynchronous JavaScript server runtime built on Chrome's V8 engine." },
    { name: "NestJS", icon: NestJS, level: 3, category: "Backend", description: "Structured backend framework for building modular, enterprise Node.js apps." },
    { name: "Express.js", icon: ExpressJsDark, level: 4, category: "Backend", description: "Minimalist, unopinionated routing web framework for Node.js API development." },
    { name: "FastAPI", icon: FastAPI, level: 3, category: "Backend", description: "Extremely fast, modern Python framework for REST APIs based on type hints." },
    { name: "Django", icon: Django, level: 2, category: "Backend", description: "High-level Python web framework emphasizing security and database scalability." },
    { name: "PostgreSQL", icon: PostgreSQL, level: 4, category: "Databases", description: "Highly reliable, feature-rich relational SQL database system." },
    { name: "MongoDB", icon: MongoDB, level: 3, category: "Databases", description: "Scalable document-oriented NoSQL database for flexible JSON schemas." },
    { name: "Redis", icon: Redis, level: 3, category: "Databases", description: "Ultra-fast in-memory data store for caching and session state pipelines." },
    { name: "Vector Databases", icon: VectorDbIcon, level: 3, category: "Databases", description: "High-dimensional database for indexing and querying AI vector embeddings." },
    { name: "Docker", icon: Docker, level: 3, category: "DevOps", description: "Containerization platform to build, ship, and deploy programs consistently." },
    { name: "Git / GitHub", icon: Git, level: 4, category: "DevOps", description: "Version control system and cloud platform for team source collaboration." },
    { name: "AWS", icon: AWS, level: 2, category: "DevOps", description: "Amazon Web Services including EC2, S3, RDS, and serverless architectures." },
    { name: "GCP", icon: GoogleCloud, level: 2, category: "DevOps", description: "Google Cloud Platform products for hosting and computing scaling solutions." },
    { name: "Linux / SSH", icon: Linux, level: 3, category: "DevOps", description: "Server administration, terminal scripting, and secure terminal connection." },
    { name: "n8n", icon: N8nIcon, level: 2, category: "AI & Automation", description: "Fair-code node-based workflow automation tool for connecting API systems." },
    { name: "LangChain", icon: LangchainIcon, level: 2, category: "AI & Automation", description: "Integration framework for chaining large language models with custom inputs." },
    { name: "LangGraph", icon: LanggraphIcon, level: 2, category: "AI & Automation", description: "Multi-agent systems framework for cyclical and stateful agent flows." },
    { name: "RAG", icon: RagIcon, level: 3, category: "AI & Automation", description: "Retrieval-Augmented Generation for grounding LLMs with database sources." },
    { name: "OpenAI", icon: OpenAI, level: 3, category: "AI & Automation", description: "Orchestration of GPT model structures, functional calls, and prompt workflows." },
    { name: "Vertex AI", icon: VertexAiIcon, level: 2, category: "AI & Automation", description: "Google Cloud's ML ecosystem for training, tuning, and deploying AI models." },
    { name: "Vector Embeddings", icon: VectorEmbeddingsIcon, level: 3, category: "AI & Automation", description: "Numerical representations of semantic text definitions for similarity search." },
  ];

  const categories = ["All", "Languages", "Frontend", "Backend", "Databases", "DevOps", "AI & Automation"];

  const filteredSkills = activeFilter === "All"
    ? skills
    : skills.filter((s) => s.category === activeFilter);

  // Mobile limit is 8 items by default unless viewMore is toggled
  const mobileLimit = 8;
  const displayedSkills = isMobile && !showAll
    ? filteredSkills.slice(0, mobileLimit)
    : filteredSkills;

  // React Flow hooks for managing node and edge states
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Generate nodes and edges when activeFilter, hovered node name, or hovered category name change
  useEffect(() => {
    if (mounted) {
      const { nodes: newNodes, edges: newEdges } = generateGraph(
        skills,
        activeFilter,
        hoveredSkillName,
        hoveredCategoryName
      );
      setNodes(newNodes);
      setEdges(newEdges);
    }
  }, [activeFilter, hoveredSkillName, hoveredCategoryName, mounted]);

  const nodeTypes = useMemo(() => ({
    hub: HubNode,
    category: CategoryNode,
    skill: SkillNode,
  }), []);

  // Handle hover interactions
  const onNodeMouseEnter = (event, node) => {
    if (!reactFlowWrapper.current) return;
    const rect = reactFlowWrapper.current.getBoundingClientRect();
    const rawX = event.clientX - rect.left;
    const rawY = event.clientY - rect.top;
    const tooltipWidth = 224; // w-56
    const tooltipHeight = 160; // Approx max tooltip height with padding

    // Clamp X so the tooltip stays completely within the wrapper boundaries
    const clampedX = Math.max(tooltipWidth / 2 + 12, Math.min(rect.width - (tooltipWidth / 2 + 12), rawX));
    // Determine whether to display the tooltip below the node if it is too close to the top
    const showBelow = rawY < tooltipHeight + 15;

    if (node.type === "skill") {
      setHoveredSkill({
        name: node.data.name,
        level: node.data.level,
        description: node.data.description,
        x: clampedX,
        y: rawY,
        showBelow,
      });
      setHoveredSkillName(node.data.name);
    } else if (node.type === "category") {
      const categoryDescriptions = {
        Languages: "Languages I use to build clean, typed, and performant codebases.",
        Frontend: "Frameworks and styling systems for crafting responsive user interfaces.",
        Backend: "Server runtimes, APIs, and frameworks powering background services.",
        Databases: "Engines for caching, relational querying, and vector semantic storage.",
        DevOps: "Platforms for containerization, hosting infrastructure, and deployment CI/CD.",
        "AI & Automation": "Large Language Model chains, vector embeddings, and autonomous agent frameworks.",
      };

      setHoveredSkill({
        name: node.data.label,
        level: null,
        description: categoryDescriptions[node.data.label] || "",
        x: clampedX,
        y: rawY,
        showBelow,
      });
      setHoveredCategoryName(node.data.label);
    }
  };

  const onNodeMouseLeave = () => {
    setHoveredSkill(null);
    setHoveredSkillName(null);
    setHoveredCategoryName(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
      },
    },
  };

  // Render original Grid Layout
  const renderGridView = () => {
    return (
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto w-full px-4 mb-16">
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap gap-7 sm:gap-9 md:gap-10 justify-center items-center w-full bg-card/15 border border-border/55 p-8 sm:p-10 rounded-2xl backdrop-blur-xs"
        >
          <AnimatePresence mode="popLayout">
            {displayedSkills.map((a) => {
              const Icon = a.icon;
              const levelClass = levelClasses[a.level];
              const isHovered = hoveredSkill?.name === a.name;

              return (
                <motion.div
                  layout
                  key={a.name}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="relative py-2"
                  onMouseEnter={() => setHoveredSkill({ name: a.name, level: a.level, description: a.description })}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border rounded-full transition-all duration-300 group cursor-pointer text-muted-foreground hover:text-primary ${levelClass} ${
                      isHovered ? "scale-105 shadow-[0_0_15px_rgba(0,139,155,0.2)] z-20" : "z-10"
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <Icon className="w-5.5 h-5.5 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-transform duration-300 group-hover:scale-105" />
                    </div>
                  </div>

                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-50 w-48 sm:w-56 p-3 bg-card/95 border border-border backdrop-blur-md rounded-xl shadow-xl pointer-events-none text-center"
                      >
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2.5 h-2.5 bg-card border-r border-b border-border rotate-45" />
                        <h4 className="font-heading font-semibold text-primary text-xs sm:text-sm mb-0.5">
                          {a.name}
                        </h4>
                        <span className="inline-block text-[9px] font-heading font-medium tracking-wide uppercase px-2 py-0.5 mb-1.5 rounded-full bg-primary/10 text-primary">
                          {levelText[a.level]}
                        </span>
                        <p className="text-[10px] sm:text-xs text-muted-foreground leading-normal">
                          {a.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View More / View Less button for Mobile devices */}
        {isMobile && filteredSkills.length > mobileLimit && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 rounded-full font-heading text-xs bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-[0_0_15px_rgba(0,139,155,0.05)] cursor-pointer"
            >
              {showAll ? "Show Less" : "View More"}
            </button>
          </div>
        )}

        {/* Legend block at bottom */}
        <div className="flex items-center justify-end gap-3 mt-6 text-xs text-muted-foreground w-full px-2">
          <span>Less proficient</span>
          <div className="w-3 h-3 rounded-full bg-card/30 border border-border/40" title="Level 1" />
          <div className="w-3 h-3 rounded-full bg-card/45 border border-border/70" title="Level 2" />
          <div className="w-3 h-3 rounded-full bg-card/60 border border-primary/25" title="Level 3" />
          <div className="w-3 h-3 rounded-full bg-card/75 border border-primary/50" title="Level 4" />
          <span>More proficient</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <h2 className="text-5xl text-primary text-center my-10 font-heading">MY SKILLS</h2>
      {type === "long" && (
        <motion.div
          className="flex justify-center w-full mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="w-full max-w-xl p-6 text-center text-muted-foreground border border-border/40 bg-card/10 backdrop-blur-md rounded-xl leading-relaxed text-sm md:text-base">
            Every skill I’ve learned helps me bring ideas to life on the web.
            Here’s a look at the tools and technologies I use daily to build,
            experiment, and create meaningful digital experiences.
          </p>
        </motion.div>
      )}

      {/* Grid vs Graph View Toggle (Desktop Only) */}
      {mounted && !isMobile && (
        <div className="flex justify-center mb-8">
          <div className="flex p-1 bg-card/45 border border-border/55 rounded-full backdrop-blur-xs">
            <button
              onClick={() => setViewMode("graph")}
              className={`px-5 py-1.5 rounded-full font-heading text-xs transition-all duration-300 cursor-pointer ${
                viewMode === "graph"
                  ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(0,139,155,0.2)]"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Graph View
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-5 py-1.5 rounded-full font-heading text-xs transition-all duration-300 cursor-pointer ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(0,139,155,0.2)]"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Grid View
            </button>
          </div>
        </div>
      )}

      {/* Categories Filter Tabs */}
      <div className="flex justify-center w-full mb-8">
        <div className="flex gap-2 overflow-x-auto w-full pb-3 scrollbar-none justify-start md:justify-center px-4 max-w-4xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveFilter(cat);
                setShowAll(false); // Reset viewMore when filter changes
              }}
              className={`px-4 py-1.5 rounded-full font-heading text-xs sm:text-sm border transition-all duration-300 cursor-pointer whitespace-nowrap ${
                activeFilter === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(0,139,155,0.25)]"
                  : "bg-card/25 border-border/55 text-muted-foreground hover:text-primary hover:border-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main View Area */}
      {mounted && !isMobile && viewMode === "graph" ? (
        <div className="flex flex-col items-center justify-center max-w-5xl mx-auto w-full px-4 mb-16 relative">
          <div
            ref={reactFlowWrapper}
            className="relative w-full h-[600px] md:h-[750px] bg-card/15 border border-border/55 rounded-2xl overflow-hidden backdrop-blur-xs"
          >
            <style dangerouslySetInnerHTML={{__html: `
              .react-flow__pane:focus,
              .react-flow__node:focus,
              .react-flow__node,
              .react-flow__edge:focus,
              .react-flow__edge-path:focus {
                outline: none !important;
                box-shadow: none !important;
              }
            `}} />
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodeMouseEnter={onNodeMouseEnter}
              onNodeMouseLeave={onNodeMouseLeave}
              onPaneClick={onNodeMouseLeave}
              fitView
              fitViewOptions={{ padding: 0.12 }}
              zoomOnScroll={false}
              panOnScroll={false}
              preventScrolling={false}
              proOptions={{ hideAttribution: true }}
              className="w-full h-full"
            >
              <Background color="var(--color-primary)" gap={20} size={1} opacity={0.06} />
              <Controls showInteractive={false} position="bottom-right" className="!bg-card/90 !border-border/50 !text-foreground rounded-lg" />
            </ReactFlow>

            {/* Hover Tooltip overlay relative to the React Flow Wrapper */}
            <AnimatePresence>
              {hoveredSkill && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: hoveredSkill.showBelow ? -10 : 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: hoveredSkill.showBelow ? -10 : 10 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: "absolute",
                    left: hoveredSkill.x,
                    top: hoveredSkill.y,
                    transform: hoveredSkill.showBelow ? "translate(-50%, 25px)" : "translate(-50%, -115%)",
                    pointerEvents: "none",
                    zIndex: 100,
                  }}
                  className="w-56 p-4 bg-card/95 border border-border backdrop-blur-md rounded-xl shadow-2xl text-center"
                >
                  {/* Arrow Indicator depending on position strategy */}
                  {hoveredSkill.showBelow ? (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-1 w-2.5 h-2.5 bg-card border-t border-l border-border rotate-45" />
                  ) : (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2.5 h-2.5 bg-card border-r border-b border-border rotate-45" />
                  )}
                  <h4 className="font-heading font-semibold text-primary text-xs sm:text-sm mb-0.5">
                    {hoveredSkill.name}
                  </h4>
                  {hoveredSkill.level && (
                    <span className="inline-block text-[9px] font-heading font-medium tracking-wide uppercase px-2 py-0.5 mb-2 rounded-full bg-primary/10 text-primary">
                      {levelText[hoveredSkill.level]}
                    </span>
                  )}
                  <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">
                    {hoveredSkill.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Interactive Graph Hint */}
          <div className="flex items-center justify-between gap-4 mt-6 text-xs text-muted-foreground w-full px-2">
            <span>💡 Hover over nodes to view details, drag nodes to explore the network</span>
            {/* Legend block matching GitHub's Less-More bar */}
            <div className="flex items-center gap-3">
              <span>Less proficient</span>
              <div className="w-3 h-3 rounded-xs rotate-45 bg-card/30 border border-border/40" title="Level 1" />
              <div className="w-3 h-3 rounded-xs rotate-45 bg-card/45 border border-border/70" title="Level 2" />
              <div className="w-3 h-3 rounded-xs rotate-45 bg-card/60 border border-primary/25" title="Level 3" />
              <div className="w-3 h-3 rounded-xs rotate-45 bg-card/75 border border-primary/50" title="Level 4" />
              <span>More proficient</span>
            </div>
          </div>
        </div>
      ) : (
        renderGridView()
      )}
    </div>
  );
}
