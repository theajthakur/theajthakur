import useScript from "../utils/useScript";

export default function ContactPage() {
  const status = useScript("https://www.google.com/recaptcha/api.js");
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const formHandler = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (grecaptcha && grecaptcha.getResponse()) {
      console.log("Form submitted:", {
        name,
        email,
        message,
        captcha: grecaptcha.getResponse(),
      });
      alert("Form submitted successfully!");
    } else {
      alert("Please complete the reCAPTCHA.");
    }
  };
  return (
    <div className="container contact-page">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center my-4">Contact Me</h2>
          <form onSubmit={formHandler}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input type="text" className="form-control" id="name" required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
                required
              ></textarea>
            </div>
            <div className="row">
              <div className="col-sm-6 my-3">
                {status === "ready" ? (
                  <div className="g-recaptcha" data-sitekey={siteKey}></div>
                ) : (
                  <p>Loading reCAPTCHA...</p>
                )}
              </div>
              <div className="col-sm-6 text-center text-sm-end my-3">
                <button type="submit" className="btn btn-primary">
                  <span className="bi bi-send"></span>{" "}
                  <span className="ms-1">Send</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
