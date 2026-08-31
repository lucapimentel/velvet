import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = { title: "Checkbox", component: Checkbox };
export default meta;

export const States: StoryObj<typeof Checkbox> = {
  render: () => (
    <div style={{ display: "grid", gap: "0.5rem" }}>
      <Checkbox label="Include digital inventory" defaultChecked />
      <Checkbox label="Include linear TV" />
      <Checkbox label="All dayparts" indeterminate />
      <Checkbox label="Locked by finance" defaultChecked disabled />
    </div>
  ),
};
