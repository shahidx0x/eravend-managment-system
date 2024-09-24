import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@nx-next-shadcn/shadcn";

import EmployeeDashboard from "./employee-dashboard";
import LeaveRequest from "./leave-request";
import ProfileSettings from "./profile-settings";

export default function AttendanceSystem() {
  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="dashboard" className="mb-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="leave">Leave Requests</TabsTrigger>
          <TabsTrigger value="profile">Profile Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <EmployeeDashboard />
        </TabsContent>

        <TabsContent value="leave">
          <LeaveRequest />
        </TabsContent>
        <TabsContent value="profile">
          <ProfileSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
