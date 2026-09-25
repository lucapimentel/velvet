import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { VisuallyHidden } from "./VisuallyHidden";
import { Button } from "../Button/Button";

const meta: Meta<typeof VisuallyHidden> = { title: "VisuallyHidden", component: VisuallyHidden };
export default meta;

type Story = StoryObj<typeof VisuallyHidden>;

/** Nothing visible. Screen readers hear "Clue 2 of 5" after the button. */
export const LiveAnnouncement: Story = {
  render: () => {
    const [count, setCount] = useState(1);
    return (
      <div>
        <Button onClick={() => setCount((n) => n + 1)}>Reveal next clue</Button>
        <VisuallyHidden live="polite">Clue {count} of 5</VisuallyHidden>
      </div>
    );
  },
};

export const IconLabel: Story = {
  render: () => (
    <Button variant="ghost">
      <span aria-hidden="true">x</span>
      <VisuallyHidden>Dismiss</VisuallyHidden>
    </Button>
  ),
};
