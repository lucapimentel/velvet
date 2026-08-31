import * as RadixSelect from "@radix-ui/react-select";
import { cn } from "../../cn";
import styles from "./Select.module.css";

export interface SelectItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  items: SelectItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
  className?: string;
}

/**
 * A flat list of options. Spreads a Field's control props onto the trigger.
 *
 * ponytail: flat `items` only. Grouped or custom-rendered options need the
 * compound Radix API exposed instead — do that when a lab actually asks.
 */
export function Select({
  items,
  placeholder = "Select…",
  className,
  id,
  disabled,
  name,
  value,
  defaultValue,
  onValueChange,
  ...aria
}: SelectProps) {
  return (
    <RadixSelect.Root value={value} defaultValue={defaultValue} onValueChange={onValueChange} disabled={disabled} name={name}>
      <RadixSelect.Trigger id={id} className={cn(styles.trigger, className)} {...aria}>
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className={styles.icon}>
          <ChevronDown />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content className={styles.content} position="popper" sideOffset={4}>
          <RadixSelect.Viewport className={styles.viewport}>
            {items.map((item) => (
              <RadixSelect.Item key={item.value} value={item.value} disabled={item.disabled} className={styles.item}>
                <RadixSelect.ItemText>{item.label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator className={styles.indicator}>
                  <Check />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="m5 13 4 4L19 7" />
  </svg>
);
