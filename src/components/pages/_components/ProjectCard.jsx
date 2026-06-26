import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectCard({ project, index }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
    >
      <div className="overflow-hidden border border-border/45 bg-card/15 backdrop-blur-md rounded-2xl hover:border-primary/55 hover:bg-card/25 transition-all duration-300 group hover:shadow-[0_8px_30px_rgba(0,139,155,0.06)] shadow-sm flex flex-col w-full">
        <div
          className={`flex flex-col ${
            isEven ? "md:flex-row" : "md:flex-row-reverse"
          } md:items-center w-full`}
        >
          {/* Cinema-Resolution Image Container (Exact 1672:941 Native Aspect Ratio) */}
          <Link
            href={project.link}
            target="_blank"
            className="w-full md:w-[52%] aspect-[1672/941] relative overflow-hidden cursor-pointer shrink-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent opacity-80 z-10 transition-opacity duration-300 group-hover:opacity-40" />
            {project.thumbnail && project.thumbnail[0] && (
              <Image
                src={`/assets/projects/${project.thumbnail[0]}`}
                alt={project.name}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            )}
          </Link>

          {/* Details Content Box */}
          <div className="flex-grow p-6 sm:p-8 flex flex-col justify-center">
            {/* Category Sub-Header & Index Tracker */}
            <div className="flex items-center justify-between mb-2 select-none">
              <span className="text-[10px] sm:text-xs tracking-[0.2em] font-heading text-primary font-bold uppercase">
                {project.category || "Freelance Project"}
              </span>
              <span className="text-sm font-heading font-bold text-primary/40 group-hover:text-primary transition-colors duration-300">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight mb-4">
              {project.name}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground mb-6 leading-relaxed text-xs sm:text-sm">
              {project.description}
            </p>

            {/* Technologies Badges / Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags &&
                project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="px-3 py-0.5 rounded-full font-heading font-medium tracking-wide text-[10px] bg-primary/5 text-primary border border-primary/10 transition-colors hover:bg-primary/15 hover:border-primary/20"
                  >
                    {tag}
                  </Badge>
                ))}
            </div>

            {/* Action Link */}
            <div className="flex items-center gap-4 mt-auto">
              <Link
                href={project.link}
                target="_blank"
                className="inline-flex items-center gap-2 font-heading font-bold text-xs sm:text-sm text-primary hover:text-secondary transition-colors group/link"
              >
                <span>EXPLORE PROJECT</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
