import { type InputHTMLAttributes, useEffect, useRef } from "react";
import { cn } from "../../cn";
import styles from "./Checkbox.module.css";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  /** Neither checked nor unchecked. A DOM property, so it cannot be set as an attribute. */
  indeterminate?: boolean;
  /** Keeps the label for screen readers but takes it off the screen. For grid cells. */
  hideLabel?: boolean;
}

export function Checkbox({ label, indeterminate = false, hideLabel = false, className, ...rest }: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label className={cn(styles.root, className)}>
      <input ref={ref} type="checkbox" className={styles.input} {...rest} />
      <span className={cn(styles.label, hideLabel && styles.visuallyHidden)}>{label}</span>
    </label>
  );
}
