import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white text-foreground py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="text-primary text-lg font-semibold mb-3">
            Vijay Singh
          </h2>
          <p className="text-sm text-foreground/80">
            Full Stack Web Developer working with international clients to build
            high-quality digital products.
          </p>
        </div>
        <div>
          <h3 className="text-primary font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#about" className="hover:text-primary transition">
                About
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-primary transition">
                Projects
              </a>
            </li>
            <li>
              <a href="#skills" className="hover:text-primary transition">
                Skills
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-primary transition">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-primary font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Web Development</li>
            <li>UI/UX Design</li>
            <li>API Integration</li>
            <li>Freelance Consulting</li>
          </ul>
        </div>
        <div>
          <h3 className="text-primary font-semibold mb-3">Get in Touch</h3>
          <p className="text-sm text-foreground/80">
            <div className="flex gap-2">
              <div>
                <MapPin />
              </div>
              Alpha II, Greater Noida 201308, Gautam Budhha Nagar, Uttar
              Pradesh, India
            </div>
          </p>
          <p className="text-sm text-foreground/80 mt-1">
            <div className="flex gap-2">
              <div>
                <Mail />
              </div>
              vijaysingh.handler@gmail.com
            </div>
          </p>
          <p className="text-sm text-foreground/80 mt-1">
            <div className="flex gap-2">
              <div>
                <Phone />
              </div>
              +91 9695146906
            </div>
          </p>
          <div className="flex gap-4 mt-3">
            <a href="#" className="hover:text-primary transition">
              🌐
            </a>
            <a href="#" className="hover:text-primary transition">
              💼
            </a>
            <a href="#" className="hover:text-primary transition">
              📸
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-secondary/30 mt-10 pt-4 text-center text-sm text-foreground/70">
        © 2025 Vijay Singh. All rights reserved.
      </div>
    </footer>
  );
}
