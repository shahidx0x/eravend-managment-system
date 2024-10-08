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

const data: Customer[] = [
  {
    Customer: "John Doe",
    subject: "SEO Personal",
    customerId: "ID12345",
    customerValue: "$2000.89",
    customerType: "Corporate",
    startDate: "2024-10-06",
    endDate: "2025-10-06",
    action: "Follow Up",
  },
  {
    Customer: "Jane Smith",
    subject: "UI/UX Design",
    customerId: "ID12346",
    customerValue: "$3500.50",
    customerType: "Small Business",
    startDate: "2024-11-01",
    endDate: "2025-11-01",
    action: "Send Proposal",
  },
  {
    Customer: "Alice Johnson",
    subject: "Web Design",
    customerId: "ID12347",
    customerValue: "$1500.00",
    customerType: "Startup",
    startDate: "2024-12-15",
    endDate: "2025-12-15",
    action: "Schedule Meeting",
  },
  {
    Customer: "Bob Brown",
    subject: "Content Marketing",
    customerId: "ID12348",
    customerValue: "$2500.75",
    customerType: "Corporate",
    startDate: "2024-09-20",
    endDate: "2025-09-20",
    action: "Send Invoice",
  },
  {
    Customer: "Emily White",
    subject: "Social Media Management",
    customerId: "ID12349",
    customerValue: "$3000.99",
    customerType: "Freelancer",
    startDate: "2024-10-10",
    endDate: "2025-10-10",
    action: "Review Contract",
  },
  {
    Customer: "Michael Green",
    subject: "Email Marketing",
    customerId: "ID12350",
    customerValue: "$4000.00",
    customerType: "Corporate",
    startDate: "2024-08-15",
    endDate: "2025-08-15",
    action: "Follow Up",
  },
  {
    Customer: "Chris Blue",
    subject: "PPC Campaign",
    customerId: "ID12351",
    customerValue: "$4500.00",
    customerType: "Startup",
    startDate: "2024-09-10",
    endDate: "2025-09-10",
    action: "Send Proposal",
  },
  {
    Customer: "Jessica Red",
    subject: "Market Research",
    customerId: "ID12352",
    customerValue: "$2000.00",
    customerType: "Freelancer",
    startDate: "2024-11-20",
    endDate: "2025-11-20",
    action: "Schedule Meeting",
  },
  {
    Customer: "Sam Black",
    subject: "Brand Strategy",
    customerId: "ID12353",
    customerValue: "$6000.00",
    customerType: "Corporate",
    startDate: "2024-12-01",
    endDate: "2025-12-01",
    action: "Send Invoice",
  },
  {
    Customer: "Laura Silver",
    subject: "Social Media Strategy",
    customerId: "ID12354",
    customerValue: "$5000.00",
    customerType: "Small Business",
    startDate: "2024-10-10",
    endDate: "2025-10-10",
    action: "Review Contract",
  },
];

export type Customer = {
  Customer: string;
  subject: string;
  customerId: string;
  customerValue: string;
  customerType: string;
  startDate: string;
  endDate: string;
  action: string;
};

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "Customer",
    header: "Customer",
    cell: ({ row }) => <div>{row.getValue("Customer")}</div>,
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => <div>{row.getValue("subject")}</div>,
  },
  {
    accessorKey: "customerValue",
    header: "Customer Value",
    cell: ({ row }) => <div>{row.getValue("customerValue")}</div>,
  },
  {
    accessorKey: "customerType",
    header: "Customer Type",
    cell: ({ row }) => <div>{row.getValue("customerType")}</div>,
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
    accessorKey: "action",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => (
      <div className="flex justify-center items-center gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Edit</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Customer</DialogTitle>
              <DialogDescription>
                Update your Customer information
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Customer" className="text-right">
                  Customer
                </Label>
                <Input
                  id="Customer"
                  defaultValue={row.original.Customer}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">
                  Subject
                </Label>
                <Input
                  id="subject"
                  defaultValue={row.original.subject}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customerValue" className="text-right">
                  Customer Value
                </Label>
                <Input
                  id="customerValue"
                  defaultValue={row.original.customerValue}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customerType" className="text-right">
                  Customer Type
                </Label>
                <Input
                  id="customerType"
                  defaultValue={row.original.customerType}
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
            </div>
            <DialogFooter>
              <Button type="submit">Update Customer Info</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
          variant="outline"
          onClick={() => {
            // Handle the delete action here
            console.log("Delete campaign:", row.getValue("subject"));
          }}
        >
          Delete
        </Button>
      </div>
    ),
  },
];

export function CustomerTable() {
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
          placeholder="Search Customer"
          value={
            (table.getColumn("Customer")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("Customer")?.setFilterValue(event.target.value)
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
