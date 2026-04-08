import React from "react";
import { Button, CardContent, Chip } from "@mui/material";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import GlassCard from "../common/GlassCard";
import SectionHeader from "../common/SectionHeader";
import ChartContainer from "../common/ChartContainer";
import { blue, cyan, line, purple, softText } from "../../theme/dashboardTokens";

const periodLabelMap = {
  last_7_days: "Last 7 days",
  last_30_days: "Last 30 days",
  this_quarter: "This quarter",
  this_year: "This year",
};

const TrendsPanel = ({ data = [], period = "last_30_days" }) => {
  const periodLabel = periodLabelMap[period] || "Last 30 days";

  return (
    <GlassCard>
      <CardContent sx={{ p: 3 }}>
        <SectionHeader
          title="Divisional Trends"
          subtitle="Comparative movement across top-performing divisions"
          action={
            <Chip
              label={periodLabel}
              size="small"
              sx={{
                color: softText,
                fontWeight: 700,
              }}
            />
          }
        />

        <ChartContainer height={320} minWidth={300} sx={{ mt: 2.5 }}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={line} />
            <XAxis dataKey="week" tickLine={false} axisLine={false} stroke={softText} />
            <YAxis
              tickLine={false}
              axisLine={false}
              stroke={softText}
              domain={[60, 95]}
            />
            <RechartsTooltip />
            <Line type="monotone" dataKey="sales" stroke={blue} strokeWidth={3} dot={{ r: 4 }} />
            <Line
              type="monotone"
              dataKey="marketing"
              stroke={cyan}
              strokeWidth={3}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="product"
              stroke={purple}
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </GlassCard>
  );
};

export default TrendsPanel;