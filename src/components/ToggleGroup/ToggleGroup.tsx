import * as Primitive from "@radix-ui/react-toggle-group";
import { cn } from "../../cn";
import styles from "./ToggleGroup.module.css";

export interface ToggleGroupItem {
  value: string;
  label: string;
}

export interface ToggleGroupProps {
  items: ToggleGroupItem[];
  value: string;
  onValueChange: (value: string) => void;
  /** Accessible label for the whole group. Required. */
  "aria-label": string;
  className?: string;
}

/** One button per option, exactly one selected. A required choice, never empty. */
export function ToggleGroup({ items, value, onValueChange, className, ...rest }: ToggleGroupProps) {
  return (
    <Primitive.Root
      type="single"
      value={value}
      // Radix hands back an empty string when the active item is clicked
      // again. This group is a required choice, so the empty value is ignored.
      onValueChange={(next) => next && onValueChange(next)}
      className={cn(styles.root, className)}
      {...rest}
    >
      {items.map((item) => (
        <Primitive.Item key={item.value} value={item.value} className={styles.item}>
          {item.label}
        </Primitive.Item>
      ))}
    </Primitive.Root>
  );
}
