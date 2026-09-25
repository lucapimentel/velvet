import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ToggleGroup } from "./ToggleGroup";

const meta: Meta<typeof ToggleGroup> = { title: "ToggleGroup", component: ToggleGroup };
export default meta;

type Story = StoryObj<typeof ToggleGroup>;

const DIFFICULTY = [
  { value: "easy", label: "Easy" },
  { value: "normal", label: "Normal" },
  { value: "hard", label: "Hard" },
];

function Demo() {
  const [value, setValue] = useState("normal");
  return <ToggleGroup aria-label="Difficulty" items={DIFFICULTY} value={value} onValueChange={setValue} />;
}

export const Difficulty: Story = { render: () => <Demo /> };

export const Timer: Story = {
  render: () => (
    <ToggleGroup
      aria-label="Timer"
      items={[{ value: "off", label: "Off" }, { value: "60", label: "60 s" }, { value: "90", label: "90 s" }]}
      value="off"
      onValueChange={() => {}}
    />
  ),
};
