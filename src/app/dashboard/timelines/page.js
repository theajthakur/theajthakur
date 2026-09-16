"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, Clock } from "lucide-react";
import { toast } from "sonner";
import { BoneyardSkeleton, DashboardTimelinesSkeleton } from "@/components/common/Skeletons";
import { TimelineFormDialog } from "./_components/TimelineFormDialog";
import { TimelineEventCard } from "./_components/TimelineEventCard";
import type { TimelineData } from "@/lib/dashboard/timelines/TimelinesController";

export default function DashboardTimelinesPage() {
  const [timelines, setTimelines] = useState<TimelineData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<TimelineData | null>(null);

  const fetchTimelines = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/timelines");
      if (res.ok) {
        setTimelines(await res.json());
      } else {
        toast.error("Failed to load timelines");
      }
    } catch {
      toast.error("Error loading timelines");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTimelines();
  }, [fetchTimelines]);

  /* ── Handlers ─────────────────────────────────────────────── */

  const handleAdd = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  const handleEdit = (entry: TimelineData) => {
    setEditing(entry);
    setDialogOpen(true);
  };

  const handleSaved = (saved: TimelineData) => {
    setTimelines((prev) => {
      const exists = prev.find((t) => t.id === saved.id);
      const updated = exists
        ? prev.map((t) => (t.id === saved.id ? saved : t))
        : [saved, ...prev];
      // Re-sort by sort_date descending
      return [...updated].sort(
        (a, b) => new Date(b.sort_date).getTime() - new Date(a.sort_date).getTime()
      );
    });
  };

  const handleDelete = async (id: string, heading: string) => {
    if (!confirm(`Delete "${heading}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/timelines/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTimelines((prev) => prev.filter((t) => t.id !== id));
        toast.success("Timeline entry deleted");
      } else {
        toast.error("Failed to delete entry");
      }
    } catch {
      toast.error("Error deleting entry");
    }
  };

  /* ── Render ───────────────────────────────────────────────── */

  return (
    <div className="space-y-6 py-6 font-primary">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-heading font-bold text-foreground truncate">
            Timelines
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Manage your journey milestones — newest first on the homepage.
          </p>
        </div>
        <Button size="sm" onClick={handleAdd} className="shrink-0">
          <PlusIcon className="mr-1.5 h-4 w-4" />
          Add Entry
        </Button>
      </div>

      {/* List */}
      <BoneyardSkeleton
        loading={isLoading}
        name="dashboard-timelines"
        fallback={<DashboardTimelinesSkeleton count={6} />}
      >
        {timelines.length > 0 ? (
          <div className="space-y-3">
            {timelines.map((entry) => (
              <TimelineEventCard
                key={entry.id}
                entry={entry}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border rounded-xl border-dashed border-border/60 p-8">
            <div className="bg-muted/50 p-4 rounded-full">
              <Clock className="h-8 w-8 text-muted-foreground/60" />
            </div>
            <div className="space-y-1">
              <p className="text-base font-medium text-foreground">No timeline entries yet</p>
              <p className="text-muted-foreground text-sm">
                Add your first milestone to get started.
              </p>
            </div>
            <Button size="sm" onClick={handleAdd}>
              <PlusIcon className="mr-1.5 h-4 w-4" />
              Add First Entry
            </Button>
          </div>
        )}
      </BoneyardSkeleton>

      {/* Dialog */}
      <TimelineFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSaved={handleSaved}
        initial={editing}
      />
    </div>
  );
}
