"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

import { FileText } from "lucide-react";

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
export default function LeaveRequest() {
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

  const [newLeaveRequest, setNewLeaveRequest] = useState<
    Omit<LeaveRequest, "id" | "status">
  >({
    type: "Sick",
    startDate: "",
    endDate: "",
  });
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);

  const handleLeaveRequest = () => {
    const newRequest: LeaveRequest = {
      ...newLeaveRequest,
      id: leaveRequests.length + 1,
      status: "Pending",
    };
    if (selectedDocument) {
      newRequest.document = {
        name: selectedDocument.name,
        url: URL.createObjectURL(selectedDocument),
      };
    }
    setLeaveRequests([...leaveRequests, newRequest]);
    setNewLeaveRequest({ type: "Sick", startDate: "", endDate: "" });
    setSelectedDocument(null);
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Request Leave</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="leave-type" className="text-right">
                Leave Type
              </Label>
              <Select
                value={newLeaveRequest.type}
                onValueChange={(value) =>
                  setNewLeaveRequest({
                    ...newLeaveRequest,
                    type: value as "Sick" | "Vacation",
                  })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sick">Sick Leave</SelectItem>
                  <SelectItem value="Vacation">Vacation Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start-date" className="text-right">
                Start Date
              </Label>
              <Input
                id="start-date"
                type="date"
                value={newLeaveRequest.startDate}
                onChange={(e) =>
                  setNewLeaveRequest({
                    ...newLeaveRequest,
                    startDate: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end-date" className="text-right">
                End Date
              </Label>
              <Input
                id="end-date"
                type="date"
                value={newLeaveRequest.endDate}
                onChange={(e) =>
                  setNewLeaveRequest({
                    ...newLeaveRequest,
                    endDate: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="document" className="text-right">
                Document
              </Label>
              <Input
                id="document"
                type="file"
                onChange={(e) =>
                  setSelectedDocument(e.target.files?.[0] || null)
                }
                className="col-span-3"
              />
            </div>
            <Button onClick={handleLeaveRequest} className="ml-auto">
              Submit Request
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Document</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.type}</TableCell>
                  <TableCell>{request.startDate}</TableCell>
                  <TableCell>{request.endDate}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    {request.document ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <FileText className="mr-2 h-4 w-4" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Document Preview</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            <img
                              src={request.document.url}
                              alt="Document preview"
                              className="max-h-96 w-full object-contain"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      "No document"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
