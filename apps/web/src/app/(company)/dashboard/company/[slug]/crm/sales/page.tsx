"use client";
import { Card, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@nx-next-shadcn/shadcn";
import SalesOverviewCard from "./SalesOverviewCard";
import { useState } from "react";
import SalesOverviewChart from "./SalesOverviewChart";
import SalesChartTable from "./SalesChartTable";

const Page = () => {
  const [timeRange, setTimeRange] = useState("90d");

  return <div className="container p-4">
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <Card className="p-4">
        <CardTitle>Sales Analytics Overview</CardTitle>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <SalesOverviewCard title="Total Sales" amount={48.8} isUp={true} percentage={36.1} lastYear={32456} />
          <SalesOverviewCard title="Total Purchase" amount={14.2} isUp={true} percentage={44.7} lastYear={14.83} />
          <SalesOverviewCard title="Return" amount={345.6} isUp={false} percentage={-12.7} lastYear={342} />
          <SalesOverviewCard title="Marketing" amount={10.2} isUp={true} percentage={34.7} lastYear={12843} />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex justify-between items-center gap-4">
          <CardTitle>Sales Statistics Overview</CardTitle>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="w-[160px] rounded-lg"
              aria-label="Select a value"
            >
              <SelectValue placeholder="This month" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                This month
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                This week
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <SalesOverviewChart />
      </Card>

      <Card className="p-4 xl:col-span-2">
        <CardTitle>Sales Chart</CardTitle>
        <SalesChartTable />
      </Card>
    </div>
  </div>
};

export default Page;
