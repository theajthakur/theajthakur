"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Button from "../ui/Button";
import { motion } from "framer-motion";
import {
  Github,
  Instagram,
  LaptopMinimalCheckIcon,
  Linkedin,
} from "lucide-react";
import gsap from "gsap";
import { Boxes } from "../ui/background-boxes";

export default function Hero() {
  const nameRef = useRef(null);
  const social = [
    { icon: <Github />, link: "https://github.com/theajthakur" },
    { icon: <Linkedin />, link: "https://linkedin.com/in/theajthakur" },
    { icon: <Instagram />, link: "https://instagram.com/aj_thakur_rock" },
  ];
  useEffect(() => {
    if (!nameRef.current) return;
    console.log(nameRef.current.children);
    gsap.from(nameRef.current.children, {
      duration: 0.5,
      stagger: 0.1,
      x: 50,
      opacity: 0,
    });
  }, []);
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-col justify-center md:flex-row gap-10 w-full min-h-[80vh]"
    >
      <div className="w-full md:w-md flex items-center justify-center font-primary">
        <div className="text-high relative z-50 p-[20px]">
          <div className="relative left-[-20px] top-2">
            <div className="flex">
              <div className="w-1 h-4 bg-secondary"></div>
              <div className="w-4 h-1 bg-secondary"></div>
            </div>
          </div>
          <h5 className="text-primary text-2xl">Hi There,</h5>
          <h2 className="text-3xl">
            I’m a <span className="text-primary">Full Stack</span> Web Developer
          </h2>
          <div className="text-5xl text-primary py-3 flex" ref={nameRef}>
            {"VIJAY SINGH".split("").map((e, i) => (
              <div className="relative" key={i}>
                {e == " " ? <span className="px-2"></span> : e}
              </div>
            ))}
          </div>
          <p className="text-foreground">
            Full Stack Web Developer with strong expertise in modern web
            technologies. I design and develop complete solutions — from
            intuitive interfaces to efficient backend systems.
          </p>
          <div className="flex flex-col items-end gap-0">
            <div className="w-1 h-4 bg-secondary"></div>
            <div className="w-4 h-1 bg-secondary"></div>
          </div>
          <div className="flex md:hidden gap-2 items-center">
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
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="my-5"
          >
            <Button className="w-full md:w-auto cursor-pointer flex gap-2">
              <LaptopMinimalCheckIcon /> <span>HIRE ME</span>
            </Button>
          </motion.div>
        </div>
      </div>
      <div className="flex md:p-10 justify-center md:justify-end items-center">
        <Image
          src={"/vijay_brush.png"}
          width={300}
          height={300}
          alt="brush-vijay"
        />
      </div>
    </motion.div>
  );
}
