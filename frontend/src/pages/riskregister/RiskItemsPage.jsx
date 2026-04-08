import React, { useEffect, useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import RiskItemsToolbar from "../../components/riskregister/dashboard/RiskItemsToolbar";
import RiskItemsTable from "../../components/riskregister/dashboard/RiskItemsTable";

import {
  mockRiskItems,
  currentReportingPeriod,
} from "../../data/riskregister/mockRiskDashboard";
import { filterRiskItemsForList } from "../../utils/riskregister/mockRiskSelectors";

const RiskItemsPage = () => {
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    department: "all",
    rating: "all",
    status: "all",
  });

  useEffect(() => {
    const rating = searchParams.get("rating");
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const department = searchParams.get("department");

    setFilters((prev) => ({
      ...prev,
      rating: rating || prev.rating,
      status: status || prev.status,
      category: category || prev.category,
      department: department || prev.department,
    }));
  }, [searchParams]);

  const getRiskScore = (risk) => {
    if (risk?.residual_impact && risk?.residual_likelihood) {
      return risk.residual_impact * risk.residual_likelihood;
    }
    return (risk?.inherent_impact || 0) * (risk?.inherent_likelihood || 0);
  };

  const getRiskRating = (risk) => {
    const score = getRiskScore(risk);
    if (!score) return "Not Rated";
    if (score >= 21) return "Critical";
    if (score >= 15) return "Maximum";
    if (score >= 10) return "High";
    if (score >= 4) return "Medium";
    return "Low";
  };

  const rows = useMemo(
    () =>
      filterRiskItemsForList(
        mockRiskItems,
        filters,
        currentReportingPeriod
      ).map((risk) => ({
        id: risk.id,
        risk_number: risk.risk_number,
        description: risk.description,
        category: risk.category?.name || "-",
        department:
          risk.register?.Department?.name ||
          risk.register?.department?.name ||
          "-",
        owner:
          risk.risk_owner?.title ||
          risk.risk_owner?.name ||
          risk.risk_owner_user?.full_name ||
          risk.risk_owner_user?.name ||
          "-",
        rating: getRiskRating(risk),
        status:
          risk.response_status === "progress" ? "In Progress"
            : risk.response_status === "open"
            ? "Open"
            : risk.response_status === "overdue"
            ? "Overdue"
            : risk.response_status === "completed"
            ? "Completed"
            : risk.response_status === "closed"
            ? "Closed"
            : risk.response_status || "-",
        reporting_period: risk.register?.reporting_period?.name || "-",
        due_date: risk.due_date || "-",
        raw: risk,
      })),
    [filters]
  );

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Risk Items
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Browse, search, and review registered risks across the organisation.
          </Typography>
        </Box>

        <RiskItemsToolbar filters={filters} onChange={setFilters} />
        <RiskItemsTable rows={rows} />
      </Stack>
    </Box>
  );
};

export default RiskItemsPage;