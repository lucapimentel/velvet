import { useId, type ReactNode } from "react";
import { cn } from "../../cn";
import styles from "./Field.module.css";

/** The wiring a Field hands to whatever control it wraps. Spread it onto the control. */
export interface FieldControlProps {
  id: string;
  "aria-describedby": string | undefined;
  "aria-invalid": true | undefined;
}

export interface FieldProps {
  label: string;
  /** Helper text. Hidden from the accessible description while an error is showing. */
  hint?: string;
  /** Presence of an error marks the control invalid and announces the message. */
  error?: string;
  /** Overrides the generated id, for when the control's id is already fixed. */
  id?: string;
  className?: string;
  children: (control: FieldControlProps) => ReactNode;
}

export function Field({ label, hint, error, id, className, children }: FieldProps) {
  const generated = useId();
  const controlId = id ?? generated;
  const hintId = `${controlId}-hint`;
  const errorId = `${controlId}-error`;

  // An error replaces the hint in the description so screen readers lead with the problem.
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div className={cn(styles.field, className)}>
      <label className={styles.label} htmlFor={controlId}>{label}</label>
      {children({ id: controlId, "aria-describedby": describedBy, "aria-invalid": error ? true : undefined })}
      {hint && !error && <p className={styles.hint} id={hintId}>{hint}</p>}
      {error && <p className={styles.error} id={errorId} role="alert">{error}</p>}
    </div>
  );
}
