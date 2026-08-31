import type { ReactNode } from "react";
import { cn } from "../../cn";
import styles from "./EmptyState.module.css";

export interface EmptyStateProps {
  title: string;
  description?: string;
  /** A single primary action. Two is a sign the empty state is doing too much. */
  action?: ReactNode;
  /** Decorative. Hidden from assistive tech — the title carries the meaning. */
  icon?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, icon, className }: EmptyStateProps) {
  return (
    <div className={cn(styles.empty, className)}>
      {icon && <div className={styles.icon} aria-hidden="true">{icon}</div>}
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
