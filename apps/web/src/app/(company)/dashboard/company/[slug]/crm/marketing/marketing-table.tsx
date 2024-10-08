"use client";

import * as React from "react";

import { ChevronDown } from "lucide-react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Input,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nx-next-shadcn/shadcn";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const data: Campaign[] = [
  {
    id: 1,
    name: "Campaign Alpha",
    type: "Email Marketing",
    progress: "In Progress",
    members: ["Alice Johnson", "Bob Smith"],
    startDate: "2024-01-01",
    endDate: "2024-06-01",
    created: "2023-12-01",
    action: "Edit",
    status: "active",
  },
  {
    id: 2,
    name: "Campaign Beta",
    type: "Social Media",
    progress: "Completed",
    members: ["Charlie Brown"],
    startDate: "2024-02-15",
    endDate: "2024-08-15",
    created: "2024-01-01",
    action: "View",
    status: "active",
  },
  {
    id: 3,
    name: "Campaign Gamma",
    type: "SEO",
    progress: "Not Started",
    members: ["Alice Johnson", "Charlie Brown"],
    startDate: "2024-09-01",
    endDate: "2025-01-01",
    created: "2024-08-15",
    action: "Edit",
    status: "active",
  },
  {
    id: 4,
    name: "Campaign Gamma",
    type: "SEO",
    progress: "Not Started",
    members: ["Alice Johnson", "Charlie Brown"],
    startDate: "2024-09-01",
    endDate: "2025-01-01",
    created: "2024-08-15",
    action: "Edit",
    status: "active",
  },
  {
    id: 5,
    name: "Campaign Gamma",
    type: "SEO",
    progress: "Not Started",
    members: ["Alice Johnson", "Charlie Brown"],
    startDate: "2024-09-01",
    endDate: "2025-01-01",
    created: "2024-08-15",
    action: "Edit",
    status: "active",
  },
  {
    id: 6,
    name: "Campaign Gamma",
    type: "SEO",
    progress: "Not Started",
    members: ["Alice Johnson", "Charlie Brown"],
    startDate: "2024-09-01",
    endDate: "2025-01-01",
    created: "2024-08-15",
    action: "Edit",
    status: "active",
  },
];

export type Campaign = {
  id: number;
  name: string;
  type: string;
  progress: string;
  members: string[];
  startDate: string;
  endDate: string;
  created: string;
  action: string;
  status: string;
};

export const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div>{row.getValue("type")}</div>,
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => <div>{row.getValue("progress")}</div>,
  },
  {
    accessorKey: "members",
    header: "Members",
    cell: ({ row }) => {
      const members = row.getValue("members") as string[];
      return <div>{members.join(", ")}</div>;
    },
  },

  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => <div>{row.getValue("startDate")}</div>,
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => <div>{row.getValue("endDate")}</div>,
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => <div>{row.getValue("created")}</div>,
  },
  {
    accessorKey: "action",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="">
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Campaign</DialogTitle>
              <DialogDescription>
                Update your campaign information
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue={row.original.name}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Input
                  id="type"
                  defaultValue={row.original.type}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="progress" className="text-right">
                  Progress
                </Label>
                <Input
                  id="progress"
                  defaultValue={row.original.progress}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="members" className="text-right">
                  Members
                </Label>
                <Input
                  id="members"
                  defaultValue={row.original.members.join(", ")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  defaultValue={row.original.startDate}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  defaultValue={row.original.endDate}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Input
                  id="status"
                  defaultValue={row.original.status}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update Campaign Info</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button
          variant="outline"
          onClick={() => {
            // Handle the update action here
            console.log("Delete campaign:", row.getValue("name"));
          }}
        >
          Delete
        </Button>
      </div>
    ),
  },
];

export function MarketingTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5); // Set number of items per page

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: { pageIndex, pageSize }, // Include pagination state
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder="Search Campaign"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table className="w-full min-w-[1200px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              setPageIndex((old) => Math.max(0, old - 1));
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              setPageIndex((old) =>
                Math.min(table.getPageCount() - 1, old + 1),
              );
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
