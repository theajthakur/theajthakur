"use client";
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
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TimelineIcon, TimelineData } from "@/lib/dashboard/timelines/TimelinesController";

const ICON_MAP: Record<TimelineIcon, React.ReactNode> = {
  Globe: <Globe className="h-4 w-4" />,
  Github: <Github className="h-4 w-4" />,
  Rocket: <Rocket className="h-4 w-4" />,
  Award: <Award className="h-4 w-4" />,
  MapPin: <MapPin className="h-4 w-4" />,
  Calendar: <Calendar className="h-4 w-4" />,
  ShoppingCart: <ShoppingCart className="h-4 w-4" />,
  Server: <Server className="h-4 w-4" />,
  Cpu: <Cpu className="h-4 w-4" />,
  Star: <Star className="h-4 w-4" />,
};

const DEFAULT_ICON_COMPONENT = <Globe className="h-4 w-4" />;

interface TimelineEventCardProps {
  entry: TimelineData;
  onEdit: (entry: TimelineData) => void;
  onDelete: (id: string, heading: string) => void;
}

export function TimelineEventCard({ entry, onEdit, onDelete }: TimelineEventCardProps) {
  const iconNode = ICON_MAP[entry.icon as TimelineIcon] ?? DEFAULT_ICON_COMPONENT;

  return (
    <div className="group flex items-start gap-4 rounded-xl border border-border/50 bg-card p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-sm">
      {/* Icon */}
      <div className="shrink-0 mt-0.5 p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
        {iconNode}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
            {entry.title}
          </span>
          <span className="text-xs text-muted-foreground font-mono">{entry.sort_date}</span>
        </div>
        <p className="font-heading font-semibold text-sm text-foreground leading-snug">
          {entry.heading}
        </p>
        {entry.description && (
          <p
            className="text-xs text-muted-foreground leading-relaxed line-clamp-2"
            dangerouslySetInnerHTML={{ __html: entry.description }}
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs gap-1"
          onClick={() => onEdit(entry)}
        >
          <Edit className="h-3 w-3" />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => onDelete(entry.id!, entry.heading)}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
