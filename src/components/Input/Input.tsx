import type { InputHTMLAttributes } from "react";
import { cn } from "../../cn";
import styles from "./Input.module.css";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...rest }: InputProps) {
  return <input className={cn(styles.input, className)} {...rest} />;
}
