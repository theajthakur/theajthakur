"use client";
import { motion } from "framer-motion";
import { Github, Instagram, Linkedin } from "lucide-react";
import React from "react";

export default function Navbar() {
  const links = ["Home", "Skills", "About", "Projects", "Contact"];
  const social = [
    { icon: <Github />, link: "https://github.com/theajthakur" },
    { icon: <Linkedin />, link: "https://linkedin.com/in/theajthakur" },
    { icon: <Instagram />, link: "https://instagram.com/aj_thakur_rock" },
  ];
  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex w-full justify-center items-center h-[100px] top-0"
    >
      <div className="flex justify-center md:justify-start w-full gap-1 md:gap-4 p-1 rounded-xl text-xl">
        {links.map((e, i) => (
          <div
            key={i}
            className="cursor-pointer font-secondary hover:bg-[#00000008] hover:text-black py-2 px-3 rounded-xl"
          >
            {e}
          </div>
        ))}
      </div>
      <div className="md:flex hidden gap-2 items-center">
        {social.map((e, i) => {
          return (
            <div
              key={i}
              className="p-1 rounded-full hover:text-primary cursor-pointer"
              onClick={() => {
                window.open(e.link);
              }}
            >
              {e.icon}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
