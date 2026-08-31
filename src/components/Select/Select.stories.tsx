import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";
import { Field } from "../Field/Field";

const meta: Meta<typeof Select> = { title: "Select", component: Select };
export default meta;

const dayparts = [
  { value: "prime", label: "Prime" },
  { value: "daytime", label: "Daytime" },
  { value: "late", label: "Late Fringe" },
  { value: "overnight", label: "Overnight", disabled: true },
];

export const Default: StoryObj<typeof Select> = {
  args: { items: dayparts, placeholder: "Choose a daypart" },
};

export const InAField: StoryObj<typeof Select> = {
  render: () => (
    <Field label="Daypart" error="Pick a daypart before optimising.">
      {(control) => <Select {...control} items={dayparts} />}
    </Field>
  ),
};
