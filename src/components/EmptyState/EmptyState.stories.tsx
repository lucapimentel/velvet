import type { Meta, StoryObj } from "@storybook/react-vite";
import { EmptyState } from "./EmptyState";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";

const meta: Meta<typeof EmptyState> = { title: "EmptyState", component: EmptyState };
export default meta;

const Inbox = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 12h5l2 3h4l2-3h5" />
    <path d="M4.5 5h15l1.5 7v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6z" />
  </svg>
);

export const NoPlans: StoryObj<typeof EmptyState> = {
  render: () => (
    <Card>
      <EmptyState
        icon={<Inbox />}
        title="No plans yet"
        description="A plan holds the inventory, the budget and the demo you are optimising against."
        action={<Button>Create a plan</Button>}
      />
    </Card>
  ),
};

export const NoResults: StoryObj<typeof EmptyState> = {
  args: { title: "No inventory matches those filters", description: "Try widening the daypart or raising the CPM ceiling." },
};
