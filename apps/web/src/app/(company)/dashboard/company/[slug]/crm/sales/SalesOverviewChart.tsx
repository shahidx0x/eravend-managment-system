import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@nx-next-shadcn/shadcn";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

const SalesOverviewChart = () => {
  const chartData = [
    { date: "1 Oct", salesAmount: 40000 },
    { date: "2 Oct", salesAmount: 32000 },
    { date: "3 Oct", salesAmount: 35000 },
    { date: "4 Oct", salesAmount: 25000 },
    { date: "5 Oct", salesAmount: 29000 },
    { date: "6 Oct", salesAmount: 24000 },
    { date: "7 Oct", salesAmount: 35000 },
    { date: "8 Oct", salesAmount: 33000 },
    { date: "9 Oct", salesAmount: 25000 },
  ]
  const chartConfig = {
    salesAmount: {
      label: "Sales Amount",
      color: "#000000",
    },
  } satisfies ChartConfig

  return (
    <ChartContainer className="mt-6" config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="salesAmount"
          type="natural"
          fill="var(--color-salesAmount)"
          fillOpacity={1}
          stroke="var(--color-salesAmount)"
        />
      </AreaChart>
    </ChartContainer>
  );
}

export default SalesOverviewChart;