import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight font-heading">
          Messages
        </h2>
        <p className="text-muted-foreground">Manage your messages and inbox.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
            <p className="text-muted-foreground">No recent messages.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
