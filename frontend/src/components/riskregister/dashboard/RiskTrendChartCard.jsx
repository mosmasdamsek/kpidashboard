import React from "react";
import { Box, CircularProgress, Paper, Stack, Typography,} from "@mui/material";
import {ResponsiveContainer, AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip,} from "recharts";

import { useGetRiskTrendQuery } from "../../../services/riskregister/riskRegisterApi";
import { USE_MOCK } from "../../../config/appConfig";
import { mockTrend } from "../../../data/riskregister/mockRiskDashboard";

const RiskTrendChartCard = ({ filters, mockData }) => {
  const { data, isLoading, isError } = useGetRiskTrendQuery(filters, {
    skip: USE_MOCK,
  });

  const chartData = USE_MOCK ? mockData : data?.results || [];

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
        height: 360,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)",
      }}
    >
      <Stack spacing={2} sx={{ height: "100%" }}>
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Risk Trend
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Movement in total risk exposure over time
          </Typography>
        </Box>

        <Box sx={{ flex: 1, minHeight: 240 }}>
          {isLoading ? (
            <Box
              sx={{
                height: "100%",
                display: "grid",
                placeItems: "center",
              }}
            >
              <CircularProgress size={28} />
            </Box>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 8, right: 8, left: -18, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.12}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </Box>

        {isError ? (
          <Typography variant="caption" color="warning.main">
            Could not load live data yet. Showing sample trend.
          </Typography>
        ) : null}
      </Stack>
    </Paper>
  );
};

export default RiskTrendChartCard;