import React from "react";
import "./css/projects.css";

export default function Projects() {
  const projects = [
    {
      title: "ResQ",
      thumbnail: "https://picsum.photos/300/200?random=1",
      description:
        "A disaster management app that allows users to report disasters, view real-time weather updates, and visualize danger zones on a map.",
      languages: ["React", "Node.js", "MongoDB", "WeatherAPI"],
    },
    {
      title: "Urban Escape",
      thumbnail: "https://picsum.photos/300/200?random=2",
      description:
        "A game website where users complete missions, capture images, and redeem badges, with admin-controlled features and interactive maps.",
      languages: ["MERN Stack", "Google Maps API"],
    },
    {
      title: "College Social Media App",
      thumbnail: "https://picsum.photos/300/200?random=3",
      description:
        "A social media app for college students to post updates, follow each other, and interact within a private community.",
      languages: ["MERN Stack"],
    },
    {
      title: "E-commerce Website",
      thumbnail: "https://picsum.photos/300/200?random=4",
      description:
        "An online store for fashionable and trending clothes with an emphasis on quality, comfort, and durability.",
      languages: ["Next.js", "MongoDB", "Stripe API"],
    },
    {
      title: "Holi Party Registration Page",
      thumbnail: "https://picsum.photos/300/200?random=5",
      description:
        "A web page for Holi Party event registration, featuring online payments and QR code-based entry validation.",
      languages: ["Express.js", "EJS", "MongoDB", "JWT"],
    },
    {
      title: "Internship Assignment (Pha5e Hero Section)",
      thumbnail: "https://picsum.photos/300/200?random=6",
      description:
        "A recreation of the Pha5e website's hero section with animations, hover interactions, and mouse movement effects.",
      languages: ["HTML", "CSS", "JavaScript", "GSAP"],
    },
    {
      title: "GPS Path Tracker",
      thumbnail: "https://picsum.photos/300/200?random=7",
      description:
        "A web app to track users' paths accurately using GPS and Mapbox, with automatic path correction for accuracy.",
      languages: ["JavaScript", "Mapbox API"],
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
            <div className="col-sm-6 col-md-4 col-lg-3 mb-5" key={index}>
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
