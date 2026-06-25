import { Alata, Agdasima, Aldrich } from "next/font/google";

import "./globals.css";
import LayoutProvider from "@/components/providers/LayoutProvider";
import { Analytics } from "@vercel/analytics/next";

const alata = Alata({
  subsets: ["latin"],
  variable: "--font-alata",
  weight: "400",
});

const agdasima = Agdasima({
  subsets: ["latin"],
  variable: "--font-agdasima",
  weight: "400",
});

const aldrich = Aldrich({
  subsets: ["latin"],
  variable: "--font-aldrich",
  weight: "400",
});

export const metadata = {
  title: "Best Freelance Web Developer & AI Automation Specialist | Vijay Thakur",
  description:
    "Hire Vijay Thakur (Vijay Singh) — the best affordable freelance Full Stack Web Developer & AI automation specialist. Offering Next.js/React websites, n8n workflows, and FastAPI backends at best rates. Available in Delhi NCR, Greater Noida, and globally.",
  keywords: [
    "best freelance web developer",
    "cheap freelance web developer",
    "affordable website freelancer",
    "hire web developer cheap best",
    "Next.js react developer freelancer",
    "n8n automation freelancer",
    "LangChain developer India",
    "FastAPI Python programmer",
    "Full Stack Developer in Greater Noida",
    "Full Stack Developer in Delhi NCR",
    "web development freelancer India",
    "local web developer near me",
    "SaaS developer freelancer",
    "Vijay Thakur portfolio",
    "Vijay Singh developer"
  ],
  manifest: "/site.webmanifest",
  authors: [{ name: "Vijay Thakur" }],
  openGraph: {
    title:
      "Best Freelance Web Developer & AI Automation Specialist | Vijay Thakur",
    description:
      "Hire Vijay Thakur (Vijay Singh) — high-performance Next.js/React apps, n8n workflow integrations, and secure database services at affordable freelancer rates.",
    url: "https://dev.vijstack.com",
    siteName: "Vijay Thakur Portfolio",
    images: [
      {
        url: "https://dev.vijstack.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vijay Thakur - Freelance Web Developer & AI Specialist Portfolio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Freelance Web Developer & AI Automation Specialist | Vijay Thakur",
    description:
      "Affordable and high-performance freelance Full Stack development (Next.js, Node.js, FastAPI) and AI workflow integration (n8n, LangChain). Get a free quote.",
    images: ["https://dev.vijstack.com/og-image.png"],
  },
  alternates: {
    canonical: "https://dev.vijstack.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://dev.vijstack.com/#person",
      "name": "Vijay Singh",
      "alternateName": "Vijay Thakur",
      "url": "https://dev.vijstack.com",
      "image": "https://dev.vijstack.com/android-chrome-512x512.png",
      "sameAs": [
        "https://github.com/theajthakur",
        "https://linkedin.com/in/theajthakur",
        "https://instagram.com/aj_thakur_rock",
        "https://x.com/xvijaythkur"
      ],
      "jobTitle": "Full Stack Web Developer & AI Automation Engineer",
      "description": "Experienced software engineer specializing in full-stack web applications, AI integrations, n8n, and LangChain automation.",
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance"
      }
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://dev.vijstack.com/#service",
      "name": "Vijay Thakur | Best Affordable Freelance Full Stack Web Developer & AI Specialist",
      "image": "https://dev.vijstack.com/og-image.png",
      "priceRange": "$$",
      "telephone": "+919695146906",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Greater Noida",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "201308",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "28.5672",
        "longitude": "77.5376"
      },
      "url": "https://dev.vijstack.com",
      "description": "Best value freelance web developer. Providing affordable, premium Next.js websites, AI tools, LangChain agents, and n8n automations globally and in Delhi NCR.",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    },
    {
      "@type": "Service",
      "serviceType": "Freelance Web Development & AI Automation",
      "provider": {
        "@id": "https://dev.vijstack.com/#person"
      },
      "description": "High-performance Next.js/React websites, backend Node.js/NestJS/FastAPI services, database solutions, and custom n8n / LangChain AI workflow integrations at competitive rates.",
      "areaServed": "Worldwide"
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${alata.variable} ${agdasima.variable} ${aldrich.variable} antialiased font-primary`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LayoutProvider>
          {children}
          <Analytics />
        </LayoutProvider>
      </body>
    </html>
  );
}
