import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./Textarea";
import { Field } from "../Field/Field";

const meta: Meta<typeof Textarea> = { title: "Textarea", component: Textarea };
export default meta;

export const Default: StoryObj<typeof Textarea> = {
  args: { placeholder: "Why this plan was rejected…", defaultValue: "" },
};

export const InAField: StoryObj<typeof Textarea> = {
  render: () => (
    <Field label="Notes" hint="Visible to anyone with access to the plan.">
      {(control) => <Textarea {...control} />}
    </Field>
  ),
};
