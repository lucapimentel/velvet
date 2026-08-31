import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toast, ToastProvider } from "./Toast";
import { Button } from "../Button/Button";

const meta: Meta<typeof Toast> = { title: "Toast", component: Toast };
export default meta;

function Demo({ tone, title, description }: { tone: "neutral" | "success" | "danger"; title: string; description?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <ToastProvider>
      <Button onClick={() => setOpen(true)}>Show toast</Button>
      <Toast open={open} onOpenChange={setOpen} tone={tone} title={title} description={description} />
    </ToastProvider>
  );
}

export const Success: StoryObj = {
  render: () => <Demo tone="success" title="Plan saved" description="Q3 Upfront, version 4." />,
};

export const Failure: StoryObj = {
  render: () => <Demo tone="danger" title="Optimiser run failed" description="The budget was below the frequency floor." />,
};

export const WithAction: StoryObj = {
  render: function WithActionStory() {
    const [open, setOpen] = useState(false);
    return (
      <ToastProvider>
        <Button onClick={() => setOpen(true)}>Delete plan line</Button>
        <Toast
          open={open}
          onOpenChange={setOpen}
          title="Plan line removed"
          action={{ label: "Undo", altText: "Undo removing the plan line", onClick: () => setOpen(false) }}
        />
      </ToastProvider>
    );
  },
};
