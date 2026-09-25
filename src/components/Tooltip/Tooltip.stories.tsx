import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip, TooltipProvider } from "./Tooltip";
import { Button } from "../Button/Button";

const meta: Meta<typeof Tooltip> = {
  title: "Tooltip",
  component: Tooltip,
  decorators: [(Story) => <TooltipProvider delayDuration={200}><Story /></TooltipProvider>],
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

/** The trigger keeps its own label. The tooltip only repeats it visually. */
export const OnIconButton: Story = {
  render: () => (
    <Tooltip content="Black King Bar">
      <Button variant="ghost" aria-label="Black King Bar">BKB</Button>
    </Tooltip>
  ),
};

export const Sides: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side} content={"Shown " + side} side={side}>
          <Button variant="secondary">{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};
