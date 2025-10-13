import React from "react";
import Hero from "./Hero";
import About from "./About";
import Footer from "./Footer";
import Skills from "./Skills";
import { MyTimeLine } from "./Timeline";

export default function Main() {
  return (
    <div>
      <Hero />
      <Skills />
      <MyTimeLine />
      <Footer />
    </div>
  );
}
