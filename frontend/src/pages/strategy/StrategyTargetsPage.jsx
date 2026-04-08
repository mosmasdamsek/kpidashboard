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
import { line, panel2, softText, white } from "../../theme/dashboardTokens";

const targetAssignments = [
  {
    id: "tgt-001",
    period: "Q1 2026",
    division: "Finance",
    department: "Finance Operations",
    kpi: "Revenue",
    target: "8,000,000",
    weight: "20%",
    status: "approved",
  },
  {
    id: "tgt-002",
    period: "Q1 2026",
    division: "Finance",
    department: "Finance Operations",
    kpi: "Operational Cost",
    target: "2,400,000",
    weight: "15%",
    status: "approved",
  },
  {
    id: "tgt-003",
    period: "Q1 2026",
    division: "Operations",
    department: "Procurement",
    kpi: "Turnaround Time",
    target: "14",
    weight: "10%",
    status: "draft",
  },
  {
    id: "tgt-004",
    period: "Q1 2026",
    division: "Customer Experience",
    department: "Service Desk",
    kpi: "Customer Satisfaction",
    target: "90",
    weight: "15%",
    status: "approved",
  },
];

const StrategyTargetsPage = () => {
  return (
    <WorkspaceLayout
      role="strategy"
      title="Target Setup"
      subtitle="Assign KPI targets, weights, and reporting expectations by period and unit."
      actions={
        <Button variant="contained" sx={{ textTransform: "none", fontWeight: 700 }}>
          Add Target Assignment
        </Button>
      }
    >
      <Stack spacing={2}>
        {targetAssignments.map((item) => (
          <GlassCard key={item.id}>
            <CardContent>
              <Box className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <Box className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-7 xl:gap-6">
                  <Box>
                    <Typography sx={{ fontSize: 12, color: softText }}>Period</Typography>
                    <Typography sx={{ fontWeight: 800, color: white }}>
                      {item.period}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: 12, color: softText }}>Division</Typography>
                    <Typography sx={{ fontWeight: 800, color: white }}>
                      {item.division}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: 12, color: softText }}>Department</Typography>
                    <Typography sx={{ fontWeight: 800, color: white }}>
                      {item.department}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: 12, color: softText }}>KPI</Typography>
                    <Typography sx={{ fontWeight: 800, color: white }}>
                      {item.kpi}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: 12, color: softText }}>Target</Typography>
                    <Typography sx={{ fontWeight: 800, color: white }}>
                      {item.target}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: 12, color: softText }}>Weight</Typography>
                    <Typography sx={{ fontWeight: 800, color: white }}>
                      {item.weight}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: 12, color: softText }}>Status</Typography>
                    <Box sx={{ mt: 0.5 }}>
                      <StatusChip status={item.status} />
                    </Box>
                  </Box>
                </Box>

                <Box className="flex items-center gap-2">
                  <Button variant="outlined" sx={{ textTransform: "none" }}>
                    Edit
                  </Button>
                  <Button variant="outlined" sx={{ textTransform: "none" }}>
                    Reassign
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

export default StrategyTargetsPage;