import { cn } from "../../cn";
import styles from "./Spinner.module.css";

export interface SpinnerProps {
  /** Announced to assistive tech. Set to null when a nearby element already says it. */
  label?: string | null;
  className?: string;
}

export function Spinner({ label = "Loading", className }: SpinnerProps) {
  return (
    <span
      className={cn(styles.spinner, className)}
      role={label === null ? undefined : "status"}
      aria-label={label ?? undefined}
      aria-hidden={label === null || undefined}
    />
  );
}
