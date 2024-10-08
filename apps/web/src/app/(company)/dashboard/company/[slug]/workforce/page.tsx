"use client";

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
  return (
    <div className="container p-4">
      <Tabs defaultValue="monitor-dashboard">
        <div className="w-full overflow-auto">
          <TabsList className="grid w-full min-w-[900px] grid-cols-5">
            <TabsTrigger value="monitor-dashboard">Monitor Dashboard</TabsTrigger>
            <TabsTrigger value="leave">Leave Management</TabsTrigger>
            <TabsTrigger value="attendance">Attendance Monitoring</TabsTrigger>
            <TabsTrigger value="employees">Employee Management</TabsTrigger>
            <TabsTrigger value="config">System Configuration</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="monitor-dashboard">
          <DashboardContent />
        </TabsContent>
        <TabsContent value="leave">
          <LeaveManagement />
        </TabsContent>
        <TabsContent value="attendance">
          <AttendanceMonitoring />
        </TabsContent>
        <TabsContent value="employees">
          <EmployeeManagement />
        </TabsContent>
        <TabsContent value="config">
          <SystemConfiguration />
        </TabsContent>
      </Tabs>
    </div>
  );
}