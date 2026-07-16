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
  Server,
  Cpu,
} from "lucide-react";

export function MyTimeLine() {
  const data = [
    {
      title: "2023",
      content: (
        <div
          key="timeline-2023"
          className="p-5 sm:p-6 bg-card/25 border border-border/40 rounded-2xl backdrop-blur-xs shadow-xs hover:border-primary/55 hover:bg-card/35 transition-all duration-300 max-w-2xl w-full space-y-3"
        >
          <h3 className="flex items-center gap-3 font-heading font-semibold text-primary text-xl sm:text-2xl">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <Github className="w-5 h-5" />
            </div>
            Core PHP Developer
          </h3>
          <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
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
          key="timeline-jan-2024"
          className="p-5 sm:p-6 bg-card/25 border border-border/40 rounded-2xl backdrop-blur-xs shadow-xs hover:border-primary/55 hover:bg-card/35 transition-all duration-300 max-w-2xl w-full space-y-3"
        >
          <h3 className="flex items-center gap-3 font-heading font-semibold text-primary text-xl sm:text-2xl">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            First International Client
          </h3>
          <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
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
          key="timeline-may-2024"
          className="p-5 sm:p-6 bg-card/25 border border-border/40 rounded-2xl backdrop-blur-xs shadow-xs hover:border-primary/55 hover:bg-card/35 transition-all duration-300 max-w-2xl w-full space-y-3"
        >
          <h3 className="flex items-center gap-3 font-heading font-semibold text-primary text-xl sm:text-2xl">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <Rocket className="w-5 h-5" />
            </div>
            Learning Backend
          </h3>
          <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
            Started learning <b>Node.js</b> and <b>Express.js</b>. Built a{" "}
            <b>URL Shortener</b> that tracks clicks, visit times, and user
            activity.
          </p>
        </div>
      ),
    },
    {
      title: "Oct, 2024",
      content: (
        <div
          key="timeline-oct-2024"
          className="p-5 sm:p-6 bg-card/25 border border-border/40 rounded-2xl backdrop-blur-xs shadow-xs hover:border-primary/55 hover:bg-card/35 transition-all duration-300 max-w-2xl w-full space-y-3"
        >
          <h3 className="flex items-center gap-3 font-heading font-semibold text-primary text-xl sm:text-2xl">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <Rocket className="w-5 h-5" />
            </div>
            ReactJS & Hackathon
          </h3>
          <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
            Learned <b>ReactJS</b> and created <b>TextUtils</b>. On{" "}
            <b>4 October</b>, built <b>ResQ</b> - a Disaster Management App for
            a hackathon, became <b>Runner Up</b> 🥈.
          </p>
        </div>
      ),
    },
    {
      title: "Nov, 2024",
      content: (
        <div
          key="timeline-nov-2024"
          className="p-5 sm:p-6 bg-card/25 border border-border/40 rounded-2xl backdrop-blur-xs shadow-xs hover:border-primary/55 hover:bg-card/35 transition-all duration-300 max-w-2xl w-full space-y-3"
        >
          <h3 className="flex items-center gap-3 font-heading font-semibold text-primary text-xl sm:text-2xl">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            SocialGram & Canada Client
          </h3>
          <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
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
          key="timeline-feb-2025"
          className="p-5 sm:p-6 bg-card/25 border border-border/40 rounded-2xl backdrop-blur-xs shadow-xs hover:border-primary/55 hover:bg-card/35 transition-all duration-300 max-w-2xl w-full space-y-3"
        >
          <h3 className="flex items-center gap-3 font-heading font-semibold text-primary text-xl sm:text-2xl">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            PocketGPS
          </h3>
          <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
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
          key="timeline-apr-2025"
          className="p-5 sm:p-6 bg-card/25 border border-border/40 rounded-2xl backdrop-blur-xs shadow-xs hover:border-primary/55 hover:bg-card/35 transition-all duration-300 max-w-2xl w-full space-y-3"
        >
          <h3 className="flex items-center gap-3 font-heading font-semibold text-primary text-xl sm:text-2xl">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            UP Board Result App
          </h3>
          <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
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
          key="timeline-may-2025"
          className="p-5 sm:p-6 bg-card/25 border border-border/40 rounded-2xl backdrop-blur-xs shadow-xs hover:border-primary/55 hover:bg-card/35 transition-all duration-300 max-w-2xl w-full space-y-3"
        >
          <h3 className="flex items-center gap-3 font-heading font-semibold text-primary text-xl sm:text-2xl">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
            Treshop & PNR Tracker
          </h3>
          <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
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
          key="timeline-june-2025"
          className="p-5 sm:p-6 bg-card/25 border border-border/40 rounded-2xl backdrop-blur-xs shadow-xs hover:border-primary/55 hover:bg-card/35 transition-all duration-300 max-w-2xl w-full space-y-3"
        >
          <h3 className="flex items-center gap-3 font-heading font-semibold text-primary text-xl sm:text-2xl">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            Notely App
          </h3>
          <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
            Created <b>Notely</b>, a secure offline-first diary and to-do app
            using <b>ReactJS</b> - no database or server, keeping user data
            private.
          </p>
        </div>
      ),
    },
    {
      title: "Aug, 2025",
      content: (
        <div
          key="timeline-aug-2025"
          className="p-5 sm:p-6 bg-card/25 border border-border/40 rounded-2xl backdrop-blur-xs shadow-xs hover:border-primary/55 hover:bg-card/35 transition-all duration-300 max-w-2xl w-full space-y-3"
        >
          <h3 className="flex items-center gap-3 font-heading font-semibold text-primary text-xl sm:text-2xl">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <Rocket className="w-5 h-5" />
            </div>
            VIJSTACK Launch
          </h3>
          <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
            Launched my agency <b>VIJSTACK</b> and its website:{" "}
            <a
              href="https://vijstack.com"
              target="_blank"
              className="text-primary underline hover:text-secondary transition-colors duration-200"
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
      title: "Mar 2026",
      content: (
        <div
          key="timeline-mar-2026"
          className="p-5 sm:p-6 bg-card/25 border border-border/40 rounded-2xl backdrop-blur-xs shadow-xs hover:border-primary/55 hover:bg-card/35 transition-all duration-300 max-w-2xl w-full space-y-3"
        >
          <h3 className="flex items-center gap-3 font-heading font-semibold text-primary text-xl sm:text-2xl">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            Backend Engineering
          </h3>
          <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
            Focused on building scalable backend applications by learning and
            working with <b>NestJS</b>, <b>PostgreSQL</b>, <b>Redis</b>, and{" "}
            <b>BullMQ</b>. Built production-ready APIs, authentication systems,
            caching layers, background job queues, and scalable server-side
            architectures.
          </p>
        </div>
      ),
    },
    {
      title: "Jun 2026",
      content: (
        <div
          key="timeline-jun-2026"
          className="p-5 sm:p-6 bg-card/25 border border-border/40 rounded-2xl backdrop-blur-xs shadow-xs hover:border-primary/55 hover:bg-card/35 transition-all duration-300 max-w-2xl w-full space-y-3"
        >
          <h3 className="flex items-center gap-3 font-heading font-semibold text-primary text-xl sm:text-2xl">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            Entering the AI Era
          </h3>
          <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
            Learned <b>Generative AI</b>, <b>Retrieval-Augmented Generation
              (RAG)</b>, and <b>LangChain</b>. Built AI-powered applications using
            modern LLM workflows, tool calling, vector databases, and intelligent
            agents.
          </p>
        </div>
      ),
    },
    {
      title: "Present",
      content: (
        <div
          key="timeline-present"
          className="p-5 sm:p-6 bg-card/25 border border-border/40 rounded-2xl backdrop-blur-xs shadow-xs hover:border-primary/55 hover:bg-card/35 transition-all duration-300 max-w-2xl w-full space-y-3"
        >
          <h3 className="flex items-center gap-3 font-heading font-semibold text-primary text-xl sm:text-2xl">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            Learning & Growth
          </h3>
          <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
            Currently expanding my expertise in <b>AI Engineering</b>,{" "}
            <b>Web DevOps</b>, cloud infrastructure, and advanced backend
            architecture to build scalable, production-ready AI applications.
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
