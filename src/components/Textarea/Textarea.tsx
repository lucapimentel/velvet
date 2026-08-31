import type { TextareaHTMLAttributes } from "react";
import { cn } from "../../cn";
import styles from "./Textarea.module.css";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, rows = 4, ...rest }: TextareaProps) {
  return <textarea rows={rows} className={cn(styles.textarea, className)} {...rest} />;
}
