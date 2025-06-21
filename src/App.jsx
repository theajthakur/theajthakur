import { BrowserRouter, Routes, Route } from "react-router-dom";

import Hero from "./components/Hero";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "animate.css";
import Navbar from "./components/Navbar";
import { useMode } from "./Context/ModeContext";
import SkillCarousel from "./components/Skills";
import Projects from "./components/Projects";
import ChatBot from "./components/ChatBot";
import Footer from "./components/Footer";
import Admin from "./components/Admin/Admin";

export default function App() {
  const { mode } = useMode();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<Admin />}></Route>
        <Route
          path="*"
          element={
            <>
              <div
                className={`app ${
                  mode === "light" ? "light-mode" : "dark-mode"
                }`}
              >
                <Navbar />
                <Hero />
                <SkillCarousel />
                <Projects />
                <ChatBot />
                <Footer />
              </div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
