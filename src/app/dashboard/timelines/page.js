import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function TimelinesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-heading">
            Timelines
          </h2>
          <p className="text-muted-foreground">Manage your timeline events.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="text-lg">Year 202{5 - i}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Timeline event details will appear here. This represents a
                significant milestone.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
