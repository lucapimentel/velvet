import type { InputHTMLAttributes } from "react";
import { cn } from "../../cn";
import styles from "./Radio.module.css";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

/**
 * Radios sharing a `name` are a group the browser already handles: arrow keys move
 * between them, tab enters and leaves. Wrap a group in `<fieldset><legend>` to give
 * it an accessible name — there is no wrapper component here because the platform
 * element does the job.
 */
export function Radio({ label, className, ...rest }: RadioProps) {
  return (
    <label className={cn(styles.root, className)}>
      <input type="radio" className={styles.input} {...rest} />
      <span className={styles.label}>{label}</span>
    </label>
  );
}
