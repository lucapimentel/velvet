import * as RadixToast from "@radix-ui/react-toast";
import type { ReactNode } from "react";
import { cn } from "../../cn";
import styles from "./Toast.module.css";

export type ToastTone = "neutral" | "success" | "danger";

export interface ToastProviderProps {
  children: ReactNode;
  /** Milliseconds before a toast dismisses itself. */
  duration?: number;
}

/** Wrap the app once. Renders the viewport every Toast portals into. */
export function ToastProvider({ children, duration = 5000 }: ToastProviderProps) {
  return (
    <RadixToast.Provider duration={duration} swipeDirection="right">
      {children}
      <RadixToast.Viewport className={styles.viewport} />
    </RadixToast.Provider>
  );
}

export interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  tone?: ToastTone;
  /** A single action, rendered as a button. `altText` is what screen readers hear. */
  action?: { label: string; altText: string; onClick: () => void };
  className?: string;
}

/**
 * One controlled toast. The caller owns `open`.
 *
 * ponytail: no imperative `toast()` queue. Add a provider-level store the first
 * time a lab needs to fire one from outside React state.
 */
export function Toast({ open, onOpenChange, title, description, tone = "neutral", action, className }: ToastProps) {
  return (
    <RadixToast.Root open={open} onOpenChange={onOpenChange} className={cn(styles.toast, styles[tone], className)}>
      <RadixToast.Title className={styles.title}>{title}</RadixToast.Title>
      {description && <RadixToast.Description className={styles.description}>{description}</RadixToast.Description>}
      {action && (
        <RadixToast.Action asChild altText={action.altText}>
          <button type="button" className={styles.action} onClick={action.onClick}>{action.label}</button>
        </RadixToast.Action>
      )}
      <RadixToast.Close className={styles.close} aria-label="Dismiss">
        <Cross />
      </RadixToast.Close>
    </RadixToast.Root>
  );
}

const Cross = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
