"use client";
import React from "react";
import { Skeleton, configureBoneyard } from "boneyard-js/react";

configureBoneyard({
  animate: "pulse",
  stagger: true,
  transition: true,
});

export function ProjectCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-5 space-y-4 animate-pulse">
      <div className="h-44 w-full bg-muted/70 rounded-xl" />
      <div className="flex justify-between items-center">
        <div className="h-5 w-24 bg-muted/80 rounded-full" />
        <div className="h-4 w-16 bg-muted/60 rounded" />
      </div>
      <div className="h-6 w-3/4 bg-muted/80 rounded-md" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-muted/60 rounded" />
        <div className="h-4 w-5/6 bg-muted/60 rounded" />
      </div>
      <div className="flex gap-2 pt-2 border-t border-border/40">
        <div className="h-5 w-14 bg-muted/70 rounded-full" />
        <div className="h-5 w-16 bg-muted/70 rounded-full" />
        <div className="h-5 w-12 bg-muted/70 rounded-full" />
      </div>
    </div>
  );
}

export function ProjectsGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 space-y-4 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="h-4 w-28 bg-muted/70 rounded-md" />
      </div>
      <div className="h-7 w-2/3 bg-muted/80 rounded-md" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-muted/60 rounded" />
        <div className="h-4 w-4/5 bg-muted/60 rounded" />
      </div>
      <div className="flex justify-between items-center pt-3 border-t border-border/40">
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-muted/70 rounded-full" />
          <div className="h-5 w-20 bg-muted/70 rounded-full" />
        </div>
        <div className="h-8 w-24 bg-muted/60 rounded-lg" />
      </div>
    </div>
  );
}

export function BlogsListSkeleton({ count = 4 }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DashboardBlogItemSkeleton() {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-5 flex flex-col md:flex-row justify-between gap-4 animate-pulse">
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-4 w-24 bg-muted/70 rounded" />
          <div className="h-4 w-32 bg-muted/60 rounded" />
        </div>
        <div className="h-6 w-1/2 bg-muted/80 rounded-md" />
        <div className="h-4 w-3/4 bg-muted/60 rounded" />
        <div className="flex gap-2 pt-2 border-t border-border/40">
          <div className="h-5 w-16 bg-muted/70 rounded-full" />
          <div className="h-5 w-14 bg-muted/70 rounded-full" />
        </div>
      </div>
      <div className="h-8 w-8 bg-muted/70 rounded-lg self-end md:self-center" />
    </div>
  );
}

export function DashboardBlogsSkeleton({ count = 5 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <DashboardBlogItemSkeleton key={i} />
      ))}
    </div>
  );
}

export function EditorPageSkeleton() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8 space-y-8 max-w-7xl mx-auto animate-pulse">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-muted/80 rounded-md" />
          <div className="h-4 w-48 bg-muted/60 rounded" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-20 bg-muted/70 rounded-lg" />
          <div className="h-10 w-28 bg-muted/80 rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border/50 bg-card p-6 space-y-6">
            <div className="h-10 w-full bg-muted/70 rounded-md" />
            <div className="h-24 w-full bg-muted/60 rounded-md" />
            <div className="h-96 w-full bg-muted/70 rounded-xl" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-xl border border-border/50 bg-card p-6 space-y-4">
            <div className="h-10 w-full bg-muted/70 rounded-md" />
            <div className="h-10 w-full bg-muted/70 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardTimelineItemSkeleton() {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-5 flex items-start gap-4 animate-pulse">
      <div className="h-9 w-9 rounded-lg bg-muted/70 shrink-0 mt-0.5" />
      <div className="flex-1 space-y-2.5">
        <div className="flex items-center gap-3">
          <div className="h-5 w-20 bg-muted/80 rounded-full" />
          <div className="h-4 w-28 bg-muted/60 rounded" />
        </div>
        <div className="h-5 w-2/5 bg-muted/70 rounded-md" />
        <div className="h-4 w-full bg-muted/60 rounded" />
        <div className="h-4 w-4/5 bg-muted/60 rounded" />
      </div>
      <div className="flex gap-1 shrink-0">
        <div className="h-7 w-14 bg-muted/60 rounded-md" />
        <div className="h-7 w-7 bg-muted/60 rounded-md" />
      </div>
    </div>
  );
}

export function DashboardTimelinesSkeleton({ count = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <DashboardTimelineItemSkeleton key={i} />
      ))}
    </div>
  );
}

export function BoneyardSkeleton({ loading, children, fallback, name, className }) {
  return (
    <Skeleton loading={loading} name={name} fallback={fallback} className={className}>
      {children}
    </Skeleton>
  );
}
