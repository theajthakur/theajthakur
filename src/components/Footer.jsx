import { useMode } from "../Context/ModeContext";
import useIntersectionObserver from "../utils/useIntersectionObserver";
import ContactPage from "./ContactPage";
import "./css/Footer.css";
export default function Footer() {
  const { mode } = useMode();
  const [divRef, isVisible] = useIntersectionObserver({ threshold: 0.9 });
  return (
    <div ref={divRef}>
      {isVisible ? (
        <div
          className={`footer-container animate__animated animate__rotateInDownLeft p-sm-5 p-3 ${
            mode === "light" ? "bg-light text-dark" : "bg-dark text-light"
          }`}
        >
          <div className="container">
            <div className="footer-content row align-items-center">
              <div className="col-sm-12 mb-5">
                <ContactPage />
              </div>
              <div className="col-sm-4 text-center text-sm-start">
                <p>© 2025 TheAjThakur. All rights reserved.</p>
              </div>
              <div className="col-sm-4 text-center">
                <p>
                  Made with{" "}
                  <span
                    className="bi bi-heart-fill"
                    style={{ color: "red" }}
                  ></span>{" "}
                  by TheAjThakur
                </p>
              </div>
              <div className="col-sm-4">
                <div className="social-icons justify-content-sm-end justify-content-center d-flex gap-2">
                  <a
                    href="https://instagram.com/aj_thakur_rock"
                    target="_blank"
                  >
                    <span className="bi bi-instagram"></span>
                  </a>
                  <a href="https://linkedin.com/in/theajthakur" target="_blank">
                    <span className="bi bi-linkedin"></span>
                  </a>
                  <a href="https://github.com/theajthakur" target="_blank">
                    <span className="bi bi-github"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ height: 500 }}></div>
      )}
    </div>
  );
}
