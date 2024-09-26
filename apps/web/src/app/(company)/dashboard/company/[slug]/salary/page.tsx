"use client";

import React, { useState, useEffect } from "react";

import { AlertCircle, Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@nx-next-shadcn/shadcn";

export default function AdminDashboard() {
  const [totalBudget, setTotalBudget] = useState(100000);
  const [currentBudget, setCurrentBudget] = useState(75000);
  const [warningLimit, setWarningLimit] = useState(90000);
  const [euroAmount, setEuroAmount] = useState("");
  const [bdtAmount, setBdtAmount] = useState("");
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
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [salaryChangeType, setSalaryChangeType] = useState("increase");
  const [salaryChangeAmount, setSalaryChangeAmount] = useState("");
  const [newBaseSalary, setNewBaseSalary] = useState("");
  const [newTotalBudget, setNewTotalBudget] = useState(totalBudget);
  const [newWarningLimit, setNewWarningLimit] = useState(warningLimit);

  useEffect(() => {
    const calculatedBudget = employees.reduce(
      (sum, emp) => sum + emp.salary,
      0,
    );
    setCurrentBudget(calculatedBudget);
  }, [employees]);

  const handleBudgetChange = (e, setter) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setter(value);
    }
  };

  const handleCurrencyConvert = () => {
    const rate = 115; // 1 Euro = 115 BDT (example rate)
    const bdt = parseFloat(euroAmount) * rate;
    setBdtAmount(bdt.toFixed(2));
  };

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

  const handleTotalBudgetUpdate = () => {
    setTotalBudget(newTotalBudget);
  };

  const handleWarningLimitUpdate = () => {
    setWarningLimit(newWarningLimit);
  };

  const sortedEmployees = [...employees].sort((a, b) => b.salary - a.salary);

  const budgetData = [
    { name: "Total Budget", amount: totalBudget },
    { name: "Current Budget", amount: currentBudget },
    { name: "Warning Limit", amount: warningLimit },
  ];

  return (
    <div className="container mx-auto p-4">
      {currentBudget > warningLimit && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            Current budget (${currentBudget}) exceeds the warning limit ($
            {warningLimit})!
          </AlertDescription>
        </Alert>
      )}
      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <div className="grid gap-4 md:grid-cols-5">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={budgetData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Total Budget:</span>
                    <span>${totalBudget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Current Budget:</span>
                    <span>${currentBudget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Warning Limit:</span>
                    <span>${warningLimit}</span>
                  </div>
                </div>
                <div className="mt-4 flex space-x-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Set Total Budget</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Set Total Budget</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <Label htmlFor="newTotalBudget">
                            New Total Budget
                          </Label>
                          <Input
                            id="newTotalBudget"
                            type="number"
                            value={newTotalBudget}
                            onChange={(e) =>
                              setNewTotalBudget(parseFloat(e.target.value))
                            }
                          />
                        </div>
                        <Button onClick={handleTotalBudgetUpdate}>
                          Update Total Budget
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Set Warning Limit</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Set Warning Limit</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <Label htmlFor="newWarningLimit">
                            New Warning Limit
                          </Label>
                          <Input
                            id="newWarningLimit"
                            type="number"
                            value={newWarningLimit}
                            onChange={(e) =>
                              setNewWarningLimit(parseFloat(e.target.value))
                            }
                          />
                        </div>
                        <Button onClick={handleWarningLimitUpdate}>
                          Update Warning Limit
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Currency Converter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="euroAmount">Amount in Euro</Label>
                    <Input
                      id="euroAmount"
                      type="number"
                      value={euroAmount}
                      onChange={(e) => setEuroAmount(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleCurrencyConvert}>Convert</Button>
                  {bdtAmount && (
                    <p className="text-lg font-semibold">
                      {euroAmount} Euro = {bdtAmount} BDT
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-5">
              <CardHeader>
                <CardTitle>Top 5 Highest Salaries</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Designation</TableHead>
                      <TableHead>Salary</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedEmployees.slice(0, 5).map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.designation}</TableCell>
                        <TableCell>${employee.salary}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="employees">
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
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
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
                                  onChange={(e) =>
                                    setNewBaseSalary(e.target.value)
                                  }
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
                                <Label
                                  htmlFor="sal
aryChangeAmount"
                                >
                                  Amount
                                </Label>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
