import React from "react";
import {
  Box,
  Button,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import WorkspaceLayout from "../../layouts/WorkspaceLayout";
import GlassCard from "../../components/common/GlassCard";
import StatusChip from "../../components/common/StatusChip";
import { softText, white } from "../../theme/dashboardTokens";

const periods = [
  {
    id: "2026-q1",
    name: "Q1 2026",
    startDate: "01 Jan 2026",
    endDate: "31 Mar 2026",
    deadline: "31 Mar 2026",
    status: "submitted",
  },
  {
    id: "2025-q4",
    name: "Q4 2025",
    startDate: "01 Oct 2025",
    endDate: "31 Dec 2025",
    deadline: "31 Dec 2025",
    status: "locked",
  },
  {
    id: "2026-q2",
    name: "Q2 2026",
    startDate: "01 Apr 2026",
    endDate: "30 Jun 2026",
    deadline: "30 Jun 2026",
    status: "draft",
  },
];

const StrategyPeriodsPage = () => {
  return (
    <WorkspaceLayout
      role="strategy"
      title="Reporting Periods"
      subtitle="Manage reporting windows, timelines, and period status."
      actions={
        <Button variant="contained" sx={{ textTransform: "none", fontWeight: 700 }}>
          Create Period
        </Button>
      }
    >
      <Stack spacing={2}>
        {periods.map((period) => (
          <GlassCard key={period.id}>
            <CardContent>
              <Box className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <Box className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
                  <Box>
                    <Typography sx={{ fontSize: 12, color: softText }}>Period</Typography>
                    <Typography sx={{ fontWeight: 800, color: white }}>
                      {period.name}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: 12, color: softText }}>Start Date</Typography>
                    <Typography sx={{ fontWeight: 800, color: white }}>
                      {period.startDate}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: 12, color: softText }}>End Date</Typography>
                    <Typography sx={{ fontWeight: 800, color: white }}>
                      {period.endDate}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: 12, color: softText }}>Deadline</Typography>
                    <Typography sx={{ fontWeight: 800, color: white }}>
                      {period.deadline}
                    </Typography>
                  </Box>
                </Box>

                <Box className="flex items-center gap-2">
                  <StatusChip status={period.status} />
                  <Button variant="outlined" sx={{ textTransform: "none" }}>
                    Open
                  </Button>
                  <Button variant="outlined" sx={{ textTransform: "none" }}>
                    Edit
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </GlassCard>
        ))}
      </Stack>
    </WorkspaceLayout>
  );
};

export default StrategyPeriodsPage;