import React from "react";
import { Box } from "@mui/material";
import { AreaChart, Area } from "recharts";

const TinyTrend = ({ data = [], color }) => {
  const chartData = (data || []).map((v, i) => ({ i, v }));

  if (!chartData.length) {
    return <Box sx={{ width: 120, height: 62, flexShrink: 0 }} />;
  }

  return (
    <Box sx={{ width: 120, height: 62, flexShrink: 0 }}>
      <AreaChart width={120} height={62} data={chartData}>
        <defs>
          <linearGradient
            id={`g-${String(color).replace("#", "")}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="5%" stopColor={color} stopOpacity={0.35} />
            <stop offset="95%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          fill={`url(#g-${String(color).replace("#", "")})`}
          strokeWidth={3}
        />
      </AreaChart>
    </Box>
  );
};

export default TinyTrend;