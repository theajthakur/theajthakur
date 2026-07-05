import { Search, X } from "lucide-react";

export default function ProjectSearch({ value, onChange, onOpenModal }) {
  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <div className="relative group">
        <button
          onClick={onOpenModal}
          className="w-full text-left relative flex items-center pl-10 pr-10 h-12 bg-card/15 border border-border/45 hover:border-primary/55 focus:border-primary/55 transition-all duration-300 rounded-xl cursor-pointer text-sm font-heading"
        >
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4.5 w-4.5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          {value ? (
            <span className="text-foreground font-medium">
              Filtered by: <span className="text-primary font-semibold">"{value}"</span>
            </span>
          ) : (
            <span className="text-muted-foreground">Search projects...</span>
          )}
          
          {!value && (
            <div className="absolute right-3 hidden sm:flex items-center gap-1 bg-muted px-1.5 py-0.5 rounded border border-border text-[10px] font-mono font-medium text-muted-foreground">
              <span>⌘</span>K
            </div>
          )}
        </button>
        {value && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/50 transition-all cursor-pointer z-10"
            title="Clear filter"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
