import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const links = [
    { link: "/p/about", text: "About" },
    { link: "/p/contact", text: "Contact" },
    { link: "/p/projects", text: "Projects" },
    { link: "/p/skills", text: "Skills" },
  ];
  return (
    <footer className="mt-10 text-foreground py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <h2 className="text-primary text-lg font-semibold mb-3">
            Vijay Singh
          </h2>
          <div className="text-sm text-foreground/80">
            Full Stack Web Developer working with international clients to build
            high-quality digital products.
          </div>
        </div>
        <div>
          <h3 className="text-primary font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {links.map((l, i) => (
              <li key={i}>
                <Link href={l.link} className="hover:text-primary transition">
                  {l.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-primary font-semibold mb-3">Get in Touch</h3>
          <div className="text-sm text-foreground/80">
            <div className="flex gap-2">
              <div>
                <MapPin />
              </div>
              Alpha II, Greater Noida 201308, Gautam Budhha Nagar, Uttar
              Pradesh, India
            </div>
          </div>
          <div className="text-sm text-foreground/80 mt-1">
            <div className="flex gap-2">
              <div>
                <Mail />
              </div>
              vijaysingh.handler@gmail.com
            </div>
          </div>
          <div className="text-sm text-foreground/80 mt-1">
            <div className="flex gap-2">
              <div>
                <Phone />
              </div>
              +91 9695146906
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-secondary/30 mt-10 pt-4 text-center text-sm text-foreground/70">
        © 2025 Vijay Singh. All rights reserved.
      </div>
    </footer>
  );
}
