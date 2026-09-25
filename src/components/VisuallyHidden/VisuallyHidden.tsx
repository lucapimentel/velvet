import { VisuallyHidden as Primitive } from "@radix-ui/react-visually-hidden";
import type { ReactNode } from "react";

export interface VisuallyHiddenProps {
  children: ReactNode;
  /** Use "polite" to announce a change without interrupting what is being read. */
  live?: "off" | "polite" | "assertive";
}

/** Text for assistive technology only. With `live`, changes are announced. */
export function VisuallyHidden({ children, live }: VisuallyHiddenProps) {
  return (
    <Primitive asChild>
      <span aria-live={live} aria-atomic={live ? true : undefined}>{children}</span>
    </Primitive>
  );
}
