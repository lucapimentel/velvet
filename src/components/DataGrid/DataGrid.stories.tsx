import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataGrid, type Column } from "./DataGrid";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
import { EmptyState } from "../EmptyState/EmptyState";

const meta: Meta<typeof DataGrid> = { title: "DataGrid", component: DataGrid };
export default meta;

interface PlanLine {
  id: string;
  network: string;
  daypart: string;
  spots: number;
  spendCents: number;
  status: "Draft" | "Running" | "Complete";
}

const money = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const columns: Column<PlanLine>[] = [
  { accessorKey: "network", header: "Network" },
  { accessorKey: "daypart", header: "Daypart" },
  { accessorKey: "spots", header: "Spots" },
  { accessorKey: "spendCents", header: "Spend", cell: (c) => money(c.getValue<number>()) },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
    cell: (c) => {
      const status = c.getValue<PlanLine["status"]>();
      return <Badge tone={status === "Complete" ? "success" : status === "Running" ? "accent" : "neutral"}>{status}</Badge>;
    },
  },
];

const networks = ["Meridian", "Halcyon", "Northbay", "Corvid", "Lantern", "Ashgrove", "Pelham"];
const dayparts = ["Prime", "Daytime", "Late Fringe", "Overnight"];
const statuses: PlanLine["status"][] = ["Draft", "Running", "Complete"];

const rows: PlanLine[] = Array.from({ length: 23 }, (_, i) => ({
  id: String(i),
  network: `${networks[i % networks.length]} ${Math.floor(i / networks.length) + 1}`,
  daypart: dayparts[i % dayparts.length]!,
  spots: ((i * 37) % 140) + 4,
  spendCents: (((i * 911) % 400) + 20) * 100_000,
  status: statuses[i % statuses.length]!,
}));

/** No state passed, so Velvet sorts and pages in memory. */
export const ClientSide: StoryObj = {
  render: () => (
    <DataGrid
      caption="Plan lines, Q3 Upfront"
      columns={columns}
      data={rows}
      defaultPagination={{ pageIndex: 0, pageSize: 8 }}
    />
  ),
};

export const WithSelection: StoryObj = {
  render: function SelectionStory() {
    const [selected, setSelected] = useState({});
    const count = Object.keys(selected).length;
    return (
      <div style={{ display: "grid", gap: "0.75rem" }}>
        <DataGrid
          columns={columns}
          data={rows.slice(0, 6)}
          getRowId={(row) => row.id}
          rowSelection={selected}
          onRowSelectionChange={setSelected}
        />
        <p style={{ margin: 0, fontSize: "var(--velvet-text-sm)", color: "var(--velvet-text-muted)" }}>
          {count === 0 ? "Nothing selected" : `${count} selected`}
        </p>
      </div>
    );
  },
};

export const Loading: StoryObj = {
  render: () => <DataGrid columns={columns} data={[]} loading />,
};

export const Empty: StoryObj = {
  render: () => (
    <DataGrid
      columns={columns}
      data={[]}
      empty={
        <EmptyState
          title="No plan lines yet"
          description="Add inventory to this plan, or run the optimiser to fill it."
          action={<Button>Run optimiser</Button>}
        />
      }
    />
  ),
};

/**
 * `rowCount` switches the grid to server mode. It stops sorting and paging in
 * memory — here a fake query does the work the database would.
 */
export const ServerSide: StoryObj = {
  render: function ServerStory() {
    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

    const sort = sorting[0];
    const ordered = sort
      ? [...rows].sort((a, b) => {
          const x = a[sort.id as keyof PlanLine];
          const y = b[sort.id as keyof PlanLine];
          const cmp = x < y ? -1 : x > y ? 1 : 0;
          return sort.desc ? -cmp : cmp;
        })
      : rows;
    const start = pagination.pageIndex * pagination.pageSize;

    return (
      <DataGrid
        caption="Server mode: the page is sliced outside the grid"
        columns={columns}
        data={ordered.slice(start, start + pagination.pageSize)}
        rowCount={rows.length}
        sorting={sorting}
        onSortingChange={setSorting as never}
        pagination={pagination}
        onPaginationChange={setPagination as never}
      />
    );
  },
};
