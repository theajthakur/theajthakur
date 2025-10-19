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
  title: "VIJAY THAKUR - FULL STACK WEB DEVELOPER",
  description:
    "Vijay Singh is an expert full stack web developer having expertise in MERN STACK. ",
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
