import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./Spinner";
import { Button } from "../Button/Button";

const meta: Meta<typeof Spinner> = { title: "Spinner", component: Spinner };
export default meta;

export const Default: StoryObj<typeof Spinner> = {};

export const Sizes: StoryObj<typeof Spinner> = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Spinner />
      <span style={{ fontSize: "2rem" }}><Spinner label={null} /></span>
    </div>
  ),
};

export const InsideAButton: StoryObj<typeof Spinner> = {
  render: () => (
    <Button disabled>
      <Spinner label={null} />
      Optimising
    </Button>
  ),
};
