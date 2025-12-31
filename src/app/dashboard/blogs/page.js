import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function BlogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-heading">
            Blogs
          </h2>
          <p className="text-muted-foreground">Manage your blog posts.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>Blog Post Title {i + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                This is a summary of the blog post content. It gives a brief
                overview of what the post is about.
              </p>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
