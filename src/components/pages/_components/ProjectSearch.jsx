import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ProjectSearch({ value, onChange }) {
  return (
    <div className="relative w-full max-w-md mx-auto mb-12">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>
        <Input
          type="text"
          placeholder="Search projects..."
          className="pl-10 h-12 bg-card/50 border-border/50 focus:border-primary/50 transition-all rounded-xl"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
