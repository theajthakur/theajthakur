"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button-ui";
import { ArrowUpRight, Code2Icon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProjectsGrid() {
  const projects = [
    {
      name: "Market Gang",
      link: "https://viraldon.vercel.app/",
      description:
        "A modern marketing platform that helps brands analyse trends, reach target audiences, and optimise campaign performance through data-driven insights.",
      thumbnail: ["marketgang.png"],
    },
    {
      name: "SkillSwap",
      link: "https://skillswapgcet.vercel.app/",
      description:
        "A peer-to-peer skill-exchange platform that matches users based on their profiles, skillsets, and requirements, enabling them to learn directly from each other.",
      thumbnail: ["skillswap.png"],
    },
    {
      name: "Sewna",
      link: "https://sewna-chi.vercel.app/",
      description:
        "A collaborative hub connecting designers with clients, offering personalised design services, portfolio showcases, and seamless designer-client project interaction.",
      thumbnail: ["sewna_main.png", "sewna_1.png", "sewna_2.png"],
    },
    {
      name: "AgroVision",
      link: "https://agrovision-psi.vercel.app/",
      description:
        "A smart agriculture solution designed for an SIH problem statement from the Odisha government, predicting crop yields and optimising production using environmental and historical data.",
      thumbnail: ["agrovision.png"],
    },
  ];

  const imgSrc = (src) => {
    return `/assets/projects/${src}`;
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {projects.map((e) => (
        <motion.div
          key={e.name}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className="border-primary overflow-hidden rounded-xl pb-4">
            {e.thumbnail[0] && (
              <Image
                src={imgSrc(e.thumbnail[0])}
                alt={e.name}
                className="w-full h-52 object-cover"
                width={300}
                height={100}
              />
            )}

            <CardHeader>
              <CardTitle className="text-primary font-heading text-2xl">
                {e.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <p className="text-foreground text-sm leading-relaxed">
                {e.description}
              </p>

              {e.link && (
                <div className="flex gap-2 flex-col sm:flex-row">
                  <Button
                    variant="default"
                    asChild
                    className={"w-full sm:w-[50%]"}
                  >
                    <a href={e.link} target="_blank">
                      Code <Code2Icon size={18} />
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full sm:w-[50%]" asChild>
                    <a href={e.link} target="_blank">
                      Visit <ArrowUpRight size={18} />
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
