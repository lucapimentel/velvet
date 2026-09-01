import { render, screen, within } from "@testing-library/react";
import { DataGrid, type Column } from "./DataGrid";

interface Row {
  id: string;
  network: string;
  spots: number;
}

const columns: Column<Row>[] = [
  { accessorKey: "network", header: "Network" },
  { accessorKey: "spots", header: "Spots", enableSorting: false },
];

const rows: Row[] = [
  { id: "a", network: "Meridian", spots: 12 },
  { id: "b", network: "Halcyon", spots: 4 },
  { id: "c", network: "Northbay", spots: 30 },
];

test("a sortable column gets a sort button and aria-sort, an unsortable one gets neither", () => {
  render(<DataGrid columns={columns} data={rows} />);

  const sortable = screen.getByRole("columnheader", { name: /network/i });
  expect(sortable.getAttribute("aria-sort")).toBe("none");
  expect(within(sortable).getByRole("button")).toBeDefined();

  const fixed = screen.getByRole("columnheader", { name: /spots/i });
  expect(fixed.getAttribute("aria-sort")).toBeNull();
  expect(within(fixed).queryByRole("button")).toBeNull();
});

test("client mode pages in memory", () => {
  render(<DataGrid columns={columns} data={rows} defaultPagination={{ pageIndex: 0, pageSize: 2 }} />);
  expect(screen.getByText("Page 1 of 2")).toBeDefined();
  expect(screen.getByText("Meridian")).toBeDefined();
  expect(screen.queryByText("Northbay")).toBeNull();
});

test("server mode counts pages from rowCount, not from the rows it was handed", () => {
  render(
    <DataGrid
      columns={columns}
      data={rows}
      rowCount={97}
      pagination={{ pageIndex: 0, pageSize: 10 }}
      onPaginationChange={() => {}}
    />,
  );
  // 97 rows at 10 a page is 10 pages, even though only 3 rows were passed.
  expect(screen.getByText("Page 1 of 10")).toBeDefined();
});

test("server mode without a pagination handler warns instead of failing silently", () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  render(<DataGrid columns={columns} data={rows} rowCount={97} />);
  expect(warn.mock.calls[0]?.[0]).toContain("onPaginationChange");
  warn.mockRestore();
});

test("the empty state shows only when there is no data and nothing is loading", () => {
  const { rerender } = render(<DataGrid columns={columns} data={[]} empty={<p>No plan lines</p>} />);
  expect(screen.getByText("No plan lines")).toBeDefined();

  rerender(<DataGrid columns={columns} data={[]} empty={<p>No plan lines</p>} loading />);
  expect(screen.queryByText("No plan lines")).toBeNull();
});

test("selection adds a column only when a handler is given", () => {
  const { rerender } = render(<DataGrid columns={columns} data={rows} />);
  expect(screen.queryByLabelText("Select row")).toBeNull();

  rerender(<DataGrid columns={columns} data={rows} getRowId={(r) => r.id} onRowSelectionChange={() => {}} />);
  expect(screen.getAllByLabelText("Select row")).toHaveLength(3);
  expect(screen.getByLabelText("Select all rows on this page")).toBeDefined();
});
