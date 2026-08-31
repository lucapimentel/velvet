import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio } from "./Radio";

const meta: Meta<typeof Radio> = { title: "Radio", component: Radio };
export default meta;

/** A fieldset and legend give the group its accessible name. No wrapper component needed. */
export const Group: StoryObj<typeof Radio> = {
  render: () => (
    <fieldset style={{ border: "none", margin: 0, padding: 0, display: "grid", gap: "0.5rem" }}>
      <legend style={{ padding: 0, marginBottom: "0.5rem", fontSize: "var(--velvet-text-sm)", fontWeight: 500 }}>
        Optimise for
      </legend>
      <Radio name="goal" value="reach" label="Reach at a frequency floor" defaultChecked />
      <Radio name="goal" value="frequency" label="Average frequency" />
      <Radio name="goal" value="cpm" label="Lowest effective CPM" />
      <Radio name="goal" value="custom" label="Custom curve" disabled />
    </fieldset>
  ),
};
