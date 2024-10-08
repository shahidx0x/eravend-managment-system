import React from "react";

import { Award, BookOpen, Briefcase, Send } from "lucide-react";

import { Card, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger } from "@nx-next-shadcn/shadcn";

import MarketingDashboard from "./marketing-dashboard";

const page = () => {
  return (
    <div className="p-4">
      <CardTitle>Marketing Automation</CardTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <Card className="flex justify-between items-center px-6 py-4">
          <div className="flex justify-start items-center gap-2">
            <Briefcase className="text-muted-foreground m-1" />
            <span className="text-lg font-medium">Campaign</span>
          </div>
          <span className="text-lg font-medium">500</span>
        </Card>
        <Card className="flex justify-between items-center px-6 py-4">
          <div className="flex justify-start items-center gap-2">
            <Send className="text-muted-foreground m-1" />
            <span className="text-lg font-medium">Send</span>
          </div>
          <span className="text-lg font-medium">500</span>
        </Card>
        <Card className="flex justify-between items-center px-6 py-4">
          <div className="flex justify-start items-center gap-2">
            <BookOpen className="text-muted-foreground m-1" />
            <span className="text-lg font-medium">Opened</span>
          </div>
          <span className="text-lg font-medium">500</span>
        </Card>
        <Card className="flex justify-between items-center px-6 py-4">
          <div className="flex justify-start items-center gap-2">
            <Award className="text-muted-foreground m-1" />
            <span className="text-lg font-medium">Completed</span>
          </div>
          <span className="text-lg font-medium">500</span>
        </Card>
      </div>

      <Tabs defaultValue="active" className="mt-8">
        <TabsList>
          <TabsTrigger value="active">Active Campaign</TabsTrigger>
          <TabsTrigger value="completed">Completed Campaign</TabsTrigger>
          <TabsTrigger value="archived">Archived Campaign</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <MarketingDashboard />
        </TabsContent>
        <TabsContent value="completed">
          <MarketingDashboard />
        </TabsContent>
        <TabsContent value="archived">
          <MarketingDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
