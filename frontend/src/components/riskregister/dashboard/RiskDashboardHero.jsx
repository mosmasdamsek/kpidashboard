import React from "react";
import { Paper, Stack, Typography, Chip } from "@mui/material";

const RiskDashboardHero = ({ filters = {} }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
      }}
    >
      <Stack spacing={1.5}>
        <Typography variant="h4" fontWeight={800}>
          Risk Register Dashboard
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Monitor risk exposure, mitigation progress, overdue actions, and review priorities.
        </Typography>

        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <Chip label={`Period: ${filters.reporting_period || "All"}`} />
          <Chip label={`Department: ${filters.department || "All"}`} />
          <Chip label={`Category: ${filters.category || "All"}`} />
          <Chip label={`Owner: ${filters.owner || "All"}`} />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default RiskDashboardHero;