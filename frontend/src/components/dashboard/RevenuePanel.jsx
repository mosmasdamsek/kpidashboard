import React from "react";
import { Box, CardContent, Stack, Typography } from "@mui/material";
import { Cell, Pie, PieChart, Tooltip as RechartsTooltip } from "recharts";
import GlassCard from "../common/GlassCard";
import SectionHeader from "../common/SectionHeader";
import ChartContainer from "../common/ChartContainer";
import { softText } from "../../theme/dashboardTokens";

const RevenuePanel = ({ segments = [] }) => {
  return (
    <GlassCard>
      <CardContent sx={{ p: 3 }}>
        <SectionHeader
          title="Revenue Segments"
          subtitle="Contribution by business segment"
        />

        <ChartContainer height={230} minWidth={250} sx={{ mt: 1.5 }}>
          <PieChart>
            <Pie
              data={segments}
              dataKey="value"
              innerRadius={55}
              outerRadius={88}
              paddingAngle={4}
            >
              {segments.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
            <RechartsTooltip />
          </PieChart>
        </ChartContainer>

        <Stack spacing={1.15} sx={{ mt: 0.5 }}>
          {segments.map((item) => (
            <Box key={item.name} className="flex items-center justify-between">
              <Box className="flex items-center gap-2">
                <Box
                  sx={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    bgcolor: item.color,
                  }}
                />
                <Typography sx={{ fontSize: 12.3, color: softText }}>
                  {item.name}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: 12.5, fontWeight: 800 }}>
                {item.value}%
              </Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </GlassCard>
  );
};

export default RevenuePanel;