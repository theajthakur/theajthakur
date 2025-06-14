import useIntersectionObserver from "../utils/useIntersectionObserver";
import "./css/projects.css";

export default function Projects() {
  const [divRef, isVisible] = useIntersectionObserver({
    threshold: 0.9,
  });
  const projects = [
    {
      title: "SynTalk",
      thumbnail: "/assets/images/project/syntalk.png",
      accessUrl: "https://syntalk.vercel.app",
      description:
        "An AI-powered real-time chat application built using the MERN stack and WebSockets. SynTalk features mood-aware AI summaries, Google OAuth login, room-based chat with QR code access, and dynamic visual feedback based on conversation behavior.",
      languages: [
        "React",
        "Node.js",
        "MongoDB",
        "Socket.io",
        "AI",
        "OAuth",
        "QR Code",
      ],
    },
    {
      title: "Treshop",
      thumbnail: "/assets/images/project/treshop.png",
      accessUrl: "https://treshop.vercel.app",
      description:
        "A modern e-commerce platform built with React, featuring seamless single-page navigation, smart auto-correct search, a personalized AI chatbot, and secure in-built payments via Razorpay.",
      languages: ["React", "JavaScript", "AI", "Chatbot", "Razorpay", "CSS"],
    },
    {
      title: "Notely",
      thumbnail: "/assets/images/project/diary.jpeg",
      accessUrl: "https://theajthakur.github.io/notely",
      description:
        "A privacy-focused diary and to-do app built with ReactJS. It supports smart password protection, local backups, and offline data via LocalStorage.",
      languages: ["ReactJS", "JavaScript", "LocalStorage"],
    },
    {
      title: "QuickLookup",
      thumbnail: "/assets/images/project/QuickLookup.png",
      accessUrl: "https://galgotia.vercel.app",
      description:
        "A fast and intuitive React app for searching student details with live dropdown suggestions from a local JSON dataset. Displays full info on selection.",
      languages: ["React", "JavaScript", "JSON", "CSS"],
    },
    {
      title: "Instant PNR",
      thumbnail: "/assets/images/project/pnr-fetcher.jpg",
      accessUrl: "https://theajthakur.github.io/PNR_Frontend",
      description:
        "An educational app that scrapes IRCTC PNR status in real-time using Puppeteer and OCR to bypass captchas.",
      languages: ["Node.js", "Puppeteer", "OCR", "JavaScript"],
    },
  ];

  return (
    <div
      className={`container project-section mt-5 ${
        isVisible ? "animate__animated animate__fadeInUp" : ""
      }`}
      ref={divRef}
    >
      {isVisible ? (
        <>
          <h2 className="text-center border-top py-3" id="projects">
            Projects
          </h2>
          <div className="projects-cards">
            <div className="row justify-content-center  animate__animated animate__fadeIn animate__delay-1s">
              {projects.map((project, index) => (
                <div
                  className={`col-sm-12 col-md-6 col-lg-4 mb-5 animate__animated ${
                    index % 2 ? "animate__fadeInUp" : "animate__fadeInDown"
                  } animate__delay-1s`}
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
              ))}
            </div>
          </div>
        </>
      ) : (
        <div style={{ height: 500 }}></div>
      )}
    </div>
  );
}
