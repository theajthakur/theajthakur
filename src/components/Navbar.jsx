import React from "react";
import { useMode } from "../Context/ModeContext";
export default function Navbar() {
  const { mode, toggleMode } = useMode();
  return (
    <div className="my-navbar">
      <nav
        className={`navbar navbar-expand ${
          mode === "light" ? "navbar-light bg-light" : "navbar-dark bg-dark"
        }`}
      >
        <div className="container">
          <a className="navbar-brand" href="#">
            @theajthakur
          </a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  href="#"
                  onClick={toggleMode}
                >
                  <span className="bi bi-sun"></span>
                  {mode === "light" ? "Light" : "Dark"} Mode
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span className="bi bi-laptop"></span> Projects
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span className="bi bi-card-checklist"></span> About me
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
