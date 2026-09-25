import { useId, useRef, useState, type InputHTMLAttributes, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "../../cn";
import styles from "./Autocomplete.module.css";

export interface AutocompleteOption {
  /** Stable key. This is what comes back in onSelect. */
  value: string;
  /** Text shown to the user. */
  label: string;
  /** Optional node on the left: icon, flag, avatar. */
  media?: ReactNode;
}

export interface AutocompleteProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onSelect" | "value" | "onChange"> {
  value: string;
  onValueChange: (value: string) => void;
  /** Already filtered and ordered by the consumer. The component searches nothing. */
  options: AutocompleteOption[];
  onSelect: (option: AutocompleteOption) => void;
  /** Shown when there is text and no option. */
  emptyText?: string;
  invalid?: boolean;
}

/**
 * A text field with suggestions, following the ARIA combobox pattern.
 *
 * The one component that does not sit on a Radix primitive: Radix has no
 * combobox, and wrapping Popover around an input fights it for focus. See the
 * README.
 */
export function Autocomplete({
  value, onValueChange, options, onSelect,
  emptyText = "No matches", invalid, className, id, ...rest
}: AutocompleteProps) {
  const generated = useId();
  const inputId = id ?? generated;
  const listId = inputId + "-list";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const blurTimer = useRef<number | undefined>(undefined);

  const visible = open && options.length > 0;
  const showEmpty = open && value.length > 0 && options.length === 0;

  function commit(index: number) {
    const option = options[index];
    if (!option) return;
    onSelect(option);
    setOpen(false);
    setActive(0);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) return setOpen(true);
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((n) => (n + step + options.length) % options.length);
    } else if (event.key === "Enter" && visible) {
      event.preventDefault();
      commit(active);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className={cn(styles.root, className)}>
      <input
        {...rest}
        id={inputId}
        className={cn(styles.input, invalid && styles.invalid)}
        type="text"
        role="combobox"
        autoComplete="off"
        aria-expanded={visible}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={visible ? inputId + "-opt-" + active : undefined}
        aria-invalid={invalid || undefined}
        value={value}
        onChange={(e) => { onValueChange(e.target.value); setOpen(true); setActive(0); }}
        onKeyDown={onKeyDown}
        onFocus={() => setOpen(true)}
        // Clicking an option fires blur before click. The delay lets the click
        // land, and the list's mousedown cancels it.
        onBlur={() => { blurTimer.current = window.setTimeout(() => setOpen(false), 120); }}
      />

      <ul
        id={listId}
        role="listbox"
        className={cn(styles.list, !visible && styles.hidden)}
        onMouseDown={() => window.clearTimeout(blurTimer.current)}
      >
        {options.map((option, index) => (
          <li
            key={option.value}
            id={inputId + "-opt-" + index}
            role="option"
            aria-selected={index === active}
            className={cn(styles.option, index === active && styles.active)}
            onMouseEnter={() => setActive(index)}
            onClick={() => commit(index)}
          >
            {option.media && <span className={styles.media}>{option.media}</span>}
            <span className={styles.label}>{option.label}</span>
          </li>
        ))}
      </ul>

      {showEmpty && <div className={styles.empty}>{emptyText}</div>}
    </div>
  );
}
