"use client";

import { useState } from "react";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import {
  Button,
  Calendar,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nx-next-shadcn/shadcn";

export default function AttendanceMonitoring() {
  interface AttendanceRecord {
    id: number;
    employee: string;
    email: string;
    date: string;
    checkIn: string;
    checkOut: string;
    status: string;
  }
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([
    {
      id: 1,
      employee: "John Doe",
      email: "john@example.com",
      date: "2023-07-01",
      checkIn: "09:00",
      checkOut: "17:00",
      status: "Present",
    },
    {
      id: 2,
      employee: "Jane Smith",
      email: "jane@example.com",
      date: "2023-07-01",
      checkIn: "09:15",
      checkOut: "17:30",
      status: "Present",
    },
    {
      id: 3,
      employee: "Alice Johnson",
      email: "alice@example.com",
      date: "2023-07-02",
      checkIn: "08:55",
      checkOut: "17:05",
      status: "Present",
    },
    {
      id: 4,
      employee: "Bob Williams",
      email: "bob@example.com",
      date: "2023-07-02",
      checkIn: "09:10",
      checkOut: "17:20",
      status: "Present",
    },
  ]);

  const [editRecord, setEditRecord] = useState<AttendanceRecord | null>(null);
  const [emailFilter, setEmailFilter] = useState("");
  const [dateFilter, setDateFilter] = useState<Date | null>(null);

  const handleEdit = (record: AttendanceRecord) => {
    setEditRecord(record);
  };

  const handleSave = () => {
    if (editRecord) {
      setAttendanceRecords(
        attendanceRecords.map((record) =>
          record.id === editRecord.id ? editRecord : record,
        ),
      );
      setEditRecord(null);
    }
  };

  const filteredRecords = attendanceRecords.filter(
    (record) =>
      record.email.toLowerCase().includes(emailFilter.toLowerCase()) &&
      (!dateFilter || record.date === format(dateFilter, "yyyy-MM-dd")),
  );

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Attendance Monitoring</h2>

      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <Label htmlFor="email-filter">Filter by Email</Label>
          <Input
            id="email-filter"
            placeholder="Enter email to filter"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Label>Filter by Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFilter ? (
                  format(dateFilter, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dateFilter || undefined}
                onSelect={(date) => setDateFilter(date || null)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        {dateFilter && (
          <Button
            variant="ghost"
            onClick={() => setDateFilter(null)}
            className="mt-6"
          >
            Clear Date Filter
          </Button>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.employee}</TableCell>
              <TableCell>{record.email}</TableCell>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.checkIn}</TableCell>
              <TableCell>{record.checkOut}</TableCell>
              <TableCell>{record.status}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Attendance Record</DialogTitle>
                      <DialogDescription>
                        Make changes to the attendance record here. Click save
                        when youre done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="checkIn" className="text-right">
                          Check In
                        </Label>
                        <Input
                          id="checkIn"
                          value={editRecord?.checkIn || ""}
                          onChange={(e) =>
                            setEditRecord((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    checkIn: e.target.value,
                                  }
                                : null,
                            )
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="checkOut" className="text-right">
                          Check Out
                        </Label>
                        <Input
                          id="checkOut"
                          value={editRecord?.checkOut || ""}
                          onChange={(e) =>
                            setEditRecord((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    checkOut: e.target.value,
                                  }
                                : null,
                            )
                          }
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleSave}>
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
