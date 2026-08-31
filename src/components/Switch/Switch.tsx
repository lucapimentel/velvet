import type { InputHTMLAttributes } from "react";
import { cn } from "../../cn";
import styles from "./Switch.module.css";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "role"> {
  label: string;
}

/**
 * A checkbox wearing `role="switch"`. There is no native switch element, but a
 * checkbox with that role is the documented ARIA pattern and keeps the browser's
 * keyboard handling, form participation and label association for free.
 */
export function Switch({ label, className, ...rest }: SwitchProps) {
  return (
    <label className={cn(styles.root, className)}>
      <input type="checkbox" role="switch" className={styles.input} {...rest} />
      <span className={styles.track} aria-hidden="true"><span className={styles.thumb} /></span>
      <span className={styles.label}>{label}</span>
    </label>
  );
}
