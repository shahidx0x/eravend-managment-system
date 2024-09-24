"use client";

import { useState } from "react";



import { Search, Eye } from "lucide-react";

import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@nx-next-shadcn/shadcn";

interface LeaveRequest {
  id: number;
  employee: string;
  type: string;
  startDate: string;
  endDate: string;
  status: "Pending" | "Approved" | "Rejected";
  document?: {
    name: string;
    type: string;
    url: string;
  };
}

export default function LeaveManagementAdmin() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: 1,
      employee: "John Doe",
      type: "Vacation",
      startDate: "2023-07-01",
      endDate: "2023-07-05",
      status: "Pending",
      document: {
        name: "vacation_request.pdf",
        type: "application/pdf",
        url: "/placeholder.svg?height=300&width=300",
      },
    },
    {
      id: 2,
      employee: "Jane Smith",
      type: "Sick Leave",
      startDate: "2023-07-03",
      endDate: "2023-07-04",
      status: "Approved",
      document: {
        name: "medical_certificate.jpg",
        type: "image/jpeg",
        url: "/placeholder.svg?height=300&width=300",
      },
    },
    {
      id: 3,
      employee: "Alice Johnson",
      type: "Personal Leave",
      startDate: "2023-07-10",
      endDate: "2023-07-12",
      status: "Pending",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<
    LeaveRequest["document"] | null
  >(null);

  const handleApprove = (id: number) => {
    setLeaveRequests(
      leaveRequests.map((request) =>
        request.id === id ? { ...request, status: "Approved" } : request,
      ),
    );
  };

  const handleReject = (id: number) => {
    setLeaveRequests(
      leaveRequests.map((request) =>
        request.id === id ? { ...request, status: "Rejected" } : request,
      ),
    );
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredRequests = leaveRequests.filter((request) =>
    Object.values(request).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-2xl font-bold">Leave Management</h2>
      <div className="mb-4 flex items-center">
        <Search className="mr-2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search leave requests..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Document</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.employee}</TableCell>
              <TableCell>{request.type}</TableCell>
              <TableCell>{request.startDate}</TableCell>
              <TableCell>{request.endDate}</TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>
                {request.document ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Document
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Document Preview</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        {request.document.type.startsWith("image/") ? (
                          <img
                            src={request.document.url}
                            alt="Uploaded document"
                            className="max-h-96 w-full object-contain"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center rounded border p-4">
                            <p className="mb-2 text-lg font-semibold">
                              {request.document.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {request.document.type}
                            </p>
                            <Button
                              className="mt-4"
                              onClick={() =>
                                window.open(request.document?.url, "_blank")
                              }
                            >
                              Download Document
                            </Button>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <span className="text-gray-500">No document</span>
                )}
              </TableCell>
              <TableCell>
                {request.status === "Pending" && (
                  <>
                    <Button
                      onClick={() => handleApprove(request.id)}
                      className="mr-2"
                      size="sm"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(request.id)}
                      variant="destructive"
                      size="sm"
                    >
                      Reject
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}