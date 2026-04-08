import React from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useGetRiskDashboardSummaryQuery } from "../../../services/riskregister/riskRegisterApi";
import SummaryStatCard from "../../common/SummaryStatCard";
import { USE_MOCK } from "../../../config/appConfig";

const RiskKpiCards = ({ filters, mockData }) => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetRiskDashboardSummaryQuery(filters, {
    skip: USE_MOCK,
  });

  const summary = USE_MOCK ? mockData : data;

  const cards = [
    {
      label: "Total Risks",
      value: summary?.total_risks ?? 0,
      subtext: "All registered items",
      accent: "default",
      onClick: () => navigate("/risk-register/items"),
    },
    {
      label: "Critical Risks",
      value: summary?.critical_risks ?? 0,
      subtext: "Immediate attention",
      accent: "critical",
      onClick: () => navigate("/risk-register/items?rating=Critical"),
    },
    {
      label: "High Risks",
      value: summary?.high_risks ?? 0,
      subtext: "Close monitoring",
      accent: "high",
      onClick: () => navigate("/risk-register/items?rating=High"),
    },
    {
      label: "Overdue Actions",
      value: summary?.overdue_actions ?? 0,
      subtext: "Past target date",
      accent: "overdue",
      onClick: () => navigate("/risk-register/actions?status=Overdue"),
    },
  ];

  return (
    <Grid container spacing={2.5}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} xl={3} key={card.label}>
          <SummaryStatCard
            label={card.label}
            value={isLoading ? "..." : card.value}
            subtext={card.subtext}
            accent={card.accent}
            onClick={card.onClick}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RiskKpiCards;