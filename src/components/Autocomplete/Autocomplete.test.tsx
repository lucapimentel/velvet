import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { Autocomplete } from "./Autocomplete";

const OPTIONS = [
  { value: "a", label: "Manta Style" },
  { value: "b", label: "Heart of Tarrasque" },
];

function Harness({ onSelect }: { onSelect: (v: string) => void }) {
  const [value, setValue] = useState("");
  return (
    <Autocomplete
      aria-label="Item"
      value={value}
      onValueChange={setValue}
      options={value ? OPTIONS : []}
      onSelect={(o) => onSelect(o.value)}
    />
  );
}

test("arrow keys move the active option and Enter selects it", () => {
  const picked: string[] = [];
  render(<Harness onSelect={(v) => picked.push(v)} />);
  const input = screen.getByRole("combobox");
  fireEvent.change(input, { target: { value: "a" } });
  expect(input.getAttribute("aria-expanded")).toBe("true");
  fireEvent.keyDown(input, { key: "ArrowDown" });
  expect(screen.getByRole("option", { name: "Heart of Tarrasque" }).getAttribute("aria-selected")).toBe("true");
  fireEvent.keyDown(input, { key: "Enter" });
  expect(picked).toEqual(["b"]);
});

test("Escape closes the list without selecting", () => {
  const picked: string[] = [];
  render(<Harness onSelect={(v) => picked.push(v)} />);
  const input = screen.getByRole("combobox");
  fireEvent.change(input, { target: { value: "a" } });
  fireEvent.keyDown(input, { key: "Escape" });
  expect(input.getAttribute("aria-expanded")).toBe("false");
  expect(picked).toEqual([]);
});
