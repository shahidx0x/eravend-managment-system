"use client";

import * as React from "react";

import Image from "next/image";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Label, Textarea } from "@nx-next-shadcn/shadcn";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@nx-next-shadcn/shadcn";
import { Button, cn } from "@nx-next-shadcn/shadcn";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@nx-next-shadcn/shadcn";
import { Input } from "@nx-next-shadcn/shadcn";
import {
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

const data: Company[] = [
  {
    id: "m5gr84i9",
    company_name: "test",
    location: "germany",
    contact: "0101010101",
    owner: "eravend",
    email: "ken99@yahoo.com",
    logo: "/OIP.jpeg",
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi odio beatae eveniet odit quia nesciunt",
  },
  {
    id: "m5gr84i9",
    company_name: "test",
    location: "germany",
    contact: "0101010101",
    owner: "eravend",
    email: "ken99@yahoo.com",
    logo: "/OIP.jpeg",
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi odio beatae eveniet odit quia nesciunt",
  },
  {
    id: "m5gr84i9",
    company_name: "test",
    location: "germany",
    contact: "0101010101",
    owner: "eravend",
    email: "ken99@yahoo.com",
    logo: "/OIP.jpeg",
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi odio beatae eveniet odit quia nesciunt",
  },
];

export type Company = {
  id: string;
  logo: string;
  company_name: string;
  contact: string;
  email: string;
  location: string;
  owner: string;
  details: string;
};

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "company_name",
    header: "Company",
    cell: ({ row }) => {
      console.log(row);
      return (
        <div className="flex items-center gap-5 capitalize">
          <Image
            src={row.original.logo}
            alt={row.original.company_name}
            width={50}
            height={50}
          />
          <span className="text-lg font-medium">
            {row.getValue("company_name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "location",
    header: () => <div className="">Location</div>,
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("location")}</div>
    ),
  },
  {
    accessorKey: "contact",
    header: () => <div className="">Contact</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("contact")}</div>;
    },
  },
  {
    accessorKey: "owner",
    header: () => <div className="">Owner</div>,
    cell: ({ row }) => <div className="lowercase">{row.getValue("owner")}</div>,
  },
  {
    accessorKey: "details",
    header: () => <div className="">Details</div>,
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("details")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex gap-5">
          <Button variant="secondary" className="bg-indigo-200 text-indigo-600">
            Manage
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="secondary"
                className="bg-yellow-200 text-yellow-600"
              >
                Update
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Update</SheetTitle>
                <SheetDescription>
                  Update your company information
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={row.original.company_name}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="username"
                    type="email"
                    value={row.original.email}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="username"
                    value={row.original.location}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Conatact
                  </Label>
                  <Input
                    id="username"
                    value={row.original.contact}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Owner
                  </Label>
                  <Input
                    id="username"
                    value={row.original.owner}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Details
                  </Label>

                  <Textarea
                    className="col-span-3"
                    defaultValue={row.original.details}
                    placeholder="Type your message here."
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Update Company Info</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <Button variant="secondary" className="bg-red-200 text-red-600">
            Remove
          </Button>
        </div>
      );
    },
  },
];

export function DataTableCompany() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto mr-2">
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
        <Sheet>
          <SheetTrigger asChild>
            <Button>Add Company</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Your Company</SheetTitle>
              <SheetDescription>
                Add your company that you want to manage it
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="A Company" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Email
                </Label>
                <Input
                  id="username"
                  type="email"
                  value="@eravend.com"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Location
                </Label>
                <Input id="username" value="Germany" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Conatact
                </Label>
                <Input
                  id="username"
                  value="+99019312431"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Owner
                </Label>
                <Input id="username" value="@eravend" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Details
                </Label>

                <Textarea
                  className="col-span-3"
                  placeholder="Type your message here."
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Add Company</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div className="rounded-md border">
        <Table>
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
            {table.getRowModel().rows?.length ? (
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
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}