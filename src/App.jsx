import React from "react";
import Hero from "./components/Hero";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";
import Navbar from "./components/Navbar";
import { useMode } from "./Context/ModeContext";
import SkillCarousel from "./components/Skills";
import Projects from "./components/Projects";

export default function App() {
  const { mode } = useMode();
  return (
    <div className={`app ${mode === "light" ? "light-mode" : "dark-mode"}`}>
      <Navbar />
      <Hero />
      <SkillCarousel />
      <Projects />
    </div>
  );
}
