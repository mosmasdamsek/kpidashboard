import React from "react";
import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

import { useGetRisksByCategoryQuery } from "../../../services/riskregister/riskRegisterApi";
import { USE_MOCK } from "../../../config/appConfig";
import { mockByCategory } from "../../../data/riskregister/mockRiskDashboard";

const RiskCategoryChartCard = ({ filters, mockData }) => {
  const { data, isLoading, isError } = useGetRisksByCategoryQuery(filters, {
    skip: USE_MOCK,
  });

  const chartData = USE_MOCK ? mockData : data?.results || [];

  return (
    <Paper sx={{ 
      p: 3, 
      borderRadius: 4, 
      height: 360, 
      background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)" 
      }}
    >
      <Stack spacing={2} sx={{ height: "100%" }}>
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Risks by Category
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Distribution of registered risks across categories
          </Typography>
        </Box>

        <Box sx={{ flex: 1, minHeight: 240 }}>
          {isLoading ? (
            <Box sx={{ height: "100%", display: "grid", placeItems: "center" }}>
              <CircularProgress size={28} />
            </Box>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={[
                        "#8b5cf6",
                        "#06b6d4",
                        "#22c55e",
                        "#f59e0b",
                        "#ef4444",
                        "#3b82f6",
                      ][index % 6]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Box>

        {isError ? (
          <Typography variant="caption" color="warning.main">
            Could not load live data yet. Showing sample distribution.
          </Typography>
        ) : null}
      </Stack>
    </Paper>
  );
};

export default RiskCategoryChartCard;