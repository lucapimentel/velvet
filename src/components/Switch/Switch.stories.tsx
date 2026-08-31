import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = { title: "Switch", component: Switch };
export default meta;

export const States: StoryObj<typeof Switch> = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      <Switch label="Memoise optimiser runs" defaultChecked />
      <Switch label="Stream progress over SSE" />
      <Switch label="Export to S3 on completion" disabled />
    </div>
  ),
};
