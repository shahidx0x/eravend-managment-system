import { Card, CardContent, CardHeader, CardTitle } from "@nx-next-shadcn/shadcn";
import { ArrowDown, ArrowUp, Ellipsis } from "lucide-react";

const SalesOverviewCard: React.FC<{
  title: string;
  amount: number;
  isUp: boolean;
  percentage: number;
  lastYear: number;
}> = ({ title, amount, isUp, percentage, lastYear }) => {
  return (
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="text-muted-foreground flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Ellipsis className="w-6" />
      </CardHeader>
      <CardContent className="mt-4">
        <div className="flex justify-between items-center gap-4">
          <span className="text-2xl font-bold">${amount}K</span>
          <div className="text-sm bg-black text-white flex justify-center items-center gap-2 px-3 py-1 rounded-full">
            {
              isUp ? <ArrowUp /> : <ArrowDown />
            }
            <span>{percentage}%</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Last year ${lastYear}
        </p>
      </CardContent>
    </Card>
  );
};

export default SalesOverviewCard;