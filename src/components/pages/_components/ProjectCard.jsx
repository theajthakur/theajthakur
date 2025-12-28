import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectCard({ project, index }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border-border/50 bg-card/50 hover:bg-card/80 transition-all duration-300 group hover:shadow-lg hover:border-primary/50">
        <div
          className={`flex flex-col ${
            isEven ? "md:flex-row" : "md:flex-row-reverse"
          } h-full`}
        >
          {/* Thumbnail Section */}
          <Link
            href={project.link}
            target="_blank"
            className="w-full md:w-1/2 relative overflow-hidden h-64 md:h-auto min-h-[300px] cursor-pointer"
          >
            <div className="absolute inset-0 bg-transparent group-hover:bg-black/0 transition-all duration-500 z-10" />
            {project.thumbnail && project.thumbnail[0] && (
              <Image
                src={`/assets/projects/${project.thumbnail[0]}`}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            )}
          </Link>

          {/* Content Section */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">
                {project.name}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Link href={project.link} target="_blank">
                  <ExternalLink className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed text-sm md:text-base">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8 mt-auto">
              {project.tags &&
                project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="px-3 py-1 font-normal bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
            </div>

            <Button className="w-full sm:w-auto self-start group/btn" asChild>
              <Link href={project.link} target="_blank">
                View Project
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
