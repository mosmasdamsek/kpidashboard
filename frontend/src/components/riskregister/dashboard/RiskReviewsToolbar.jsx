import React, { useMemo } from "react";
import { Grid, MenuItem, Paper, TextField } from "@mui/material";
import {
  mockRiskRegisters,
  mockRiskItems,
  mockReviewItems,
} from "../../../data/riskregister/mockRiskDashboard";

const RiskReviewsToolbar = ({ filters, onChange }) => {
  const handleChange = (field) => (event) => {
    onChange((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const departments = useMemo(() => {
    const values = new Set();

    (mockRiskRegisters || []).forEach((register) => {
      const dept = register?.Department?.name || register?.department?.name;
      if (dept) values.add(dept);
    });

    return Array.from(values).sort();
  }, []);

  const categories = useMemo(() => {
    const values = new Set();

    (mockRiskItems || []).forEach((risk) => {
      const category = risk?.category?.name;
      if (category) values.add(category);
    });

    return Array.from(values).sort();
  }, []);

  const periods = useMemo(() => {
    const values = new Set();

    (mockRiskRegisters || []).forEach((register) => {
      const period = register?.reporting_period?.name;
      if (period) values.add(period);
    });

    return Array.from(values).sort();
  }, []);

  const reviewers = useMemo(() => {
    const values = new Set();

    (mockReviewItems || []).forEach((review) => {
      const reviewer = review?.reviewer;
      if (reviewer) values.add(reviewer);
    });

    return Array.from(values).sort();
  }, []);

  return (
    <Paper sx={{ p: 2.5, borderRadius: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search reviews"
            value={filters.search || ""}
            onChange={handleChange("search")}
            placeholder="Risk, reviewer, comments..."
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            select
            label="Department"
            value={filters.department || "all"}
            onChange={handleChange("department")}
          >
            <MenuItem value="all">All</MenuItem>
            {departments.map((department) => (
              <MenuItem key={department} value={department}>
                {department}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            select
            label="Category"
            value={filters.category || "all"}
            onChange={handleChange("category")}
          >
            <MenuItem value="all">All</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            select
            label="Period"
            value={filters.reporting_period || "current"}
            onChange={handleChange("reporting_period")}
          >
            <MenuItem value="current">Current</MenuItem>
            <MenuItem value="all">All</MenuItem>
            {periods.map((period) => (
              <MenuItem key={period} value={period}>
                {period}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RiskReviewsToolbar;