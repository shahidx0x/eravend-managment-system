"use client";

import React, { useState } from "react";

import { Search, ChevronLeft, ChevronRight } from "lucide-react";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nx-next-shadcn/shadcn";

export default function EmployeeSalaray() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      salary: 5000,
      baseSalary: 5000,
      joinDate: "2023-01-15",
      designation: "Software Engineer",
      status: "Paid",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      salary: 6000,
      baseSalary: 6000,
      joinDate: "2023-02-01",
      designation: "Product Manager",
      status: "Paid",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      salary: 4500,
      baseSalary: 4500,
      joinDate: "2023-03-10",
      designation: "Designer",
      status: "Unpaid",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      salary: 5500,
      baseSalary: 5500,
      joinDate: "2023-04-05",
      designation: "Data Analyst",
      status: "Paid",
    },
    {
      id: 5,
      name: "Charlie Davis",
      email: "charlie@example.com",
      salary: 4800,
      baseSalary: 4800,
      joinDate: "2023-05-20",
      designation: "Marketing Specialist",
      status: "Unpaid",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [salaryChangeType, setSalaryChangeType] = useState("increase");
  const [salaryChangeAmount, setSalaryChangeAmount] = useState("");
  const [newBaseSalary, setNewBaseSalary] = useState("");

  const filteredEmployees = employees.filter((employee) =>
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee,
  );

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleSalaryChange = () => {
    if (selectedEmployee) {
      let newSalary = selectedEmployee.salary;

      if (newBaseSalary) {
        newSalary = parseFloat(newBaseSalary);
      } else if (salaryChangeAmount) {
        const changeAmount = parseFloat(salaryChangeAmount);
        newSalary =
          salaryChangeType === "increase"
            ? selectedEmployee.salary + changeAmount
            : selectedEmployee.salary - changeAmount;
      }

      const updatedEmployees = employees.map((emp) =>
        emp.id === selectedEmployee.id
          ? { ...emp, salary: newSalary, baseSalary: newSalary }
          : emp,
      );
      setEmployees(updatedEmployees);
      setSelectedEmployee(null);
      setSalaryChangeAmount("");
      setNewBaseSalary("");
    }
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Employee List</CardTitle>
          <CardDescription>Manage employee information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-between">
            <div className="relative">
              <Search className="text-muted-foreground absolute left-2 top-2.5 h-4 w-4" />
              <Input
                placeholder="Search by email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>${employee.salary}</TableCell>
                  <TableCell>{employee.joinDate}</TableCell>
                  <TableCell>{employee.status}</TableCell>
                  <TableCell className={cn("flex gap-5")}>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setSelectedEmployee(employee)}
                    >
                      Send Payment Slip
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => setSelectedEmployee(employee)}
                        >
                          Update Information
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Update Information for {selectedEmployee?.name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div>
                            <Label htmlFor="baseSalary">Base Salary</Label>
                            <Input
                              id="baseSalary"
                              type="number"
                              value={newBaseSalary}
                              onChange={(e) => setNewBaseSalary(e.target.value)}
                              placeholder="Enter new base salary"
                            />
                          </div>
                          <div>
                            <Label htmlFor="salaryChangeType">
                              Salary Change Type
                            </Label>
                            <Select
                              value={salaryChangeType}
                              onValueChange={(value) =>
                                setSalaryChangeType(value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select change type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="increase">
                                  Increase
                                </SelectItem>
                                <SelectItem value="decrease">
                                  Decrease
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="salaryChangeAmount">Amount</Label>
                            <Input
                              id="salaryChangeAmount"
                              type="number"
                              value={salaryChangeAmount}
                              onChange={(e) =>
                                setSalaryChangeAmount(e.target.value)
                              }
                              placeholder="Enter amount"
                            />
                          </div>
                          <Button onClick={handleSalaryChange}>
                            Update Salary
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex items-center justify-between">
            <Button onClick={handlePrevPage} disabled={currentPage === 1}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
