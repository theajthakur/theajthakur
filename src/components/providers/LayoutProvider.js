import React from "react";
import Navbar from "../common/Navbar/Navbar";

export default function LayoutProvider({ children }) {
  return (
    <div className="body-container">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main-body">{children}</div>
    </div>
  );
}
