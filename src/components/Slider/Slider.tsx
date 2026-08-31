import type { InputHTMLAttributes } from "react";
import { cn } from "../../cn";
import styles from "./Slider.module.css";

export type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

/**
 * A native range input. Keyboard support, form participation and the value
 * announcement all come from the browser.
 *
 * ponytail: single thumb only. A two-thumb range needs Radix Slider — add it the
 * day a lab wants one.
 */
export function Slider({ className, ...rest }: SliderProps) {
  return <input type="range" className={cn(styles.slider, className)} {...rest} />;
}
