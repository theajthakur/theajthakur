"use client";
import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Briefcase, Handshake, Rocket, Send } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Link from "next/link";

export function HireMePage() {
  return (
    <section
      id="hireme"
      className="relative pt-20 overflow-hidden bg-background text-foreground"
    >
      <BackgroundLines className={"top-0 z-10"}></BackgroundLines>
      <div className="max-w-5xl mx-auto px-6 text-center relative inset-0 z-20">
        <h2 className="text-3xl font-heading font-bold text-dark mb-4">
          Hire <span className="text-primary">Me</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
          Looking for a dedicated developer to bring your ideas to life? I
          specialize in crafting modern, responsive, and scalable web
          applications tailored to your business needs.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-card rounded-2xl shadow hover:shadow-lg transition">
            <Briefcase className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-dark mb-2">
              Freelance Projects
            </h3>
            <p className="text-sm text-muted-foreground">
              Available for freelance or contract-based projects with a focus on
              quality, scalability, and timely delivery.
            </p>
          </div>

          <div className="p-6 bg-card rounded-2xl shadow hover:shadow-lg transition">
            <Rocket className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-dark mb-2">
              Startup Collaboration
            </h3>
            <p className="text-sm text-muted-foreground">
              I love working with startups and innovative teams to build
              impactful web platforms and MVPs.
            </p>
          </div>

          <div className="p-6 bg-card rounded-2xl shadow hover:shadow-lg transition">
            <Send className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-dark mb-2">
              Full-Time Opportunities
            </h3>
            <p className="text-sm text-muted-foreground">
              Open to joining a creative team full-time where I can contribute
              to large-scale web projects.
            </p>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <Link href={"/p/contact"}>
            <Button>
              <Handshake /> Hire Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
