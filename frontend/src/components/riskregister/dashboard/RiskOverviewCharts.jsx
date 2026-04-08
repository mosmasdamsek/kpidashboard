import React from "react";
import { Grid } from "@mui/material";

import RiskCategoryChartCard from "./RiskCategoryChartCard";
import RiskDivisionChartCard from "./RiskDivisionChartCard";
import RiskTrendChartCard from "./RiskTrendChartCard";

const RiskOverviewCharts = ({
  filters,
  mockCategoryData,
  mockDivisionData,
  mockTrendData,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={4}>
        <RiskCategoryChartCard filters={filters} mockData={mockCategoryData} />
      </Grid>

      <Grid item xs={12} lg={4}>
        <RiskDivisionChartCard filters={filters} mockData={mockDivisionData} />
      </Grid>

      <Grid item xs={12} lg={4}>
        <RiskTrendChartCard filters={filters} mockData={mockTrendData} />
      </Grid>
    </Grid>
  );
};

export default RiskOverviewCharts;