"use client";

import { useState } from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@nx-next-shadcn/shadcn";

import AttendanceMonitoring from "./attendance-monitoring";
import DashboardContent from "./dashboard-content";
import EmployeeManagement from "./employee-managment";
import LeaveManagement from "./leave-managment";
import SystemConfiguration from "./system-configuration";

export default function Dashboard() {
  const [notifications, setNotifications] = useState(0);

  return (
    <div className="container mx-auto p-4">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Workforce Monitor / Management</h1>
      </header>

      <Tabs defaultValue="monitor-dashboard">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="monitor-dashboard">Monitor Dashboard</TabsTrigger>
          <TabsTrigger value="leave">Leave Management</TabsTrigger>
          <TabsTrigger value="attendance">Attendance Monitoring</TabsTrigger>
          {/* <TabsTrigger value="employees">Employee Management</TabsTrigger> */}
          <TabsTrigger value="config">System Configuration</TabsTrigger>
        </TabsList>
        <TabsContent value="monitor-dashboard">
          <DashboardContent />
        </TabsContent>
        <TabsContent value="leave">
          <LeaveManagement />
        </TabsContent>
        <TabsContent value="attendance">
          <AttendanceMonitoring />
        </TabsContent>
        {/* <TabsContent value="employees">
          <EmployeeManagement />
        </TabsContent> */}
        <TabsContent value="config">
          <SystemConfiguration />
        </TabsContent>
      </Tabs>
    </div>
  );
}
