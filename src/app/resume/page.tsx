
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Vijay Thakur - Full Stack Web Developer & AI Automation Specialist",
  description:
    "View and download the professional resume of Vijay Thakur (Vijay Singh), a freelance Full Stack Web Developer and AI automation engineer specializing in Next.js, React, FastAPI, n8n, and LangChain.",
  keywords: [
    "Vijay Thakur resume",
    "Vijay Singh CV",
    "freelance web developer resume",
    "full stack developer CV",
    "AI automation specialist portfolio",
    "Next.js developer resume",
    "Vijay Thakur Greater Noida"
  ],
  alternates: {
    canonical: "https://dev.vijstack.com/resume",
  },
  openGraph: {
    title: "Resume | Vijay Thakur - Full Stack Web Developer & AI Automation Specialist",
    description:
      "View and download the professional resume of Vijay Thakur (Vijay Singh), freelance Full Stack Web Developer and AI automation specialist.",
    url: "https://dev.vijstack.com/resume",
    siteName: "Vijay Thakur Portfolio",
    images: [
      {
        url: "https://dev.vijstack.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vijay Thakur Resume",
      },
    ],
    locale: "en_IN",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume | Vijay Thakur - Full Stack Web Developer & AI Automation Specialist",
    description:
      "View and download the professional resume of Vijay Thakur (Vijay Singh), freelance Full Stack Web Developer and AI automation specialist.",
    images: ["https://dev.vijstack.com/og-image.png"],
  },
};

export default function Resume() {
  redirect("/assets/resume.pdf");
}