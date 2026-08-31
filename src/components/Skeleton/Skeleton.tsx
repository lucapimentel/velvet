import type { HTMLAttributes } from "react";
import { cn } from "../../cn";
import styles from "./Skeleton.module.css";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Any CSS length. Defaults to filling the container. */
  width?: string;
  height?: string;
}

export function Skeleton({ width, height = "1em", className, style, ...rest }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(styles.skeleton, className)}
      style={{ width, height, ...style }}
      {...rest}
    />
  );
}
