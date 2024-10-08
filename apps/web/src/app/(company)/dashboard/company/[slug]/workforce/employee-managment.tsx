"use client";

import { useState } from "react";



import { PlusIcon, Search, SearchIcon } from "lucide-react";



import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@nx-next-shadcn/shadcn";


interface Employee {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  status: "active" | "blocked";
}

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phoneNumber: "123-456-7890",
      role: "Manager",
      status: "active",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@example.com",
      phoneNumber: "098-765-4321",
      role: "Developer",
      status: "blocked",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      phoneNumber: "456-789-1230",
      role: "Designer",
      status: "active",
    },
  ]);

  const [roles, setRoles] = useState<string[]>([
    "Manager",
    "Developer",
    "Designer",
  ]);
  const [newEmployee, setNewEmployee] = useState<
    Omit<Employee, "id" | "status">
  >({
    name: "",
    email: "",
    phoneNumber: "",
    role: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const addEmployee = () => {
    setEmployees([
      ...employees,
      { ...newEmployee, id: employees.length + 1, status: "active" },
    ]);
    setNewEmployee({ name: "", email: "", phoneNumber: "", role: "" });
  };

  const toggleEmployeeStatus = (id: number) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === id
          ? { ...emp, status: emp.status === "active" ? "blocked" : "active" }
          : emp,
      ),
    );
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <h1 className="my-4 text-2xl font-bold">Employee Management</h1>

      <div className="mb-4 flex gap-4 justify-between">
        <div className="mb-4 flex w-full items-center">
          <Search className="mr-2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-sm"
          />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" /> Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newEmployee.name}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, email: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={newEmployee.phoneNumber}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select
                  onValueChange={(value) =>
                    setNewEmployee({ ...newEmployee, role: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={addEmployee}>Save Employee</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full min-w-[1000px]">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phoneNumber}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => toggleEmployeeStatus(employee.id)}
                    variant={
                      employee.status === "active" ? "destructive" : "default"
                    }
                  >
                    {employee.status === "active" ? "Block" : "Unblock"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}