"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { toast } from "sonner";
import { TIMELINE_ICONS, DEFAULT_ICON } from "@/lib/dashboard/timelines/timelines-config";
import type { TimelineIcon } from "@/lib/dashboard/timelines/timelines-config";
import type { TimelineData } from "@/lib/dashboard/timelines/TimelinesController";

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

interface TimelineFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSaved: (entry: TimelineData) => void;
  initial?: TimelineData | null;
}

const empty = (): TimelineData => ({
  title: "",
  heading: "",
  description: "",
  icon: DEFAULT_ICON,
  sort_date: new Date().toISOString().split("T")[0],
});

export function TimelineFormDialog({
  open,
  onClose,
  onSaved,
  initial,
}: TimelineFormDialogProps) {
  const isEdit = !!initial?.id;
  const [form, setForm] = useState<TimelineData>(initial ?? empty());
  const [saving, setSaving] = useState(false);

  // Sync form when initial changes (edit vs create)
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    } else {
      setForm(initial ?? empty());
    }
  };

  // Keep form in sync when dialog is re-opened with new initial value
  useState(() => {
    setForm(initial ?? empty());
  });

  const set = (field: keyof TimelineData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.heading.trim() || !form.sort_date) {
      toast.error("Title, heading and date are required.");
      return;
    }

    setSaving(true);
    try {
      const url = isEdit ? `/api/timelines/${initial!.id}` : "/api/timelines";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save");
      }

      const saved = await res.json();
      toast.success(isEdit ? "Timeline updated!" : "Timeline entry added!");
      onSaved(saved);
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading">
            {isEdit ? "Edit Timeline Entry" : "Add Timeline Entry"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-1">
          {/* Title + sort_date row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="tl-title">Display Title *</Label>
              <Input
                id="tl-title"
                placeholder="e.g. Jan, 2024"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tl-sort-date">Sort Date *</Label>
              <Input
                id="tl-sort-date"
                type="date"
                value={form.sort_date}
                onChange={(e) => set("sort_date", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Heading + icon row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="tl-heading">Heading *</Label>
              <Input
                id="tl-heading"
                placeholder="e.g. First International Client"
                value={form.heading}
                onChange={(e) => set("heading", e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>Icon</Label>
              <Select
                value={form.icon ?? DEFAULT_ICON}
                onValueChange={(v) => set("icon", v as TimelineIcon)}
              >
                <SelectTrigger id="tl-icon">
                  <SelectValue placeholder="Pick icon" />
                </SelectTrigger>
                <SelectContent>
                  {TIMELINE_ICONS.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      <span className="flex items-center gap-2">
                        {ICON_MAP[icon]}
                        {icon}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="tl-description">
              Description{" "}
              <span className="text-muted-foreground text-xs font-normal">
                (HTML supported: &lt;b&gt;, &lt;a href&gt;)
              </span>
            </Label>
            <Textarea
              id="tl-description"
              placeholder="Describe this milestone… HTML tags like <b>bold</b> are supported."
              value={form.description ?? ""}
              onChange={(e) => set("description", e.target.value)}
              rows={4}
              className="resize-none text-sm"
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : isEdit ? "Update" : "Add Entry"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
