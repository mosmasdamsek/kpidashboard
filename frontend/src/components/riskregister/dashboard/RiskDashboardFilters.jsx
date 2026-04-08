import React, { useMemo } from "react";
import { Box, MenuItem, TextField } from "@mui/material";
import { mockRiskRegisters } from "../../../data/riskregister/mockRiskDashboard";

const RiskDashboardFilters = ({ filters, onChange }) => {
  const reportingPeriods = useMemo(() => {
    const values = new Set();

    (mockRiskRegisters || []).forEach((register) => {
      const period = register?.reporting_period?.name;
      if (period) values.add(period);
    });

    return Array.from(values).sort();
  }, []);

  const departments = useMemo(() => {
    const values = new Set();

    (mockRiskRegisters || []).forEach((register) => {
      const dept =
        register?.Department?.name || register?.department?.name;
      if (dept) values.add(dept);
    });

    return Array.from(values).sort();
  }, []);

  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
      <TextField
        select
        size="small"
        label="Reporting Period"
        value={filters.reporting_period || "current"}
        onChange={(e) => onChange("reporting_period", e.target.value)}
        sx={{ minWidth: 220 }}
      >
        <MenuItem value="current">Current</MenuItem>
        <MenuItem value="all">All</MenuItem>
        {reportingPeriods.map((period) => (
          <MenuItem key={period} value={period}>
            {period}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        size="small"
        label="Department"
        value={filters.department || "all"}
        onChange={(e) => onChange("department", e.target.value)}
        sx={{ minWidth: 220 }}
      >
        <MenuItem value="all">All</MenuItem>
        {departments.map((department) => (
          <MenuItem key={department} value={department}>
            {department}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default RiskDashboardFilters;