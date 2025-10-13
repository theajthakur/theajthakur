import { Timeline } from "../ui/timeline";

import {
  Award,
  Globe,
  Github,
  MapPin,
  ShoppingCart,
  Calendar,
  Rocket,
  CheckCircle,
} from "lucide-react";
export function MyTimeLine() {
  const data = [
    {
      title: "2023",
      content: (
        <div
          key={"timeline-card"}
          className="space-y-2 text-sm text-foreground"
        >
          <h3 className="flex items-center gap-2 font-semibold text-primary text-2xl">
            <Github size={16} /> Core PHP Developer
          </h3>
          <p>
            Started web development using <b>Core PHP</b>, <b>jQuery</b>,{" "}
            <b>HTML</b>, <b>CSS</b>, <b>Bootstrap</b>, and <b>Font Awesome</b>{" "}
            to create responsive websites.
          </p>
        </div>
      ),
    },
    {
      title: "Jan, 2024",
      content: (
        <div
          key={"timeline-card"}
          className="space-y-2 text-sm text-foreground"
        >
          <h3 className="flex items-center gap-2 font-semibold text-primary text-2xl">
            <Globe size={16} /> First International Client
          </h3>
          <p>
            Got a client from <b>Germany</b> to build a{" "}
            <b>Fitness / Gym Website</b>, starting my professional freelance
            journey.
          </p>
        </div>
      ),
    },
    {
      title: "May, 2024",
      content: (
        <div
          key={"timeline-card"}
          className="space-y-2 text-sm text-foreground"
        >
          <h3 className="flex items-center gap-2 font-semibold text-primary text-2xl">
            <Rocket size={16} /> Learning Backend
          </h3>
          <p>
            Started learning <b>Node.js</b> and <b>Express.js</b>. Built a{" "}
            <b>URL Shortener</b> that tracks clicks, visit times, and user
            activity.
          </p>
        </div>
      ),
    },
    {
      title: "Sep, 2024",
      content: (
        <div
          key={"timeline-card"}
          className="space-y-2 text-sm text-foreground"
        >
          <h3 className="flex items-center gap-2 font-semibold text-primary text-2xl">
            <CheckCircle size={16} /> Project Completed
          </h3>
          <p>
            Delivered the <b>German client project</b> after <b>8 months</b> of
            development and maintenance.
          </p>
        </div>
      ),
    },
    {
      title: "Oct, 2024",
      content: (
        <div
          key={"timeline-card"}
          className="space-y-2 text-sm text-foreground"
        >
          <h3 className="flex items-center gap-2 font-semibold text-primary text-2xl">
            <Rocket size={16} /> ReactJS & Hackathon
          </h3>
          <p>
            Learned <b>ReactJS</b> and created <b>TextUtils</b>. On{" "}
            <b>4 October</b>, built <b>ResQ</b> — a Disaster Management App for
            a hackathon, became <b>Runner Up</b> 🥈.
          </p>
        </div>
      ),
    },
    {
      title: "Nov, 2024",
      content: (
        <div
          key={"timeline-card"}
          className="space-y-2 text-sm text-foreground"
        >
          <h3 className="flex items-center gap-2 font-semibold text-primary text-2xl">
            <Award size={16} /> SocialGram & Canada Client
          </h3>
          <p>
            Built <b>SocialGram</b>, a basic social platform for college
            students. Started working with a <b>Canadian client</b> for 9
            months.
          </p>
        </div>
      ),
    },
    {
      title: "Feb, 2025",
      content: (
        <div
          key={"timeline-card"}
          className="space-y-2 text-sm text-foreground"
        >
          <h3 className="flex items-center gap-2 font-semibold text-primary text-2xl">
            <MapPin size={16} /> PocketGPS
          </h3>
          <p>
            Created <b>PocketGPS</b>, an app that tracks and draws users’ paths,
            distance, and displacement while the phone is in the pocket.
          </p>
        </div>
      ),
    },
    {
      title: "Apr, 2025",
      content: (
        <div
          key={"timeline-card"}
          className="space-y-2 text-sm text-foreground"
        >
          <h3 className="flex items-center gap-2 font-semibold text-primary text-2xl">
            <Calendar size={16} /> UP Board Result App
          </h3>
          <p>
            Built an app to fetch <b>UP Board results</b> directly from the
            official website without CAPTCHA, making bulk scanning easy.
          </p>
        </div>
      ),
    },
    {
      title: "May, 2025",
      content: (
        <div
          key={"timeline-card"}
          className="space-y-2 text-sm text-foreground"
        >
          <h3 className="flex items-center gap-2 font-semibold text-primary text-2xl">
            <ShoppingCart size={16} /> Treshop & PNR Tracker
          </h3>
          <p>
            Developed <b>Treshop</b>, an e-commerce app with <b>ReactJS</b>,{" "}
            <b>NodeJS</b>, <b>ExpressJS</b>, and <b>Razorpay</b> integration.
            Built <b>IRCTC PNR Tracker</b> using automation (later
            discontinued).
          </p>
        </div>
      ),
    },
    {
      title: "June, 2025",
      content: (
        <div
          key={"timeline-card"}
          className="space-y-2 text-sm text-foreground"
        >
          <h3 className="flex items-center gap-2 font-semibold text-primary text-2xl">
            <Calendar size={16} /> Notely App
          </h3>
          <p>
            Created <b>Notely</b>, a secure offline-first diary and to-do app
            using <b>ReactJS</b> — no database or server, keeping user data
            private.
          </p>
        </div>
      ),
    },
    {
      title: "Aug, 2025",
      content: (
        <div
          key={"timeline-card"}
          className="space-y-2 text-sm text-foreground"
        >
          <h3 className="flex items-center gap-2 font-semibold text-primary text-2xl">
            <Rocket size={16} /> VIJSTACK Launch
          </h3>
          <p>
            Launched my agency <b>VIJSTACK</b> and its website:{" "}
            <a
              href="https://vijstack.com"
              target="_blank"
              className="text-primary underline"
            >
              vijstack.com
            </a>
            . Also learned <b>NextJS</b> and exploring advanced web
            technologies.
          </p>
        </div>
      ),
    },
    {
      title: "Present",
      content: (
        <div
          key={"timeline-card"}
          className="space-y-2 text-sm text-foreground"
        >
          <h3 className="flex items-center gap-2 font-semibold text-primary text-2xl">
            <Globe size={16} /> Learning & Growth
          </h3>
          <p>
            Currently learning <b>NestJS</b>, <b>AI</b>, and{" "}
            <b>Machine Learning</b>, continuously expanding skills and building
            new projects.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
