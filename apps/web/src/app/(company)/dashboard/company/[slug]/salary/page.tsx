import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@nx-next-shadcn/shadcn";

import EmployeeSalaray from "./employee-salaray";
import SalarayDashboard from "./salaray-dashboard";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <SalarayDashboard />
        </TabsContent>
        <TabsContent value="employees">
          <EmployeeSalaray />
        </TabsContent>
      </Tabs>
    </div>
  );
}
