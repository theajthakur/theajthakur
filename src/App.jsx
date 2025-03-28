import React from "react";
import Hero from "./components/Hero";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";

export default function App() {
  return (
    <div className="main-body">
      <div className="container-fluid">
        <Hero />
      </div>
    </div>
  );
}
