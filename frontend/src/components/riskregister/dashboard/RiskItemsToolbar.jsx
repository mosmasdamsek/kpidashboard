import React, { useMemo } from "react";
import { Grid, MenuItem, Paper, TextField } from "@mui/material";
import { mockRiskRegisters, mockRiskItems } from "../../../data/riskregister/mockRiskDashboard";

const RiskItemsToolbar = ({ filters, onChange }) => {
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

  const ratings = ["Critical", "Maximum", "High", "Medium", "Low", "Not Rated"];
  const statuses = ["open", "progress", "overdue", "completed", "closed"];

  const labelize = (value) =>
    String(value)
      .replaceAll("_", " ")
      .replace(/\b\w/g, (m) => m.toUpperCase());

  return (
    <Paper sx={{ p: 2.5, borderRadius: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Search risks"
            value={filters.search || ""}
            onChange={handleChange("search")}
            placeholder="Risk number, description, owner..."
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
            label="Rating"
            value={filters.rating || "all"}
            onChange={handleChange("rating")}
          >
            <MenuItem value="all">All</MenuItem>
            {ratings.map((rating) => (
              <MenuItem key={rating} value={rating}>
                {rating}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            select
            label="Status"
            value={filters.status || "all"}
            onChange={handleChange("status")}
          >
            <MenuItem value="all">All</MenuItem>
            {statuses.map((status) => (
              <MenuItem key={status} value={labelize(status)}>
                {labelize(status)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RiskItemsToolbar;