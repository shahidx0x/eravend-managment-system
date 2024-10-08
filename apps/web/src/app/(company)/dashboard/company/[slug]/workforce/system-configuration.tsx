"use client";

import { useState } from "react";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@nx-next-shadcn/shadcn";

export default function SystemConfiguration() {
  const [workingHours, setWorkingHours] = useState({
    start: "09:00",
    end: "17:00",
  });
  const [holidays, setHolidays] = useState(["2023-01-01", "2023-12-25"]);
  const [leaveTypes, setLeaveTypes] = useState([
    "Vacation",
    "Sick Leave",
    "Personal Leave",
  ]);
  const [statusTypes, setStatusTypes] = useState([
    "On Duty",
    "On Vacation",
    "Illness",
    "Absent",
  ]);
  const [roles, setRoles] = useState([
    "Marketing",
    "Sales",
    "Developer",
  ]);

  const handleAddHoliday = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newHoliday = (event.target as HTMLFormElement).holiday.value;
    if (newHoliday && !holidays.includes(newHoliday)) {
      setHolidays([...holidays, newHoliday]);
      (event.target as HTMLFormElement).holiday.value = "";
    }
  };

  const handleAddLeaveType = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newLeaveType = (event.target as HTMLFormElement).leaveType.value;
    if (newLeaveType && !leaveTypes.includes(newLeaveType)) {
      setLeaveTypes([...leaveTypes, newLeaveType]);
      (event.target as HTMLFormElement).leaveType.value = "";
    }
  };

  const handleAddStatusType = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newStatusType = (event.target as HTMLFormElement).statusType.value;
    if (newStatusType && !statusTypes.includes(newStatusType)) {
      setStatusTypes([...statusTypes, newStatusType]);
      (event.target as HTMLFormElement).statusType.value = "";
    }
  };

  return (
    <div>
      <h2 className="my-4 text-2xl font-bold">System Configuration</h2>
      <div className="flex flex-wrap gap-4">
        <Card className="min-w-[300px] flex-1">
          <CardHeader>
            <CardTitle>Working Hours</CardTitle>
            <CardDescription>
              Set the standard working hours for your organization.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={workingHours.start}
                  onChange={(e) =>
                    setWorkingHours({ ...workingHours, start: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={workingHours.end}
                  onChange={(e) =>
                    setWorkingHours({ ...workingHours, end: e.target.value })
                  }
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Working Hours</Button>
          </CardFooter>
        </Card>
        <Card className="min-w-[300px] flex-1">
          <CardHeader>
            <CardTitle>Add Role</CardTitle>
            <CardDescription>
              Manage different Role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleAddStatusType}
              className="mb-4 flex space-x-2"
            >
              <Input name="role" placeholder="New Status Type" />
              <Button type="submit">Add</Button>
            </form>
            <ul className="space-y-2">
              {roles.map((role, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{role}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setRoles(roles.filter((_, i) => i !== index))
                    }
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
{/* 
        <Card className="min-w-[300px] flex-1">
          <CardHeader>
            <CardTitle>Holidays</CardTitle>
            <CardDescription>
              Manage official holidays for your organization.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddHoliday} className="mb-4 flex space-x-2">
              <Input name="holiday" type="date" />
              <Button type="submit">Add</Button>
            </form>
            <ul className="space-y-2">
              {holidays.map((holiday, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{holiday}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setHolidays(holidays.filter((_, i) => i !== index))
                    }
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card> */}

        <Card className="min-w-[300px] flex-1">
          <CardHeader>
            <CardTitle>Leave Types</CardTitle>
            <CardDescription>
              Manage different types of leave for your organization.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddLeaveType} className="mb-4 flex space-x-2">
              <Input name="leaveType" placeholder="New Leave Type" />
              <Button type="submit">Add</Button>
            </form>
            <ul className="space-y-2">
              {leaveTypes.map((leaveType, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{leaveType}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setLeaveTypes(leaveTypes.filter((_, i) => i !== index))
                    }
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="min-w-[300px] flex-1">
          <CardHeader>
            <CardTitle>Status Types</CardTitle>
            <CardDescription>
              Manage different status types for attendance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleAddStatusType}
              className="mb-4 flex space-x-2"
            >
              <Input name="statusType" placeholder="New Status Type" />
              <Button type="submit">Add</Button>
            </form>
            <ul className="space-y-2">
              {statusTypes.map((statusType, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{statusType}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setStatusTypes(statusTypes.filter((_, i) => i !== index))
                    }
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
    
      </div>
    </div>
  );
}
