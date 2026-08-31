import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dialog, DialogClose } from "./Dialog";
import { Button } from "../Button/Button";

const meta: Meta<typeof Dialog> = { title: "Dialog", component: Dialog };
export default meta;

export const Confirm: StoryObj<typeof Dialog> = {
  render: () => (
    <Dialog
      trigger={<Button variant="danger">Delete plan</Button>}
      title="Delete this plan?"
      description="Q3 Upfront and its 47 plan lines are removed. This cannot be undone."
      footer={
        <>
          <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
          <DialogClose asChild><Button variant="danger">Delete</Button></DialogClose>
        </>
      }
    />
  ),
};

export const WithBody: StoryObj<typeof Dialog> = {
  render: () => (
    <Dialog
      trigger={<Button>Optimiser settings</Button>}
      title="Optimiser settings"
      footer={<DialogClose asChild><Button>Done</Button></DialogClose>}
    >
      <p style={{ margin: 0, color: "var(--velvet-text-muted)" }}>
        Runs are memoised on a hash of these parameters, so repeating a run is free.
      </p>
    </Dialog>
  ),
};
