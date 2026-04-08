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

const kpiTemplates = [
  {
    id: "kpi-001",
    name: "Revenue",
    code: "REV_001",
    unit: "BWP",
    direction: "Higher is better",
    category: "Financial",
    weight: 20,
    status: "approved",
  },
  {
    id: "kpi-002",
    name: "Operational Cost",
    code: "COST_001",
    unit: "BWP",
    direction: "Lower is better",
    category: "Efficiency",
    weight: 15,
    status: "approved",
  },
  {
    id: "kpi-003",
    name: "Customer Satisfaction",
    code: "CSAT_001",
    unit: "%",
    direction: "Higher is better",
    category: "Customer",
    weight: 15,
    status: "approved",
  },
  {
    id: "kpi-004",
    name: "Turnaround Time",
    code: "TAT_001",
    unit: "Days",
    direction: "Lower is better",
    category: "Operations",
    weight: 10,
    status: "draft",
  },
];

const StrategyTemplatesPage = () => {
  return (
    <WorkspaceLayout
      role="strategy"
      title="KPI Templates"
      subtitle="Define and manage KPI templates, units, calculation direction, and weights."
      actions={
        <Button variant="contained" sx={{ textTransform: "none", fontWeight: 700 }}>
          Create KPI Template
        </Button>
      }
    >
      <Stack spacing={2}>
        {kpiTemplates.map((template) => (
          <GlassCard key={template.id}>
            <CardContent>
              <Box className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <Box className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6 xl:gap-6">
                  <Box>
                    <Typography sx={{ fontSize: 12, color: softText }}>KPI Name</Typography>
                    <Typography sx={{ fontWeight: 800, color: white }}>
                      {template.name}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: 12, color: softText }}>Code</Typography>
                    <Typography sx={{ fontWeight: 800, color: white }}>
                      {template.code}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: 12, color: softText }}>Unit</Typography>
                    <Typography sx={{ fontWeight: 800, color: white }}>
                      {template.unit}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: 12, color: softText }}>Direction</Typography>
                    <Typography sx={{ fontWeight: 800, color: white }}>
                      {template.direction}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography sx={{ fontSize: 12, color: softText }}>Category</Typography>
                    <Typography sx={{ fontWeight: 800, color: white }}>
                      {template.category}
                    </Typography>
                    </Box>

                  <Box>
                    <Typography sx={{ fontSize: 12, color: softText }}>Weight</Typography>
                    <Typography sx={{ fontWeight: 800, color: white }}>
                      {template.weight}%
                    </Typography>
                  </Box>
                </Box>

                <Box className="flex items-center gap-2">
                  <StatusChip status={template.status} />
                  <Button variant="outlined" sx={{ textTransform: "none" }}>
                    Edit
                  </Button>
                  <Button variant="outlined" sx={{ textTransform: "none" }}>
                    Assign
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

export default StrategyTemplatesPage;