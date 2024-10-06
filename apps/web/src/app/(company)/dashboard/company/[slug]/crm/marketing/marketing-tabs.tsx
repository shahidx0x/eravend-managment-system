"use client";


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

export default function MarketingTabs() {
  return (
   
      <Tabs defaultValue="active-campaign">
        <div className="w-full overflow-auto">
          <TabsList className="grid w-full min-w-[800px] grid-cols-5">
            <TabsTrigger value="active-campaign">Active Campaign</TabsTrigger>
            <TabsTrigger value="completed-campaign">
              Completed Campagin
            </TabsTrigger>
            <TabsTrigger value="archieved-campaign">
              Archieved Campaign
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="active-campaign"></TabsContent>
        <TabsContent value="completed-campaign"></TabsContent>
        <TabsContent value="archieved-campaign"></TabsContent>
      </Tabs>
      
  
  );
}
