import * as Primitive from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";
import { cn } from "../../cn";
import styles from "./Tooltip.module.css";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

/** Wrap the tree once. Radix requires the provider. */
export const TooltipProvider = Primitive.Provider;

/**
 * A label on hover and focus. It never replaces a label: an icon button still
 * needs its own `aria-label`.
 */
export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  return (
    <Primitive.Root>
      <Primitive.Trigger asChild>{children}</Primitive.Trigger>
      <Primitive.Portal>
        <Primitive.Content side={side} sideOffset={6} className={cn(styles.content, className)}>
          {content}
          <Primitive.Arrow className={styles.arrow} />
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
