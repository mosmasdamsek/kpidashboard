import React, { useEffect, useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import RiskActionsToolbar from "../../components/riskregister/dashboard/RiskActionsToolbar";
import RiskActionsTable from "../../components/riskregister/dashboard/RiskActionsTable";

import { mockActionItems, currentReportingPeriod, } from "../../data/riskregister/mockRiskDashboard";
import { filterActionItemsForList } from "../../utils/riskregister/mockRiskSelectors";

const RiskActionsPage = () => {
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    search: "",
    department: "all",
    category: "all",
    status: "all",
    reporting_period: "current",
  });

  useEffect(() => {
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const department = searchParams.get("department");

    setFilters((prev) => ({
      ...prev,
      status: status || prev.status,
      category: category || prev.category,
      department: department || prev.department,
    }));
  }, [searchParams]);

  const rows = useMemo(
    () =>
      filterActionItemsForList(
        mockActionItems,
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
            Risk Actions
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track mitigation actions, due dates, and execution status across risks.
          </Typography>
        </Box>

        <RiskActionsToolbar filters={filters} onChange={setFilters} />
        <RiskActionsTable rows={rows} />
      </Stack>
    </Box>
  );
};

export default RiskActionsPage;