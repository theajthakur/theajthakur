import React from "react";
import "./css/projects.css";

export default function Projects() {
  const projects = [
    {
      title: "Notely",
      thumbnail: "/assets/images/project/diary.jpeg",
      accessUrl: "https://theajthakur.github.io/notely",
      description:
        "Notely is a fully client-side diary and to-do app built with ReactJS, focused on user privacy. It lets users write private diary entries, manage tasks by date, mark them as completed or delete them. It features a smart password system that re-authenticates after 1 minute of inactivity, with an option to save the password. Users can export and import backups locally, ensuring complete control over their data.",
      languages: ["ReactJS", "JavaScript", "LocalStorage"],
    },
    {
      title: "PNR Fetcher",
      thumbnail: "/assets/images/project/pnr-fetcher.jpg",
      accessUrl: "https://theajthakur.github.io/PNR_Frontend",
      description:
        "PNR Fetcher is an educational web app built with Node.js and Puppeteer to demonstrate real-time web scraping and captcha solving. Users can enter their IRCTC PNR number, and the app uses Puppeteer to navigate to the official website, solve the captcha using OCR techniques, and display PNR details on the screen. It showcases how basic captchas can be bypassed using OCR (Tesseract), highlighting the challenges of modern web scraping. Intended purely for educational and research purposes.",
      languages: ["Node.js", "Puppeteer", "OCR", "JavaScript"],
    },
  ];

  return (
    <div className="container project-section animate__animated animate__fadeInUp mt-5">
      <h2 className="text-center border-top py-3" id="projects">
        Projects
      </h2>

      <div className="projects-cards">
        <div className="row">
          {projects.map((project, index) => (
            <div
              className="col-sm-6 col-md-4 col-lg-3 mb-5"
              key={index}
              onClick={() => {
                window.open(project.accessUrl);
              }}
            >
              <div className="project-container">
                <div className="project-thumbnail">
                  <img src={project.thumbnail} />
                </div>
                <div className="project-detail">
                  <div className="project-title">
                    <h4 className="py-2 m-0">{project.title}</h4>
                  </div>
                  <div className="project-description">
                    <p>{project.description}</p>
                  </div>
                  <div className="project-tags">
                    {project.languages.map((lang, ind) => (
                      <span className="project-tag" key={ind}>
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
