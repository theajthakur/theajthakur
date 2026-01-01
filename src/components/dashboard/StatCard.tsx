import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  active = false,
}) {
  return (
    <Card
      className={`hover:border-primary transition-all border-2 relative gap-0 ${
        active
          ? "bg-linear-to-br from-primary to-primary/70"
          : "hover:bg-linear-to-br from-primary/20 to-transparent"
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-medium ${active && "text-white"}`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={"py-2"}>
        <div className={`text-2xl font-bold ${active && "text-white"}`}>
          {value}
        </div>
        <p
          className={`text-xs text-muted-foreground ${active && "text-white"}`}
        >
          {change}
        </p>
      </CardContent>
      <div className="absolute right-4">
        {Icon && (
          <Icon
            className={`h-20 w-20 ${
              active ? "opacity-10" : "opacity-10 text-primary"
            }`}
          />
        )}
      </div>
    </Card>
  );
}
