import React from "react";
import Skills from "../pages/Skills";
import { MyTimeLine } from "../pages/Timeline";
import Hero from "./_components/Hero";
import { getAllTimelines } from "@/lib/dashboard/timelines/TimelinesController";

export default async function Main() {
  const timelines = await getAllTimelines();

  return (
    <div>
      <Hero />
      <Skills type={"short"} />
      <MyTimeLine timelines={timelines} />
    </div>
  );
}
