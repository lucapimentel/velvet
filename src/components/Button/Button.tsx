import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../cn";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Render the single child instead of a button, keeping Velvet's styling. For links. */
  asChild?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  asChild = false,
  className,
  type,
  ...rest
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      // A slotted anchor must not carry a button's type attribute.
      {...(asChild ? {} : { type: type ?? "button" })}
      className={cn(styles.button, styles[variant], styles[size], className)}
      {...rest}
    />
  );
}
