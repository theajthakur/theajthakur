import React from "react";
import { Code2, Rocket, Target } from "lucide-react";
export default function About() {
  return (
    <section id="about" className="py-16 bg-dark/2">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 text-dark">
          About <span className="text-primary">Me</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          I’m a passionate full-stack web developer who loves crafting clean,
          responsive, and scalable web applications. My focus is on delivering
          seamless digital experiences that combine performance and design.
          Whether it’s a simple landing page or a complex MERN-based platform, I
          bring ideas to life through code.
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="bg-light p-6 rounded-2xl shadow hover:shadow-lg transition">
            <Code2 className="mx-auto text-primary w-10 h-10 mb-4" />
            <h3 className="text-lg font-semibold text-dark  mb-2">
              Clean Code
            </h3>
            <p className="text-gray-600 text-sm">
              I write maintainable, efficient, and reusable code with modern
              best practices and clean architecture.
            </p>
          </div>

          <div className="bg-light p-6 rounded-2xl shadow hover:shadow-lg transition">
            <Target className="mx-auto text-primary w-10 h-10 mb-4" />
            <h3 className="text-lg font-semibold text-dark mb-2">
              Problem Solving
            </h3>
            <p className="text-gray-600 text-sm">
              I enjoy solving complex problems and optimizing user experience
              through smart, scalable solutions.
            </p>
          </div>

          <div className="bg-light p-6 rounded-2xl shadow hover:shadow-lg transition">
            <Rocket className="mx-auto text-primary w-10 h-10 mb-4" />
            <h3 className="text-lg font-semibold text-dark mb-2">
              Continuous Growth
            </h3>
            <p className="text-gray-600 text-sm">
              I’m always learning — keeping up with new tools, frameworks, and
              trends to improve my craft every day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
