import React from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useGetRisksByDivisionQuery } from "../../../services/riskregister/riskRegisterApi";
import { USE_MOCK } from "../../../config/appConfig";
import { mockByDivision } from "../../../data/riskregister/mockRiskDashboard";

const RiskDivisionChartCard = ({ filters, mockData }) => {
  const { data, isLoading, isError } = useGetRisksByDivisionQuery(filters, {
    skip: USE_MOCK,
  });

  const chartData = USE_MOCK ? mockData : data?.results || [];

  return (
    <Paper sx={{ p: 3, borderRadius: 4, height: 360, background:
      "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)"}}>
      <Stack spacing={2} sx={{ height: "100%" }}>
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Risks by Division
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Distribution of registered risks across divisions
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
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: -18, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#06b6d4" />
              </BarChart>
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

export default RiskDivisionChartCard;