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

const trackerRows = [
  {
    id: "trk-001",
    division: "Finance",
    department: "Finance Operations",
    period: "Q1 2026",
    owner: "K. Molefe",
    supervisor: "M. Dube",
    status: "approved",
    updatedAt: "2026-03-18 14:20",
  },
  {
    id: "trk-002",
    division: "Finance",
    department: "Revenue Assurance",
    period: "Q1 2026",
    owner: "T. Dube",
    supervisor: "M. Dube",
    status: "submitted",
    updatedAt: "2026-03-18 09:10",
  },
  {
    id: "trk-003",
    division: "Operations",
    department: "Procurement",
    period: "Q1 2026",
    owner: "L. Moyo",
    supervisor: "R. Foster",
    status: "returned",
    updatedAt: "2026-03-17 16:42",
  },
  {
    id: "trk-004",
    division: "Engineering",
    department: "Infrastructure",
    period: "Q1 2026",
    owner: "B. Motse",
    supervisor: "Marcus Rivera",
    status: "draft",
    updatedAt: "2026-03-17 08:30",
  },
];

const summaryCards = [
  { label: "Total Departments", value: 24 },
  { label: "Approved", value: 12 },
  { label: "Submitted", value: 6 },
  { label: "Returned", value: 3 },
  { label: "Draft", value: 3 },
];

const StrategyTrackerPage = () => {
  return (
    <WorkspaceLayout
      role="strategy"
      title="Submission Tracker"
      subtitle="Monitor progress and workflow status across departments and divisions."
      actions={
        <Button variant="contained" sx={{ textTransform: "none", fontWeight: 700 }}>
          Export Tracker
        </Button>
      }
    >
      <Stack spacing={3}>
        <Box className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {summaryCards.map((card) => (
            <GlassCard key={card.label}>
              <CardContent>
                <Typography sx={{ fontSize: 12.5, color: softText }}>
                  {card.label}
                </Typography>
                <Typography sx={{ fontSize: 28, fontWeight: 900, mt: 1, color: white }}>
                  {card.value}
                </Typography>
              </CardContent>
            </GlassCard>
          ))}
        </Box>

        <GlassCard>
          <CardContent>
            <Typography sx={{ fontSize: 18, fontWeight: 800, mb: 2 }}>
              Reporting Workflow Status
            </Typography>

            <Stack spacing={2}>
              {trackerRows.map((row) => (
                <Box
                  key={row.id}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    border: `1px solid ${line}`,
                    bgcolor: panel2,
                  }}
                >
                  <Box className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-7">
                    <Box>
                      <Typography sx={{ fontSize: 12, color: softText }}>Division</Typography>
                      <Typography sx={{ fontWeight: 800, color: white }}>
                        {row.division}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 12, color: softText }}>Department</Typography>
                      <Typography sx={{ fontWeight: 800, color: white }}>
                        {row.department}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 12, color: softText }}>Period</Typography>
                      <Typography sx={{ fontWeight: 800, color: white }}>
                        {row.period}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 12, color: softText }}>Owner</Typography>
                      <Typography sx={{ fontWeight: 800, color: white }}>
                        {row.owner}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 12, color: softText }}>Supervisor</Typography>
                      <Typography sx={{ fontWeight: 800, color: white }}>
                        {row.supervisor}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 12, color: softText }}>Updated</Typography>
                      <Typography sx={{ fontWeight: 800, color: white }}>
                        {row.updatedAt}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 12, color: softText }}>Status</Typography>
                      <Box sx={{ mt: 0.5 }}>
                        <StatusChip status={row.status} />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </GlassCard>
      </Stack>
    </WorkspaceLayout>
  );
};

export default StrategyTrackerPage;