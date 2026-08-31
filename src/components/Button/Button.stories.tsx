import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = { title: "Button", component: Button };
export default meta;

type Story = StoryObj<typeof Button>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Button variant="primary">Save plan</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="ghost">Duplicate</Button>
      <Button variant="danger">Delete</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Disabled: Story = { args: { children: "Unavailable", disabled: true } };

/** `asChild` renders the child instead of a button, keeping the styling. */
export const AsLink: Story = {
  render: () => (
    <Button asChild>
      <a href="#new-plan">New plan</a>
    </Button>
  ),
};
