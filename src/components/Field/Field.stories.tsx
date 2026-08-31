import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "./Field";
import { Input } from "../Input/Input";

const meta: Meta<typeof Field> = { title: "Field", component: Field };
export default meta;

type Story = StoryObj<typeof Field>;

export const WithHint: Story = {
  render: () => (
    <Field label="Budget" hint="Whole dollars, no separators.">
      {(control) => <Input {...control} placeholder="250000" inputMode="numeric" />}
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field label="Budget" hint="Whole dollars, no separators." error="Budget must be above zero.">
      {(control) => <Input {...control} defaultValue="0" inputMode="numeric" />}
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field label="Target demo">
      {(control) => <Input {...control} defaultValue="Adults 25-54" disabled />}
    </Field>
  ),
};
