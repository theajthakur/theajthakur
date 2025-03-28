import React from "react";

export default function Hero() {
  return (
    <div className="hero-section">
      <div className="row p-0 m-0">
        <div className="col-12 col-md-8">
          <div className="hero-text">
            <h1>Vijay Singh</h1>
            <div className="styled-typewritter">
              <div className="typewriter">
                <h2>
                  <span className="typed-text">Fullstack Web Developer</span>
                  <span className="cursor">|</span>
                </h2>
                <h2>
                  <span className="typed-text">MERN Enthusiast</span>
                </h2>
              </div>
              <div className="description">
                <p align="center">
                  Passionate about building <strong>scalable web apps</strong>,
                  optimizing <strong>backend performance</strong>, and
                  contributing to
                  <strong>Webpack & Electron for GSoC 2025</strong>. Freelancing
                  for <strong>2+ years</strong>, turning ideas into reality with
                  clean code & innovation.
                </p>

                <p align="center">
                  💻 Let's build something amazing together! ✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
