import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Autocomplete, type AutocompleteOption } from "./Autocomplete";

const ITEMS: AutocompleteOption[] = [
  { value: "manta_style", label: "Manta Style" },
  { value: "heart_of_tarrasque", label: "Heart of Tarrasque" },
  { value: "black_king_bar", label: "Black King Bar" },
  { value: "scythe_of_vyse", label: "Scythe of Vyse" },
];

const meta: Meta<typeof Autocomplete> = { title: "Autocomplete", component: Autocomplete };
export default meta;

type Story = StoryObj<typeof Autocomplete>;

/** The consumer filters. The component only shows what it is given. */
function Demo({ initial = "", invalid = false, options }: { initial?: string; invalid?: boolean; options?: AutocompleteOption[] }) {
  const [value, setValue] = useState(initial);
  const [picked, setPicked] = useState<string | null>(null);
  const filtered = options ?? ITEMS.filter((o) => o.label.toLowerCase().includes(value.toLowerCase()));
  return (
    <div style={{ maxWidth: 320 }}>
      <Autocomplete
        aria-label="Item"
        placeholder="Type an item name"
        value={value}
        onValueChange={setValue}
        options={value ? filtered : []}
        onSelect={(o) => { setPicked(o.label); setValue(o.label); }}
        invalid={invalid}
        emptyText="No item matches that"
      />
      {picked && <p style={{ marginTop: "1rem" }}>Picked: {picked}</p>}
    </div>
  );
}

export const Empty: Story = { render: () => <Demo /> };
export const WithOptions: Story = { render: () => <Demo initial="a" /> };
export const NoMatches: Story = { render: () => <Demo initial="zzz" options={[]} /> };
export const Invalid: Story = { render: () => <Demo initial="king bar" invalid /> };
