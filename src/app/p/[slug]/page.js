import NotFound from "@/app/not-found";
import About from "@/components/pages/About";
import Contact from "@/components/pages/Contact";
import { HireMePage } from "@/components/pages/HireMe";
import Projects from "@/components/pages/Projects";
import Skills from "@/components/pages/Skills";
import React from "react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  const seoData = {
    projects: {
      title: "Projects & Portfolio | Vijay Thakur | Best Freelance Web Developer",
      description: "Explore the portfolio of Vijay Thakur, a top freelance developer. Featuring Snake & Ladder multiplayer game, Oppskills Discovery Platform, Ponion Food SaaS, and XP URL Shortener.",
      keywords: [
        "Snake and Ladder multiplayer game",
        "Oppskills discovery platform",
        "Ponion food SaaS",
        "XP URL Shortener",
        "React projects portfolio",
        "FastAPI game backend",
        "Next.js projects",
        "freelance developer projects",
        "Vijay Thakur projects"
      ]
    },
    about: {
      title: "About Me | Vijay Thakur | Best Freelance Web Developer",
      description: "Learn more about Vijay Thakur (Vijay Singh), an experienced Full Stack Web Developer and AI automation engineer specializing in React, Next.js, FastAPI, n8n, and LangChain.",
      keywords: ["About Vijay Thakur", "Vijay Singh developer bio", "full stack developer profile", "AI automation freelancer profile"]
    },
    contact: {
      title: "Contact & Hire | Vijay Thakur | Freelance Web Developer",
      description: "Get in touch with Vijay Thakur to hire him for your next web development or AI automation project. Offering best rates and high-performance solutions.",
      keywords: ["hire Vijay Thakur", "contact freelance web developer", "hire Next.js developer", "AI automation consultant contact"]
    },
    skills: {
      title: "Tech Stack & Skills | Vijay Thakur | AI & Full Stack Developer",
      description: "Explore the technical expertise of Vijay Thakur, including JavaScript, Python, Next.js, FastAPI, PostgreSQL, Redis, MongoDB, n8n, and LangChain.",
      keywords: ["Vijay Thakur skills", "developer tech stack", "React NextJS expert", "Python FastAPI developer", "n8n workflow creator"]
    },
    hire: {
      title: "Hire Me | Vijay Thakur | Premium Freelance Developer Services",
      description: "Hire Vijay Thakur for premium full-stack development, API integrations, and AI workflow automation at the most competitive rates.",
      keywords: ["hire freelance developer", "cheap Next.js website developer", "best web developer Greater Noida", "hire AI workflow automation engineer"]
    }
  };

  const currentSeo = seoData[slug] || {
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} | Vijay Thakur`,
    description: `Learn more about ${slug} on Vijay Thakur's portfolio website.`
  };

  const baseUrl = "https://dev.vijstack.com";
  
  return {
    title: currentSeo.title,
    description: currentSeo.description,
    keywords: currentSeo.keywords || [],
    alternates: {
      canonical: `${baseUrl}/p/${slug}`,
    },
    openGraph: {
      title: currentSeo.title,
      description: currentSeo.description,
      url: `${baseUrl}/p/${slug}`,
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${slug} - Vijay Thakur Portfolio`,
        }
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: currentSeo.title,
      description: currentSeo.description,
      images: [`${baseUrl}/og-image.png`],
    }
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const pages = {
    about: <About />,
    contact: <Contact />,
    skills: <Skills />,
    hire: <HireMePage />,
    projects: <Projects />,
  };
  const PageComponent = pages[slug];
  if (!PageComponent) return <NotFound />;

  if (slug === "projects") {
    const projectsSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Web Development & AI Projects | Vijay Thakur",
      "description": "Featured projects created by Vijay Thakur, featuring full stack systems, real-time multiplayer games, and automation scripts.",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "SoftwareApplication",
            "name": "Oppskills",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "All",
            "url": "https://oppskills.com",
            "description": "A full-stack opportunity discovery platform built using Next.js, NestJS, PostgreSQL, and Redis, serving 10,000+ users. It features an analytics aggregation system, authentication systems, and streamlined user discovery for events and hackathons."
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "SoftwareApplication",
            "name": "Snake & Ladder Multiplayer",
            "applicationCategory": "GameApplication",
            "operatingSystem": "All",
            "url": "https://www.snakeladder.me",
            "description": "A modern web-based multiplayer implementation of the classic Snake & Ladder game featuring server-authoritative gameplay. Built with real-time API polling, backend turn validation, lobby creation, room sharing, and synchronized gameplay."
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "SoftwareApplication",
            "name": "URL Shortener",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "All",
            "url": "https://shortener-xp.vercel.app",
            "description": "A nostalgic Windows XP-inspired web experience featuring a GTA-themed parody interface with an integrated high-performance URL shortener, FastAPI, PostgreSQL, and Redis."
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "SoftwareApplication",
            "name": "Ponion",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "All",
            "url": "https://ponion.vercel.app",
            "description": "A multi-tenant food discovery and ordering platform inspired by modern restaurant marketplaces. Features customer app, restaurant management portal, and Super Admin dashboard."
          }
        },
        {
          "@type": "ListItem",
          "position": 5,
          "item": {
            "@type": "SoftwareApplication",
            "name": "Rotaract Club Website",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "All",
            "url": "https://rotaractgalgotias.org",
            "description": "Official website for the Rotaract Club of Galgotias Educational Institutions, supporting registrations and event promotions."
          }
        }
      ]
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
        />
        {PageComponent}
      </>
    );
  }

  return PageComponent;
}
