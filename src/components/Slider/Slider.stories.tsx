import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "./Slider";
import { Field } from "../Field/Field";

const meta: Meta<typeof Slider> = { title: "Slider", component: Slider };
export default meta;

export const InAField: StoryObj<typeof Slider> = {
  render: () => (
    <div style={{ width: 320 }}>
      <Field label="Frequency floor" hint="Minimum times a household should see the spot.">
        {(control) => <Slider {...control} min={1} max={10} defaultValue={3} step={1} />}
      </Field>
    </div>
  ),
};

export const Disabled: StoryObj<typeof Slider> = {
  args: { min: 0, max: 100, defaultValue: 40, disabled: true, "aria-label": "Budget share" },
};
