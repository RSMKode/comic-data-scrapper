import { ClassValue } from "clsx";

export const colorVariants = {
  default:
    "text-foreground bg-background hover:bg-primary/95 hover:text-primary-foreground",
  primary:
    "border-primary bg-primary/70 text-primary-foreground hover:bg-primary hover:text-primary-foreground",
  half: "border-primary bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground",
  outline:
    "border-primary/30 bg-background hover:bg-primary/90 hover:text-primary-foreground",
  fill: "border-primary bg-primary text-primary-foreground hover:bg-primary/90",
  secondary:
    "border-primary/30 bg-secondary text-secondary-foreground hover:bg-foreground hover:text-background",
  secondary_half:
    "border-primary/30 bg-secondary/30 text-secondary-foreground hover:bg-secondary/75",
  secondary_outline:
    "border-primary/30 bg-background text-foreground hover:bg-secondary/90 hover:text-secondary-foreground",
  secondary_fill:
    "border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/85",
  ghost:
    "border-transparent hover:bg-accent hover:text-accent-foreground shadow-none",
  link: "border-transparent text-primary underline-offset-4 hover:underline backdrop-blur-none",
  color:
    "bg-accent-primary/70 text-accent-primary-foreground hover:bg-accent-primary hover:text-accent-primary-foreground",
  color_half:
    "bg-accent-primary/30 text-foreground hover:border-accent-primary hover:bg-accent-primary/75 hover:text-accent-primary-foreground",
  color_fill:
    "bg-accent-primary text-accent-primary-foreground hover:bg-accent-primary/80 hover:text-accent-primary-foreground",
  color_outline:
    "border-accent-primary bg-background/30 text-accent-primary hover:bg-accent-primary hover:text-accent-primary-foreground",
  color_outline_half:
    "border-accent-primary bg-accent-primary/15 text-accent-primary hover:bg-accent-primary hover:text-accent-primary-foreground",
  color_ghost:
    "border-transparent hover:bg-accent-primary/80 hover:text-accent-primary-foreground",
  color_link:
    "border-transparent text-accent-primary underline-offset-4 hover:underline",
  success_fill:
    "bg-success-background text-foreground hover:bg-success/80 hover:text-success-foreground border-success",
  danger_fill:
    "bg-danger-background text-foreground hover:bg-danger/80 hover:text-danger-foreground border-danger",
  warning_fill:
    "bg-warning-background text-foreground hover:bg-warning/80 hover:text-warning-foreground border-warning",
  notice_fill:
    "bg-notice-background text-foreground hover:bg-notice/80 hover:text-notice-foreground border-notice",
  notice:
    "border-notice bg-notice-background text-foreground hover:bg-foreground hover:text-background",
} as const;
