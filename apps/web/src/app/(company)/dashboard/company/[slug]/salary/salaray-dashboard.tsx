"use client";

import React, { useEffect, useState } from "react";

import { AlertCircle, ChevronLeft, ChevronRight, Plus } from "lucide-react";
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
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Alert,
  AlertDescription,
  AlertTitle,
  CardDescription,
  Textarea,
} from "@nx-next-shadcn/shadcn";

export default function SalarayDashboard() {
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
  const [costingHistory, setCostingHistory] = useState([
    { id: 1, amount: 1000, details: "Office supplies", date: "2023-06-01" },
    { id: 2, amount: 5000, details: "Software licenses", date: "2023-06-15" },
    { id: 3, amount: 2000, details: "Team building event", date: "2023-07-01" },
  ]);
  const [currentBudget, setCurrentBudget] = useState(75000);
  const [newCostDetails, setNewCostDetails] = useState("");
  const [newCostAmount, setNewCostAmount] = useState("");
  const [totalBudget, setTotalBudget] = useState(100000);
  const [warningLimit, setWarningLimit] = useState(90000);
  const [euroAmount, setEuroAmount] = useState("");
  const [bdtAmount, setBdtAmount] = useState("");
  const [newTotalBudget, setNewTotalBudget] = useState(totalBudget);
  const [newWarningLimit, setNewWarningLimit] = useState(warningLimit);
  const [costingPage, setCostingPage] = useState(1);
  const [costsPerPage] = useState(5);
  useEffect(() => {
    const calculatedBudget = employees.reduce(
      (sum, emp) => sum + emp.salary,
      0,
    );
    setCurrentBudget(calculatedBudget);
  }, [employees]);
  const handleCurrencyConvert = () => {
    const rate = 115;
    const bdt = parseFloat(euroAmount) * rate;
    setBdtAmount(bdt.toFixed(2));
  };
  const handleAddCost = () => {
    if (newCostAmount && newCostDetails) {
      const newCost = {
        id: costingHistory.length + 1,
        amount: parseFloat(newCostAmount),
        details: newCostDetails,
        date: new Date().toISOString().split("T")[0],
      };
      setCostingHistory([...costingHistory, newCost]);
      setNewCostAmount("");
      setNewCostDetails("");
    }
  };
  const handleTotalBudgetUpdate = () => {
    setTotalBudget(newTotalBudget);
  };

  const handleWarningLimitUpdate = () => {
    setWarningLimit(newWarningLimit);
  };

  const sortedEmployees = [...employees].sort((a, b) => b.salary - a.salary);
  const indexOfLastCost = costingPage * costsPerPage;
  const indexOfFirstCost = indexOfLastCost - costsPerPage;
  const currentCosts = costingHistory.slice(indexOfFirstCost, indexOfLastCost);

  const totalCostPages = Math.ceil(costingHistory.length / costsPerPage);

  const handlePrevCostPage = () => {
    setCostingPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextCostPage = () => {
    setCostingPage((prev) => Math.min(prev + 1, totalCostPages));
  };

  const budgetData = [
    { name: "Total Budget", amount: totalBudget },
    { name: "Current Budget", amount: currentBudget },
    { name: "Warning Limit", amount: warningLimit },
  ];
  return (
    <div>
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
                      <Label htmlFor="newTotalBudget">New Total Budget</Label>
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
                      <Label htmlFor="newWarningLimit">New Warning Limit</Label>
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
        {/* <Card className="md:col-span-5">
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
        </Card> */}
        <Card className="md:col-span-5">
          <CardHeader>
            <CardTitle>Costing History</CardTitle>
            <CardDescription>Track and manage company expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Cost
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Cost</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="newCostAmount">Amount</Label>
                      <Input
                        id="newCostAmount"
                        type="number"
                        value={newCostAmount}
                        onChange={(e) => setNewCostAmount(e.target.value)}
                        placeholder="Enter amount"
                      />
                    </div>
                    <div>
                      <Label htmlFor="newCostDetails">Details</Label>
                      <Textarea
                        id="newCostDetails"
                        value={newCostDetails}
                        onChange={(e) => setNewCostDetails(e.target.value)}
                        placeholder="Enter cost details"
                      />
                    </div>
                    <Button onClick={handleAddCost}>Add Cost</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentCosts.map((cost) => (
                  <TableRow key={cost.id}>
                    <TableCell>{cost.date}</TableCell>
                    <TableCell>${cost.amount}</TableCell>
                    <TableCell>{cost.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex items-center justify-between">
              <Button onClick={handlePrevCostPage} disabled={costingPage === 1}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <span>
                Page {costingPage} of {totalCostPages}
              </span>
              <Button
                onClick={handleNextCostPage}
                disabled={costingPage === totalCostPages}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
