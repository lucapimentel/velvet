import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = { title: "Progress", component: Progress };
export default meta;

type Story = StoryObj<typeof Progress>;

export const Tones: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", maxWidth: 320 }}>
      <Progress aria-label="Time left" value={75} />
      <Progress aria-label="Time left" value={35} tone="warning" />
      <Progress aria-label="Time left" value={10} tone="danger" />
    </div>
  ),
};

export const CustomMax: Story = {
  args: { "aria-label": "Time left", value: 42, max: 90 },
};
