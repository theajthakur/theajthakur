import NotFound from "@/app/not-found";
import About from "@/components/pages/About";
import Contact from "@/components/pages/Contact";
import { HireMePage } from "@/components/pages/HireMe";
import Projects from "@/components/pages/Projects";
import Skills from "@/components/pages/Skills";
import React from "react";

export default async function Page({ params }) {
  const { slug } = await params;
  const pages = {
    about: <About />,
    contact: <Contact />,
    skills: <Skills />,
    hire: <HireMePage />,
    projects: <Projects />,
  };
  const Page = pages[slug];
  if (!Page) return <NotFound />;
  return Page;
}
