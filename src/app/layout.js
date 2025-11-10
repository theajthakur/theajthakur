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
  title: "Vijay Thakur | Full Stack Web Developer in India",
  description:
    "Vijay Thakur is a professional Full Stack Web Developer based in India, specializing in the MERN Stack. Available for web development projects in Greater Noida, Delhi NCR, Orai, and Jalaun. Expert in creating responsive, modern, and high-performance web applications.",
  keywords: [
    "Full Stack Developer in India",
    "Full Stack Developer in Delhi",
    "Full Stack Developer in Greater Noida",
    "Full Stack Developer in NCR",
    "Full Stack Developer in Jalaun",
    "Full Stack Developer in Orai",
    "Web Developer near me",
    "MERN Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Freelance Web Developer India",
    "Vijay Thakur Web Developer",
    "Vijay Singh Thakur Portfolio",
  ],
  manifest: "/site.webmanifest",
  authors: [{ name: "Vijay Thakur" }],
  openGraph: {
    title:
      "Vijay Thakur | Full Stack Web Developer (MERN Stack Expert) in India",
    description:
      "Hire Vijay Thakur — a Full Stack Web Developer in India with MERN Stack expertise. Available for freelance projects in Greater Noida, Delhi NCR, Orai, and Jalaun.",
    url: "https://dev.vijstack.com",
    siteName: "Vijay Thakur Portfolio",
    images: [
      {
        url: "https://dev.vijstack.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vijay Thakur - Full Stack Developer Portfolio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vijay Thakur | Full Stack Developer in India",
    description:
      "Experienced Full Stack Web Developer (MERN Stack) in India — available for freelance and remote projects across Delhi NCR, Greater Noida, and more.",
    images: ["https://dev.vijstack.com/og-image.png"],
  },
  alternates: {
    canonical: "https://dev.vijstack.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${alata.variable} ${agdasima.variable} ${aldrich.variable} antialiased font-primary`}
      >
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
