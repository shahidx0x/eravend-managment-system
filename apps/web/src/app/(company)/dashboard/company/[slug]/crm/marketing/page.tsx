import React from "react";

import { Award, BookOpen, Briefcase, Send } from "lucide-react";

import { Card, CardContent, CardTitle } from "@nx-next-shadcn/shadcn";

import CampaignFilter from "./marketing-dashboard";
import MarketingDashboard from "./marketing-dashboard";
import MarketingTabs from "./marketing-tabs";

const page = () => {
  return (
    <div>
      <div className="m-5 space-y-6">
        <div>
          <h1>Marketing Automation</h1>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="m-4 flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex flex-row justify-start">
                <Briefcase className="text-muted-foreground m-1" />
                <CardTitle className="m ml-2 text-lg font-medium">
                  Campaign
                </CardTitle>
              </div>
              <CardTitle className="text-lg font-medium">500</CardTitle>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="m-4 flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex flex-row justify-start">
                <Send className="text-muted-foreground m-1" />
                <CardTitle className="ml-2 text-lg font-medium">Send</CardTitle>
              </div>
              <CardTitle className="text-lg font-medium">500</CardTitle>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="m-4 flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex flex-row justify-start">
                <BookOpen className="text-muted-foreground m-1" />
                <CardTitle className="ml-2 text-lg font-medium">
                  Opened
                </CardTitle>
              </div>
              <CardTitle className="text-lg font-medium">500</CardTitle>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="m-4 flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex flex-row justify-start">
                <Award className="text-muted-foreground m-1" />
                <CardTitle className="ml-2 text-lg font-medium">
                  Completed
                </CardTitle>
              </div>
              <CardTitle className="text-lg font-medium">500</CardTitle>
            </CardContent>
          </Card>
        </div>
      </div>

      <MarketingTabs />
      <MarketingDashboard />
    </div>
  );
};

export default page;
