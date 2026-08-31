import * as RadixDialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { cn } from "../../cn";
import styles from "./Dialog.module.css";

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Element that opens the dialog. Omit when driving `open` yourself. */
  trigger?: ReactNode;
  title: string;
  description?: string;
  children?: ReactNode;
  /** Buttons, laid out at the end. */
  footer?: ReactNode;
  className?: string;
}

export function Dialog({ open, onOpenChange, trigger, title, description, children, footer, className }: DialogProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.overlay} />
        {/* Radix warns when a dialog has no description. Passing undefined is how you opt out. */}
        <RadixDialog.Content
          className={cn(styles.content, className)}
          {...(description ? {} : { "aria-describedby": undefined })}
        >
          <RadixDialog.Title className={styles.title}>{title}</RadixDialog.Title>
          {description && <RadixDialog.Description className={styles.description}>{description}</RadixDialog.Description>}
          {children && <div className={styles.body}>{children}</div>}
          {footer && <div className={styles.footer}>{footer}</div>}
          <RadixDialog.Close className={styles.close} aria-label="Close">
            <Cross />
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

export const DialogClose = RadixDialog.Close;

const Cross = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
