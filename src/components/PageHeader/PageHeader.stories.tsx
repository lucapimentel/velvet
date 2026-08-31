import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageHeader } from "./PageHeader";
import { Button } from "../Button/Button";
import { Badge } from "../Badge/Badge";

const meta: Meta<typeof PageHeader> = { title: "PageHeader", component: PageHeader };
export default meta;

export const WithActions: StoryObj<typeof PageHeader> = {
  render: () => (
    <PageHeader
      title="Q3 Upfront"
      description="Reach 68.2% at a frequency floor of 3, across 47 plan lines."
      above={<Badge tone="accent">Running</Badge>}
      actions={
        <>
          <Button variant="secondary">Duplicate</Button>
          <Button>Optimise</Button>
        </>
      }
    />
  ),
};

export const TitleOnly: StoryObj<typeof PageHeader> = { args: { title: "Inventory" } };
