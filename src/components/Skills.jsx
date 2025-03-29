import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./css/skills.css";

const skills = [
  { name: "HTML", icon: "bi bi-filetype-html" },
  { name: "CSS", icon: "bi bi-filetype-css" },
  { name: "JavaScript", icon: "bi bi-filetype-js" },
  { name: "React", icon: "bi bi-lightning-charge-fill" },
  { name: "Node.js", icon: "bi bi-server" },
  { name: "MongoDB", icon: "bi bi-database" },
  { name: "Bootstrap", icon: "bi bi-bootstrap-fill" },
  { name: "Git", icon: "bi bi-git" },
  { name: "Express.js", icon: "bi bi-code-slash" },
  { name: "MySQL", icon: "bi bi-database-fill" },
  { name: "Python", icon: "bi bi-code" },
  { name: "jQuery", icon: "bi bi-box" },
  { name: "Animate.css", icon: "bi bi-stars" },
  { name: "Font Awesome", icon: "bi bi-brush" },
  { name: "Google Maps API", icon: "bi bi-map" },
  { name: "EJS", icon: "bi bi-file-earmark-code" },
  { name: "Next.js", icon: "bi bi-globe" },
  { name: "C++ (DSA)", icon: "bi bi-cpu" },
  { name: "MERN Stack", icon: "bi bi-stack" },
];

const SkillCarousel = () => {
  return (
    <div className="container skill-section">
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
    </div>
  );
};

export default SkillCarousel;
