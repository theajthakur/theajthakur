import React from "react";
import Flag from "react-world-flags";

export default function About() {
  return (
    <div className="about-container">
      <h2 className="text-5xl text-primary text-center my-10">ABOUT ME</h2>
      <p>
        I’m a Full Stack Web Developer with a proven track record of delivering
        high-quality web solutions for clients across the globe, including
        Canada, Germany, and Poland. Over the years, I’ve collaborated with
        startups, agencies, and entrepreneurs to build fast, reliable, and
        visually refined web applications that drive results.
      </p>
      <div className="my-10 flex justify-center gap-4">
        <div className="p-3 sm:p-5 md:p-8 shadow-sm bg-primary/5">
          <Flag code="CA" style={{ width: "60px", height: "30px" }} />
        </div>
        <div className="p-3 sm:p-5 md:p-8 shadow-sm bg-primary/5">
          <Flag code="DE" style={{ width: "60px", height: "30px" }} />
        </div>
        <div className="p-3 sm:p-5 md:p-8 shadow-sm bg-primary/5">
          <Flag code="PL" style={{ width: "60px", height: "30px" }} />
        </div>
      </div>
      <p>
        With strong expertise in both frontend and backend development, I handle
        projects end-to-end — from planning and design to deployment and
        maintenance. My focus is on writing clean, maintainable code and
        creating digital products that combine performance, usability, and
        modern design.
      </p>
      <p className="mt-5">
        Beyond coding, I value clear communication, timely delivery, and
        long-term client relationships. Every project I take on is approached
        with precision, professionalism, and a commitment to excellence.
      </p>
    </div>
  );
}
