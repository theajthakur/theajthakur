import { Alata, Agdasima } from "next/font/google";

import "./globals.css";
import LayoutProvider from "@/components/providers/LayoutProvider";

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

export const metadata = {
  title: "VIJAY THAKUR - FULL STACK WEB DEVELOPER",
  description:
    "Vijay Singh is an expert full stack web developer having expertise in MERN STACK. ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${alata.variable} ${agdasima.variable} antialiased font-sans`}
      >
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
