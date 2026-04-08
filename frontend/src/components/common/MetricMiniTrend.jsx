import React from "react";
import { Box } from "@mui/material";
import { LineChart, Line } from "recharts";

const MetricMiniTrend = ({ points = [], color }) => {
  const data = (points || []).map((v, i) => ({ i, v }));

  if (!data.length) {
    return <Box sx={{ width: 88, height: 28, flexShrink: 0 }} />;
  }

  return (
    <Box sx={{ width: 88, height: 28, minWidth: 88, flexShrink: 0 }}>
      <LineChart width={88} height={28} data={data}>
        <Line
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={2}
          dot={{ r: 2 }}
        />
      </LineChart>
    </Box>
  );
};

export default MetricMiniTrend;