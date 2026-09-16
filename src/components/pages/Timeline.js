import { Timeline } from "../ui/timeline";

import {
  Globe,
  Github,
  Rocket,
  Award,
  MapPin,
  Calendar,
  ShoppingCart,
  Server,
  Cpu,
  Star,
} from "lucide-react";

const ICON_MAP = {
  Globe: Globe,
  Github: Github,
  Rocket: Rocket,
  Award: Award,
  MapPin: MapPin,
  Calendar: Calendar,
  ShoppingCart: ShoppingCart,
  Server: Server,
  Cpu: Cpu,
  Star: Star,
};

const DEFAULT_ICON = Globe;

/**
 * @param {{ timelines: import("@/lib/dashboard/timelines/TimelinesController").TimelineData[] }} props
 */
export function MyTimeLine({ timelines = [] }) {
  const data = timelines.map((entry) => {
    const IconComponent = ICON_MAP[entry.icon] ?? DEFAULT_ICON;

    return {
      title: entry.title,
      content: (
        <div
          key={entry.id}
          className="p-5 sm:p-6 bg-card/25 border border-border/40 rounded-2xl backdrop-blur-xs shadow-xs hover:border-primary/55 hover:bg-card/35 transition-all duration-300 max-w-2xl w-full space-y-3"
        >
          <h3 className="flex items-center gap-3 font-heading font-semibold text-primary text-xl sm:text-2xl">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <IconComponent className="w-5 h-5" />
            </div>
            {entry.heading}
          </h3>
          <p
            className="text-muted-foreground leading-relaxed text-xs sm:text-sm"
            dangerouslySetInnerHTML={{ __html: entry.description || "" }}
          />
        </div>
      ),
    };
  });

  return <Timeline data={data} />;
}
