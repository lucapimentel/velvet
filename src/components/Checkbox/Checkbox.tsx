import { type InputHTMLAttributes, useEffect, useRef } from "react";
import { cn } from "../../cn";
import styles from "./Checkbox.module.css";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  /** Neither checked nor unchecked. A DOM property, so it cannot be set as an attribute. */
  indeterminate?: boolean;
}

export function Checkbox({ label, indeterminate = false, className, ...rest }: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label className={cn(styles.root, className)}>
      <input ref={ref} type="checkbox" className={styles.input} {...rest} />
      <span className={styles.label}>{label}</span>
    </label>
  );
}
