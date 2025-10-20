"use client";
import {
  Braces,
  Cloud,
  Code2,
  Database,
  FileCode2,
  Hospital,
  Palette,
  Server,
  TerminalSquare,
  Wrench,
} from "lucide-react";

import { FaReact } from "react-icons/fa";
import {
  React,
  NextJs,
  TailwindCSS,
  JavaScript,
  CSS,
  PHP,
  MongoDB,
  ExpressJsDark,
  NodeJs,
  Git,
  DigitalOcean,
} from "developer-icons";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);
export default function Skills({ type = "long" }) {
  const wrapperRef = useRef(null);
  const container = [];
  const skills = [
    {
      type: "Frontend",
      skills: [
        { name: "Next.js", icon: NextJs },
        { name: "React", icon: React },
        { name: "Tailwind CSS", icon: TailwindCSS },
        { name: "JavaScript", icon: JavaScript },
        { name: "HTML/CSS", icon: CSS },
      ],
    },
    {
      type: "Backend",
      skills: [
        { name: "Node.js", icon: NodeJs },
        { name: "Express.js", icon: ExpressJsDark },
        { name: "MongoDB", icon: MongoDB },
        { name: "PHP", icon: PHP },
        { name: "REST API", icon: TerminalSquare },
      ],
    },
    {
      type: "Other",
      skills: [
        { name: "Git / GitHub", icon: Git },
        { name: "Cloud / Deployment", icon: Cloud },
        { name: "Digital Ocean", icon: DigitalOcean },
      ],
    },
  ];

  useEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 60%",
          end: "center center",
        },
      })
      .to(container, {
        opacity: 1,
        left: 50,
        stagger: 0.1,
      });
  }, []);

  return (
    <div ref={wrapperRef}>
      <h2 className="text-5xl text-primary text-center my-10">MY SKILLS</h2>
      {type == "long" && (
        <motion.div
          className="flex justify-center w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="w-full max-w-xl p-5 shadow-xl">
            Every skill I’ve learned helps me bring ideas to life on the web.
            Here’s a look at the tools and technologies I use daily to build,
            experiment, and create meaningful digital experiences.
          </p>
        </motion.div>
      )}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {skills.map((e, i) => (
          <div key={i} className="mt-5 mb-10">
            <h3 className="text-primary text-2xl my-5">{e.type}</h3>
            <div className="flex gap-2 flex-wrap">
              {e.skills.map((a, b) => {
                const Icon = a.icon;
                return (
                  <div
                    key={b}
                    ref={(e) => {
                      container.push(e);
                    }}
                    className="opacity-0 relative shadow-sm p-5 rounded-sm sm:min-w-[200px] transition-all hover:bg-primary hover:text-light hover:scale-105"
                  >
                    <div className="flex justify-center">
                      <div className="p-2 rounded-full bg-light text-dark">
                        <Icon className="w-10 h-10" />
                      </div>
                    </div>
                    <h2 className="text-center mt-3">{a.name}</h2>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
