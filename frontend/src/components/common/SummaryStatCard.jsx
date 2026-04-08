import React from "react";
import { CardContent, Typography } from "@mui/material";
import GlassCard from "./GlassCard";
import { softText, white } from "../../theme/dashboardTokens";

const SummaryStatCard = ({
  label,
  value,
  subtext,
  accent = "default",
  onClick,
}) => {
  const accentColors = {
    default: white,
    critical: "#ef4444",
    high: "#f59e0b",
    overdue: "#fb923c",
  };

  return (
    <GlassCard
      sx={{
        cursor: onClick ? "pointer" : "default",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        "&:hover": onClick
          ? {
              transform: "translateY(-2px)",
            }
          : {},
      }}
      onClick={onClick}
    >
      <CardContent>
        <Typography sx={{ fontSize: 12.5, color: softText }}>
          {label}
        </Typography>

        <Typography
          sx={{
            fontSize: 28,
            fontWeight: 900,
            mt: 1,
            color: accentColors[accent] || white,
          }}
        >
          {value}
        </Typography>

        {subtext ? (
          <Typography sx={{ fontSize: 12.5, color: softText, mt: 0.75 }}>
            {subtext}
          </Typography>
        ) : null}
      </CardContent>
    </GlassCard>
  );
};

export default SummaryStatCard;