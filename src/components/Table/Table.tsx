import type { TableHTMLAttributes } from "react";
import { cn } from "../../cn";
import styles from "./Table.module.css";

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Tightens row padding for dense grids. */
  density?: "comfortable" | "compact";
}

/**
 * Styles a plain table. Write real `thead`, `tbody`, `tr`, `th` and `td` inside —
 * there are no wrapper components to import and nothing to keep in sync.
 * The table scrolls horizontally inside its own wrapper rather than the page.
 */
export function Table({ density = "comfortable", className, ...rest }: TableProps) {
  return (
    <div className={styles.scroll}>
      <table className={cn(styles.table, styles[density], className)} {...rest} />
    </div>
  );
}
