import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavLink } from "./NavLink";

const meta: Meta<typeof NavLink> = { title: "NavLink", component: NavLink };
export default meta;

/** Velvet ships the link, not the bar. The arrangement is the lab's. */
export const InABar: StoryObj<typeof NavLink> = {
  render: () => (
    <nav style={{ display: "flex", gap: "0.25rem", borderBottom: "1px solid var(--velvet-border)", paddingBottom: "0.5rem" }}>
      <NavLink href="#plans" active>Plans</NavLink>
      <NavLink href="#inventory">Inventory</NavLink>
      <NavLink href="#runs">Optimiser runs</NavLink>
      <NavLink href="#exports">Exports</NavLink>
    </nav>
  ),
};

/** With a router, pass its link through `asChild`. Here it is a plain anchor standing in for one. */
export const AsChild: StoryObj<typeof NavLink> = {
  render: () => (
    <NavLink asChild active>
      <a href="#plans">Plans, rendered by the router&apos;s own link</a>
    </NavLink>
  ),
};
