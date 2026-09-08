import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Trash2,
  FolderKanban,
  ExternalLink,
  Github,
  Star,
  Edit,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Project {
  id: string;
  name: string;
  category?: string | null;
  slug: string;
  live_link?: string | null;
  github?: string | null;
  link?: string | null;
  description?: string | null;
  thumbnail?: string[] | null;
  tags?: string[] | null;
  featured?: boolean;
  created_at: string;
  updated_at: string;
}

interface DashboardProjectCardProps {
  project: Project;
  onDelete: (id: string, name: string) => void;
}

export function DashboardProjectCard({ project, onDelete }: DashboardProjectCardProps) {
  const router = useRouter();

  const rawThumbnail =
    Array.isArray(project.thumbnail) && project.thumbnail.length > 0
      ? project.thumbnail[0]?.trim()
      : null;
  const thumbnailSrc = rawThumbnail
    ? rawThumbnail.startsWith("http") || rawThumbnail.startsWith("/")
      ? rawThumbnail
      : `/assets/projects/${rawThumbnail}`
    : null;
  const tagsList = Array.isArray(project.tags) ? project.tags : [];

  return (
    <div
      className={cn(
        "group flex flex-col justify-between rounded-xl border border-border/50 bg-card overflow-hidden transition-all duration-200",
        "hover:shadow-md hover:border-border"
      )}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-[16/9] bg-muted/50 flex items-center justify-center overflow-hidden">
        {thumbnailSrc ? (
          <img
            src={thumbnailSrc}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <FolderKanban className="h-10 w-10 text-muted-foreground/30" />
        )}
        {project.featured && (
          <div className="absolute top-2 left-2 bg-amber-500 text-black px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 shadow">
            <Star className="h-2.5 w-2.5 fill-black" /> Featured
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Category + slug */}
        <div className="flex items-center justify-between gap-2 min-w-0">
          {project.category ? (
            <Badge variant="outline" className="text-[11px] border-primary/30 text-primary shrink-0">
              {project.category}
            </Badge>
          ) : (
            <span />
          )}
          <span className="text-[10px] font-mono text-muted-foreground truncate">
            /{project.slug}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-base font-heading font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer line-clamp-1 leading-snug"
          onClick={() => router.push(`/dashboard/projects/${project.slug}`)}
        >
          {project.name}
        </h3>

        {/* Description */}
        {project.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        )}

        {/* Tags — outline badges, scroll on overflow */}
        {tagsList.length > 0 && (
          <div className="flex flex-nowrap overflow-x-auto gap-1 pb-0.5 no-scrollbar">
            {tagsList.map((tag, i) => (
              <Badge
                key={i}
                variant="outline"
                className="text-[10px] py-0 px-1.5 shrink-0 font-normal border-border/60 text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-1 mt-auto border-t border-border/30">
          {/* External links */}
          <div className="flex items-center gap-1">
            {project.live_link && (
              <a
                href={project.live_link}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary p-1 transition-colors"
                title="Live Preview"
              >
                <Globe className="h-3.5 w-3.5" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary p-1 transition-colors"
                title="GitHub"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/dashboard/projects/${project.slug}`)}
              className="h-7 px-2 text-xs gap-1"
            >
              <Edit className="h-3 w-3" /> Edit
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreVertical className="h-3.5 w-3.5" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push(`/dashboard/projects/${project.slug}`)}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit Project</span>
                </DropdownMenuItem>
                {project.live_link && (
                  <DropdownMenuItem onClick={() => window.open(project.live_link!, "_blank")}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    <span>View Live</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => onDelete(project.id, project.name)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
