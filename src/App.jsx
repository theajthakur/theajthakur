import React from "react";
import Hero from "./components/Hero";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";
import Navbar from "./components/Navbar";
import { ModeProvider } from "./Context/ModeContext";

export default function App() {
  return (
    <div className="main-body">
      <ModeProvider>
        <Navbar />
        <Hero />
      </ModeProvider>
    </div>
  );
}
