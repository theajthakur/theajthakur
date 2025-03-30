import React from "react";
import "./css/hero.css";
export default function Hero() {
  const socialMedia = [
    {
      name: "GitHub",
      icon: "bi bi-github",
      link: "https://github.com/theajthakur",
      btn: "dark",
    },
    {
      name: "LinkedIn",
      icon: "bi bi-linkedin",
      link: "https://linkedin.com/in/theajthakur",
      btn: "primary",
    },
    {
      name: "Instagram",
      icon: "bi bi-instagram",
      link: "https://instagram.com/aj_thakur_rock",
      btn: "warning",
    },
  ];

  return (
    <div className="hero-section py-5">
      <div className="container p-0">
        <div className="row p-0 m-0">
          <div
            className="col-12 col-md-8 text-center text-md-start"
            style={{ overflow: "hidden" }}
          >
            <div className="h-100 justify-content-center align-items-center d-inline-flex">
              <div className="hero-text animate__animated animate__fadeInLeft">
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
                    <strong> Open Source Projects</strong>. Freelancing for{" "}
                    <strong>2+ years</strong>, turning ideas into reality with
                    clean code & innovation.
                  </p>

                  <p>💻 Let's build something amazing together! ✨</p>
                  <div className="hire-me-btn d-inline-flex my-3 animate__animated animate__fadeInUp animate__delay-1s">
                    <div>
                      <a className="codepen-button">
                        <span>
                          <i className="bi bi-chevron-contract"></i> Contact Me
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="social-media-section mb-3 animate__animated animate__fadeInUp animate__delay-1s">
                    {socialMedia.map((sm, index) => (
                      <a
                        key={index}
                        className={`btn btn-${
                          sm.btn
                        } me-2 social-btn social-btn-${sm.name.toLowerCase()}`}
                        href={sm.link}
                        target="_blank"
                      >
                        <span className={sm.icon}></span>
                        <span className="social-media-name">{sm.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="h-100 justify-content-center align-items-center d-inline-flex w-100">
              <div className="hero-image animate__animated animate__fadeInRight">
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
