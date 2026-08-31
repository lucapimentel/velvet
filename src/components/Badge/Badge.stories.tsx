import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = { title: "Badge", component: Badge };
export default meta;

export const Tones: StoryObj<typeof Badge> = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Badge>Draft</Badge>
      <Badge tone="accent">Running</Badge>
      <Badge tone="success">Complete</Badge>
      <Badge tone="warning">Stale</Badge>
      <Badge tone="danger">Failed</Badge>
    </div>
  ),
};
