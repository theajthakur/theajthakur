import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./css/skills.css";
import { useState } from "react";
import useIntersectionObserver from "../utils/useIntersectionObserver";

const skills = [
  { name: "HTML", icon: "bi bi-filetype-html" },
  { name: "CSS", icon: "bi bi-filetype-css" },
  { name: "JavaScript", icon: "bi bi-filetype-js" },
  { name: "MERN Stack", icon: "bi bi-stack" },
  { name: "Bootstrap", icon: "bi bi-bootstrap-fill" },
  { name: "Git", icon: "bi bi-git" },
  { name: "EJS", icon: "bi bi-file-earmark-code" },
  { name: "MySQL", icon: "bi bi-database-fill" },
  { name: "Python", icon: "bi bi-code" },
  { name: "jQuery", icon: "bi bi-box" },
  { name: "Animate.css", icon: "bi bi-stars" },
  { name: "Google Maps API", icon: "bi bi-map" },
  { name: "Razorpay", icon: "bi bi-credit-card" },
];

const SkillCarousel = () => {
  const [divRef, isVisible] = useIntersectionObserver({
    threshold: 1,
  });
  const [expandedSkill, setExpandedSkill] = useState(false);
  return (
    <div ref={divRef}>
      {isVisible ? (
        <div className="container skill-section animate__animated animate__fadeInUp">
          <h2 className="text-center border-top py-3">Skills</h2>
          <div className="max-w-4xl mx-auto py-10">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={4}
              autoplay={{ delay: 2000 }}
              loop
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {skills.map((skill, index) => (
                <SwiperSlide key={index} className="flex flex-col items-center">
                  <div className="d-inline-flex w-100 h-100 justify-content-center align-items-center">
                    <div className="skill-unit text-center">
                      <div className="skill-icon">
                        <i className={`${skill.icon} text-blue-600`}></i>
                      </div>
                      <p className="mt-2 skill-name">{skill.name}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <p>
            {" "}
            <a
              href="#"
              onClick={() => {
                setExpandedSkill(!expandedSkill);
              }}
            >
              {!expandedSkill ? "Show All Skills" : "Hide Skills"}
            </a>
          </p>
          {expandedSkill ? (
            <div className="skills-expanded">
              <div className="row justify-content-center">
                {skills.map((skill, index) => (
                  <div className="col-6 col-md-4 col-lg-3" key={index}>
                    <div className="skill-expanded-unit">
                      <div className="skill-expanded-icon">
                        <span className={skill.icon}></span>
                      </div>
                      <div className="skill-expanded-name">
                        <p className="m-0">{skill.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div style={{ height: 300 }}></div>
      )}
    </div>
  );
};

export default SkillCarousel;
