import React from "react";
import Navbar from "../common/Navbar/Navbar";
import Footer from "../main/Footer";
import { Toaster } from "sonner";

export default function LayoutProvider({ children }) {
  return (
    <div className="body-container px-4 xl:px-40">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main-body">{children}</div>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
