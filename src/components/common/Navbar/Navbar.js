"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Twitter, Menu } from "lucide-react";
import React, { useState } from "react";
import { NavLinks } from "./_components/NavLinks";
import { SocialLinks } from "./_components/SocialLinks";
import { MobileMenu } from "./_components/MobileMenu";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "Blogs",
      link: "/blogs",
    },
    {
      text: "About",
      link: "/p/about",
    },
    {
      text: "Projects",
      link: "/p/projects",
    },
    {
      text: "Contact",
      link: "/p/contact",
    },
  ];

  const social = [
    {
      icon: <Github className="w-5 h-5" />,
      link: "https://github.com/theajthakur",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      link: "https://linkedin.com/in/theajthakur",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      link: "https://instagram.com/aj_thakur_rock",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      link: "https://x.com/xvijaythkur",
    },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex w-full justify-center items-center h-[80px] md:h-[100px] top-0 px-4 md:px-0 relative z-30 border-b border-border/50"
      >
        <div className="flex justify-between md:justify-center items-center w-full max-w-7xl">
          {/* Logo - Always Visible */}
          <div className="flex md:absolute md:left-4 lg:left-10 md:top-1/2 md:-translate-y-1/2">
            <Link href={"/"}>
              <Image
                src="/android-chrome-192x192.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <NavLinks
            links={links}
            className="hidden md:flex gap-1 md:gap-4 p-1 rounded-xl text-xl"
          />

          {/* Mobile Hamburger */}
          <div className="md:hidden flex w-full justify-end">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 hover:bg-[#00000008] rounded-full transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Desktop Social */}
          <div className="hidden md:flex absolute right-4 lg:right-10 top-1/2 -translate-y-1/2">
            <SocialLinks social={social} />
          </div>
        </div>
      </motion.nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        links={links}
        social={social}
      />
    </>
  );
}
