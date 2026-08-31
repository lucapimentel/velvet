import type { ReactNode } from "react";
import { cn } from "../../cn";
import styles from "./PageHeader.module.css";

export interface PageHeaderProps {
  title: string;
  description?: string;
  /** Buttons or a menu, aligned to the end. Wraps below the title on narrow screens. */
  actions?: ReactNode;
  /** Breadcrumb or back link, above the title. */
  above?: ReactNode;
  /** Heading level. Drop to h2 when the page already has an h1. */
  as?: "h1" | "h2";
  className?: string;
}

export function PageHeader({ title, description, actions, above, as: Heading = "h1", className }: PageHeaderProps) {
  return (
    <header className={cn(styles.header, className)}>
      {above}
      <div className={styles.row}>
        <div className={styles.text}>
          <Heading className={styles.title}>{title}</Heading>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </header>
  );
}
