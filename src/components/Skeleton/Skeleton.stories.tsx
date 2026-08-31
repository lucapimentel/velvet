import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";
import { Card } from "../Card/Card";

const meta: Meta<typeof Skeleton> = { title: "Skeleton", component: Skeleton };
export default meta;

export const LoadingCard: StoryObj<typeof Skeleton> = {
  render: () => (
    <Card style={{ maxWidth: 320, display: "grid", gap: "0.75rem" }}>
      <Skeleton width="60%" height="1.25em" />
      <Skeleton />
      <Skeleton width="80%" />
    </Card>
  ),
};
