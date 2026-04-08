import React, { useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import RiskReviewsToolbar from "../../components/riskregister/dashboard/RiskReviewsToolbar";
import RiskReviewsTable from "../../components/riskregister/dashboard/RiskReviewsTable";

import { mockReviewItems, currentReportingPeriod, } from "../../data/riskregister/mockRiskDashboard";
import { filterReviewItemsForList } from "../../utils/riskregister/mockRiskSelectors";

const RiskReviewsPage = () => {
  const [filters, setFilters] = useState({
    search: "",
    department: "all",
    category: "all",
    reporting_period: "current",
  });

  const rows = useMemo(
    () =>
      filterReviewItemsForList(
        mockReviewItems,
        filters,
        currentReportingPeriod
      ),
    [filters]
  );

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Risk Reviews
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Review history, reviewer comments, and governance records across risks.
          </Typography>
        </Box>

        <RiskReviewsToolbar filters={filters} onChange={setFilters} />
        <RiskReviewsTable rows={rows} />
      </Stack>
    </Box>
  );
};

export default RiskReviewsPage;