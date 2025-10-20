import React from "react";
import Skills from "../pages/Skills";
import { MyTimeLine } from "../pages/Timeline";
import Hero from "./_components/Hero";

export default function Main() {
  return (
    <div>
      <Hero />
      <Skills type={"short"} />
      <MyTimeLine />
    </div>
  );
}
