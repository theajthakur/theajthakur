// ─────────────────────────────────────────────────────────────
// Pure constants — NO server imports. Safe to use in client components.
// ─────────────────────────────────────────────────────────────

export type TimelineIcon =
  | "Globe"
  | "Github"
  | "Rocket"
  | "Award"
  | "MapPin"
  | "Calendar"
  | "ShoppingCart"
  | "Server"
  | "Cpu"
  | "Star";

export const TIMELINE_ICONS: TimelineIcon[] = [
  "Globe",
  "Github",
  "Rocket",
  "Award",
  "MapPin",
  "Calendar",
  "ShoppingCart",
  "Server",
  "Cpu",
  "Star",
];

export const DEFAULT_ICON: TimelineIcon = "Globe";
