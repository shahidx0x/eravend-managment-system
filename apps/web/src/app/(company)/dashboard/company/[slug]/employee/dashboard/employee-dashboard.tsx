"use client";

import React, { useState } from "react";

import { format } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  UserCheck,
  UserX,
} from "lucide-react";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nx-next-shadcn/shadcn";

const ITEMS_PER_PAGE = 5;

export default function EmployeeDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("");

  interface Attendance {
    id: number;
    date: string;
    checkIn: string;
    checkOut: string | null;
  }
  interface LeaveRequest {
    id: number;
    type: "Sick" | "Vacation";
    startDate: string;
    endDate: string;
    status: "Pending" | "Approved" | "Rejected";
    document?: {
      name: string;
      url: string;
    };
  }
  const [attendances, setAttendances] = useState<Attendance[]>([
    { id: 1, date: "2023-07-01", checkIn: "09:00", checkOut: "17:00" },
    { id: 2, date: "2023-07-02", checkIn: "08:55", checkOut: "17:05" },
    { id: 3, date: "2023-07-03", checkIn: "09:10", checkOut: "17:15" },
    { id: 4, date: "2023-07-04", checkIn: "08:50", checkOut: "16:55" },
    { id: 5, date: "2023-07-05", checkIn: "09:05", checkOut: "17:10" },
    { id: 6, date: "2023-07-06", checkIn: "09:00", checkOut: "17:00" },
    { id: 7, date: "2023-07-07", checkIn: "08:45", checkOut: "16:50" },
  ]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: 1,
      type: "Sick",
      startDate: "2023-07-10",
      endDate: "2023-07-11",
      status: "Approved",
      document: { name: "medical_certificate.pdf", url: "/placeholder.svg" },
    },
    {
      id: 2,
      type: "Vacation",
      startDate: "2023-08-01",
      endDate: "2023-08-05",
      status: "Pending",
    },
  ]);

  const handleCheckIn = () => {
    const now = new Date();
    const newAttendance: Attendance = {
      id: attendances.length + 1,
      date: format(now, "yyyy-MM-dd"),
      checkIn: format(now, "HH:mm"),
      checkOut: null,
    };
    setAttendances([...attendances, newAttendance]);
  };

  const handleCheckOut = () => {
    const now = new Date();
    const today = format(now, "yyyy-MM-dd");
    setAttendances(
      attendances.map((attendance) =>
        attendance.date === today && !attendance.checkOut
          ? { ...attendance, checkOut: format(now, "HH:mm") }
          : attendance,
      ),
    );
  };
  const filteredAttendances = dateFilter
    ? attendances.filter((attendance) => attendance.date === dateFilter)
    : attendances;

  const paginatedAttendances = filteredAttendances.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const totalPages = Math.ceil(filteredAttendances.length / ITEMS_PER_PAGE);

  const calculateStats = () => {
    const totalDays = attendances.length;
    const onTimeDays = attendances.filter((a) => a.checkIn <= "09:00").length;
    const lateDays = totalDays - onTimeDays;
    const averageCheckIn =
      attendances.reduce(
        (sum, a) => sum + parseFloat(a.checkIn.replace(":", ".")),
        0,
      ) / totalDays;
    const averageCheckOut =
      attendances.reduce(
        (sum, a) =>
          sum + (a.checkOut ? parseFloat(a.checkOut.replace(":", ".")) : 0),
        0,
      ) / totalDays;

    return {
      totalDays,
      onTimeDays,
      lateDays,
      averageCheckIn: averageCheckIn.toFixed(2).replace(".", ":"),
      averageCheckOut: averageCheckOut.toFixed(2).replace(".", ":"),
    };
  };

  const stats = calculateStats();
  return (
    <div>
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Todays Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <Button onClick={handleCheckIn}>
                <Clock className="mr-2 h-4 w-4" /> Check In
              </Button>
              <Button onClick={handleCheckOut}>
                <Clock className="mr-2 h-4 w-4" /> Check Out
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Attendance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <UserCheck className="mr-2 inline" /> On-time:{" "}
                {stats.onTimeDays} days
              </p>
              <p>
                <UserX className="mr-2 inline" /> Late: {stats.lateDays} days
              </p>
              <p>
                <Clock className="mr-2 inline" /> Avg. Check-in:{" "}
                {stats.averageCheckIn}
              </p>
              <p>
                <Clock className="mr-2 inline" /> Avg. Check-out:{" "}
                {stats.averageCheckOut}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                Pending:{" "}
                {leaveRequests.filter((r) => r.status === "Pending").length}
              </p>
              <p>
                Approved:{" "}
                {leaveRequests.filter((r) => r.status === "Approved").length}
              </p>
              <p>
                Rejected:{" "}
                {leaveRequests.filter((r) => r.status === "Rejected").length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center">
            <Label htmlFor="date-filter" className="mr-2">
              Filter by Date:
            </Label>
            <Input
              id="date-filter"
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-auto"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAttendances.map((attendance) => (
                <TableRow key={attendance.id}>
                  <TableCell>{attendance.date}</TableCell>
                  <TableCell>{attendance.checkIn}</TableCell>
                  <TableCell>
                    {attendance.checkOut || "Not checked out"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex items-center justify-between">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
