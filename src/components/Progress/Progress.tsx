import * as Primitive from "@radix-ui/react-progress";
import { cn } from "../../cn";
import styles from "./Progress.module.css";

export interface ProgressProps {
  /** From 0 up to max. */
  value: number;
  max?: number;
  tone?: "accent" | "warning" | "danger";
  /** Accessible label. Required: the bar alone says nothing. */
  "aria-label": string;
  className?: string;
}

export function Progress({ value, max = 100, tone = "accent", className, ...rest }: ProgressProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <Primitive.Root value={value} max={max} className={cn(styles.root, className)} {...rest}>
      <Primitive.Indicator
        className={cn(styles.bar, styles[tone])}
        style={{ transform: "translateX(-" + (100 - pct) + "%)" }}
      />
    </Primitive.Root>
  );
}
