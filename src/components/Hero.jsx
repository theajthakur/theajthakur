import React from "react";
import "./css/hero.css";
export default function Hero() {
  return (
    <div className="hero-section py-5">
      <div className="container p-0">
        <div className="row p-0 m-0">
          <div className="col-12 col-md-8">
            <div className="h-100 justify-content-center align-items-center d-inline-flex">
              <div className="hero-text">
                <h1>Vijay Singh</h1>
                <div className="styled-typewritter">
                  <div className="typewriter">
                    <h2>
                      <span className="typed-text">
                        Fullstack Web Developer
                      </span>
                      <span className="cursor">|</span>
                    </h2>
                    <h2>
                      <span className="typed-text">MERN Enthusiast</span>
                    </h2>
                  </div>
                </div>
                <div className="description">
                  <p>
                    Passionate about building <strong>scalable web apps</strong>
                    , optimizing <strong>backend performance</strong>, and
                    contributing to
                    <strong>Webpack & Electron for GSoC 2025</strong>.
                    Freelancing for <strong>2+ years</strong>, turning ideas
                    into reality with clean code & innovation.
                  </p>

                  <p>💻 Let's build something amazing together! ✨</p>
                  <div className="hire-me-btn d-inline-flex">
                    <div>
                      <a className="codepen-button">
                        <span>
                          <i className="bi bi-chevron-contract"></i> Contact Me
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="h-100 justify-content-center align-items-center d-inline-flex">
              <div className="hero-image">
                <img
                  src="https://avatars.githubusercontent.com/u/159218584?v=4"
                  alt="Vijay Singh"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
