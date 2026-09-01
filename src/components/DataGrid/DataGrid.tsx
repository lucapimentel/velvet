import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type TableState,
} from "@tanstack/react-table";
import type { ReactNode } from "react";
import { cn } from "../../cn";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";
import { EmptyState } from "../EmptyState/EmptyState";
import { Skeleton } from "../Skeleton/Skeleton";
import { Table } from "../Table/Table";
import styles from "./DataGrid.module.css";

/**
 * A column definition. This is TanStack Table's own type with its value generic
 * bound, so a change in TanStack's generics does not reach into every lab.
 */
// TanStack's own signature: a columns array holds mixed value types, so the value
// generic has to stay open.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Column<T> = ColumnDef<T, any>;

export interface DataGridProps<T> {
  columns: Column<T>[];
  data: T[];
  /** Describes the grid for screen readers. Rendered as the table's caption. */
  caption?: string;
  density?: "comfortable" | "compact";

  /**
   * Total rows on the server. Passing it switches the grid to server mode: it
   * stops sorting and paging in memory and only reports what the user asked for.
   */
  rowCount?: number;

  sorting?: SortingState;
  defaultSorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;

  pagination?: PaginationState;
  defaultPagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;

  /** Passing a handler adds the selection column. Rows are keyed by getRowId. */
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  getRowId?: (row: T, index: number) => string;

  loading?: boolean;
  /** Shown when there is no data and nothing is loading. */
  empty?: ReactNode;
  className?: string;
}

const SELECT_COLUMN_ID = "velvet-select";

export function DataGrid<T>({
  columns,
  data,
  caption,
  density = "comfortable",
  rowCount,
  sorting,
  defaultSorting,
  onSortingChange,
  pagination,
  defaultPagination,
  onPaginationChange,
  rowSelection,
  onRowSelectionChange,
  getRowId,
  loading = false,
  empty,
  className,
}: DataGridProps<T>) {
  const server = rowCount != null;

  if (server && !onPaginationChange) {
    console.warn(
      "[velvet] DataGrid got rowCount but no onPaginationChange. In server mode the grid cannot page itself, so the controls will do nothing.",
    );
  }

  const selectable = onRowSelectionChange != null;

  const selectColumn: Column<T> = {
    id: SELECT_COLUMN_ID,
    header: ({ table }) => (
      <Checkbox
        hideLabel
        label="Select all rows on this page"
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        hideLabel
        label="Select row"
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={(e) => row.toggleSelected(e.target.checked)}
      />
    ),
  };

  const allColumns = selectable ? [selectColumn, ...columns] : columns;

  // Only the pieces the caller actually controls go into state; TanStack owns the rest.
  const state: Partial<TableState> = {};
  if (sorting) state.sorting = sorting;
  if (pagination) state.pagination = pagination;
  if (rowSelection) state.rowSelection = rowSelection;

  const table = useReactTable({
    data,
    columns: allColumns,
    state,
    initialState: { sorting: defaultSorting, pagination: defaultPagination },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: server ? undefined : getSortedRowModel(),
    getPaginationRowModel: server ? undefined : getPaginationRowModel(),
    manualSorting: server,
    manualPagination: server,
    rowCount,
    enableRowSelection: selectable,
    onSortingChange,
    onPaginationChange,
    onRowSelectionChange,
    getRowId,
  });

  const rows = table.getRowModel().rows;
  const columnCount = allColumns.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  return (
    <div className={cn(styles.grid, className)}>
      <Table density={density}>
        {caption && <caption>{caption}</caption>}
        <thead>
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => {
                const sorted = header.column.getIsSorted();
                const canSort = header.column.getCanSort();
                const content = flexRender(header.column.columnDef.header, header.getContext());
                return (
                  <th key={header.id} scope="col" aria-sort={canSort ? ariaSort(sorted) : undefined}>
                    {canSort ? (
                      <button type="button" className={styles.sort} onClick={header.column.getToggleSortingHandler()}>
                        {content}
                        <SortArrow direction={sorted === false ? undefined : sorted} />
                      </button>
                    ) : (
                      content
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {loading &&
            Array.from({ length: 5 }, (_, i) => (
              <tr key={`skeleton-${i}`}>
                {Array.from({ length: columnCount }, (_, j) => (
                  <td key={j}>
                    <Skeleton />
                  </td>
                ))}
              </tr>
            ))}

          {!loading &&
            rows.map((row) => (
              <tr key={row.id} data-selected={row.getIsSelected() || undefined}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}

          {!loading && rows.length === 0 && (
            <tr>
              <td colSpan={columnCount}>{empty ?? <EmptyState title="Nothing to show" />}</td>
            </tr>
          )}
        </tbody>
      </Table>

      {pageCount > 1 && (
        <div className={styles.pagination}>
          <p className={styles.count} aria-live="polite">
            Page {pageIndex + 1} of {pageCount}
          </p>
          <div className={styles.controls}>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button size="sm" variant="secondary" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

const ariaSort = (sorted: false | "asc" | "desc") =>
  sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : "none";

const SortArrow = ({ direction }: { direction?: "asc" | "desc" }) => (
  <svg
    className={cn(styles.arrow, direction && styles.arrowActive)}
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    aria-hidden="true"
  >
    <path d={direction === "desc" ? "m6 9 6 6 6-6" : "m6 15 6-6 6 6"} />
  </svg>
);
