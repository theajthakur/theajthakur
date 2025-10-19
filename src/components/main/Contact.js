"use client";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Input from "../ui/Input";
import { useState } from "react";
import Button from "../ui/Button";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    if (loading) return toast.error("Loading...", { duration: 5000 });
    setLoading(true);
    e.preventDefault();
    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) return toast.error("Something went wrong!");
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          message: "",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <section id="contact" className="py-16 bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-dark">
            Contact <span className="text-primary">Us</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Let’s connect and
            bring your ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-secondary/10 p-4 rounded-full">
                <Mail className="text-primary w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-dark">Email</h4>
                <p className="text-muted-foreground">
                  vijaysingh.handler@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-secondary/10 p-4 rounded-full">
                <Phone className="text-primary w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-dark">Phone</h4>
                <p className="text-muted-foreground">+91 96951 46906</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-secondary/10 p-4 rounded-full">
                <MapPin className="text-primary w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-dark">Location</h4>
                <p className="text-muted-foreground">Greater Noida, India</p>
              </div>
            </div>
          </div>

          <form
            className="bg-card p-8 rounded-2xl shadow-md space-y-5"
            onSubmit={handleSubmit}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
            </div>
            <Input
              type="number"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={(e) => {
                setFormData({ ...formData, mobile: e.target.value });
              }}
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
              }}
              className="w-full p-3 rounded-md border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            ></textarea>
            <Button className="w-full" onClick={handleSubmit}>
              {loading ? (
                "Sending...."
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </div>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
