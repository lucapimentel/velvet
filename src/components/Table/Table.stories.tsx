import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "./Table";
import { Badge } from "../Badge/Badge";

const meta: Meta<typeof Table> = { title: "Table", component: Table };
export default meta;

const rows = [
  { network: "Meridian", daypart: "Prime", spots: 42, spend: "$184,200", status: "Complete" },
  { network: "Halcyon", daypart: "Daytime", spots: 118, spend: "$96,400", status: "Running" },
  { network: "Northbay", daypart: "Late Fringe", spots: 7, spend: "$12,050", status: "Draft" },
];

export const Default: StoryObj<typeof Table> = {
  render: (args) => (
    <Table {...args}>
      <caption>Plan lines, Q3 Upfront</caption>
      <thead>
        <tr>
          <th scope="col">Network</th>
          <th scope="col">Daypart</th>
          <th scope="col" align="right">Spots</th>
          <th scope="col" align="right">Spend</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.network}>
            <th scope="row" style={{ fontWeight: "var(--velvet-weight-normal)", color: "var(--velvet-text)" }}>{r.network}</th>
            <td>{r.daypart}</td>
            <td align="right">{r.spots}</td>
            <td align="right">{r.spend}</td>
            <td><Badge tone={r.status === "Complete" ? "success" : r.status === "Running" ? "accent" : "neutral"}>{r.status}</Badge></td>
          </tr>
        ))}
      </tbody>
    </Table>
  ),
};

export const Compact: StoryObj<typeof Table> = { ...Default, args: { density: "compact" } };
