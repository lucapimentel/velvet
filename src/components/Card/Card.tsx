import type { HTMLAttributes } from "react";
import { cn } from "../../cn";
import styles from "./Card.module.css";

export type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...rest }: CardProps) {
  return <div className={cn(styles.card, className)} {...rest} />;
}
