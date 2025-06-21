import { useState } from "react";
import { notyf } from "../utils/notyf";
import useScript from "../utils/useScript";
import axios from "axios";

export default function ContactPage() {
  useScript("https://www.google.com/recaptcha/api.js");
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const apiURL = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const formHandler = async (event) => {
    event.preventDefault();
    if (isLoading) return notyf.error("Please wait....");
    setIsLoading(true);

    const { name, email, mobile, message } = formData;

    if (grecaptcha && grecaptcha.getResponse()) {
      if (!name || !email || !mobile || !message) {
        setIsLoading(false);
        return notyf.error("Please fill out the form correctly");
      }

      try {
        const response = await axios.post(`${apiURL}/feedback`, {
          ...formData,
          captcha: grecaptcha.getResponse(),
        });
        console.log("Feedback submitted:", response.data);
        notyf.success("Form submitted successfully!");
        setFormData({ name: "", email: "", mobile: "", message: "" });
        grecaptcha.reset();
      } catch (error) {
        notyf.error("Form submission failed!");
        console.error("Error submitting feedback:", error);
      }
    } else {
      notyf.error("Please complete the reCAPTCHA.");
    }
    setIsLoading(false);
  };

  return (
    <div className="container contact-page">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center my-4">Contact Me</h2>
          <form onSubmit={formHandler}>
            <div className="mb-3 animate__animated animate__fadeInLeft animate__delay-1s">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3 animate__animated animate__fadeInRight animate__delay-1s">
              <label htmlFor="mobile" className="form-label">
                Mobile Number
              </label>
              <input
                type="number"
                className="form-control"
                id="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3 animate__animated animate__fadeInLeft animate__delay-1s">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3 animate__animated animate__fadeInRight animate__delay-1s">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="row">
              <div className="col-sm-6 my-3 animate__animated animate__fadeInUp animate__delay-1s">
                <div className="g-recaptcha" data-sitekey={siteKey}></div>
              </div>
              <div className="col-sm-6 text-center text-sm-end my-3">
                <div className="hire-me-btn d-inline-flex animate__animated animate__fadeInUp animate__delay-1s">
                  <div>
                    <button className="codepen-button" disabled={isLoading}>
                      <span>
                        <i className="bi bi-send"></i>{" "}
                        {isLoading ? "Sending" : "Send"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
