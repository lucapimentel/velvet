import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";
import { Badge } from "../Badge/Badge";

const meta: Meta<typeof Card> = { title: "Card", component: Card };
export default meta;

export const Default: StoryObj<typeof Card> = {
  render: () => (
    <Card style={{ maxWidth: 320 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>Q3 Upfront</strong>
        <Badge tone="accent">Running</Badge>
      </div>
      <p style={{ color: "var(--velvet-text-muted)", margin: "0.5rem 0 0" }}>
        Reach 68.2% at a frequency floor of 3.
      </p>
    </Card>
  ),
};
