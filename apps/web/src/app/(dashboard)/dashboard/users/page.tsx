"use client";

import React, { useState } from "react";

import { Badge } from "@nx-next-shadcn/shadcn";
import { Button } from "@nx-next-shadcn/shadcn";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@nx-next-shadcn/shadcn";
import { Input } from "@nx-next-shadcn/shadcn";
import { Label } from "@nx-next-shadcn/shadcn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@nx-next-shadcn/shadcn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@nx-next-shadcn/shadcn";

// Mock data
const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    contact: "+1234567890",
    company: "Tech Innovators",
    role: "Developer",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    contact: "+1987654321",
    company: "Tech Innovators",
    role: "Manager",
    status: "Active",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    contact: "+1122334455",
    company: "Creative Designs",
    role: "Designer",
    status: "Active",
  },
  {
    id: 4,
    name: "Bob Wilson",
    email: "bob@example.com",
    contact: "+1555666777",
    company: "Creative Designs",
    role: "Admin",
    status: "Blocked",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie@example.com",
    contact: "+1999888777",
    company: "Data Solutions",
    role: "Analyst",
    status: "Active",
  },
];

const initialCompanies = [
  "Tech Innovators",
  "Creative Designs",
  "Data Solutions",
];
const initialRoles = ["Developer", "Designer", "Manager", "Admin", "Analyst"];
const userStatuses = ["Active", "Blocked"];

export default function UserManagment() {
  const [users, setUsers] = useState(initialUsers);
  const [companies] = useState(initialCompanies);
  const [roles, setRoles] = useState(initialRoles);
  const [newRole, setNewRole] = useState("");
  const [filterCompany, setFilterCompany] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    contact: "",
    company: "",
    role: "",
    status: "Active",
  });
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);

  type HandleRoleChange = (userId: number, newRole: string) => void;
  type HandleStatusChange = (userId: number, newStatus: string) => void;

  const handleRoleChange: HandleRoleChange = (userId, newRole) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user,
      ),
    );
  };

  const handleStatusChange: HandleStatusChange = (userId, newStatus) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user,
      ),
    );
  };

  const handleAddRole = () => {
    if (newRole && !roles.includes(newRole)) {
      setRoles([...roles, newRole]);
      setNewRole("");
    }
  };

  const handleAddUser = () => {
    if (
      newUser.name &&
      newUser.email &&
      newUser.contact &&
      newUser.company &&
      newUser.role
    ) {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
      setNewUser({
        name: "",
        email: "",
        contact: "",
        company: "",
        role: "",
        status: "Active",
      });
      setIsAddUserDialogOpen(false);
    }
  };

  const filteredUsers = filterCompany
    ? users.filter((user) => user.company === filterCompany)
    : users;

  return (
    <div className="container mx-auto space-y-6 p-4">
      <h1 className="mb-6 text-3xl font-bold">User and Role Managment</h1>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 w-full">
        <Select onValueChange={setFilterCompany}>
          <SelectTrigger className="w-full max-w-[200px]">
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="select">All Companies</SelectItem>
            {companies.map((company) => (
              <SelectItem key={company} value={company}>
                {company}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add New Role</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Role</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new-role" className="text-right">
                    Role Name
                  </Label>
                  <Input
                    id="new-role"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <Button onClick={handleAddRole}>Add Role</Button>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isAddUserDialogOpen}
            onOpenChange={setIsAddUserDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>Add New User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
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
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contact" className="text-right">
                    Contact
                  </Label>
                  <Input
                    id="contact"
                    value={newUser.contact}
                    onChange={(e) =>
                      setNewUser({ ...newUser, contact: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="company" className="text-right">
                    Company
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setNewUser({ ...newUser, company: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company} value={company}>
                          {company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setNewUser({ ...newUser, role: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select role" />
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
              <Button onClick={handleAddUser}>Add User</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-md border">
        <Table className="w-full min-w-[1200px]">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.contact}</TableCell>
                <TableCell>{user.company}</TableCell>
                <TableCell>
                  <Select
                    onValueChange={(newRole) =>
                      handleRoleChange(user.id, newRole)
                    }
                    defaultValue={user.role}
                  >
                    <SelectTrigger>
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
                </TableCell>
                <TableCell>
                  <Select
                    onValueChange={(newStatus) =>
                      handleStatusChange(user.id, newStatus)
                    }
                    defaultValue={user.status}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {userStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          <Badge
                            className={
                              status === "Active"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }
                          >
                            {status}
                          </Badge>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
