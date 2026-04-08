import React from "react";
import { Chip } from "@mui/material";

const KpiCalculationBadge = ({ achievement }) => {
  let bg = "rgba(148,163,184,0.16)";
  let color = "#cbd5e1";
  let label = "Pending";

  if (achievement !== "" && achievement !== null && achievement !== undefined) {
    if (achievement >= 100) {
      bg = "rgba(34,197,94,0.16)";
      color = "#86efac";
      label = "On / Above Target";
    } else if (achievement >= 85) {
      bg = "rgba(245,158,11,0.16)";
      color = "#fcd34d";
      label = "Slightly Below";
    } else {
      bg = "rgba(239,68,68,0.16)";
      color = "#fca5a5";
      label = "Below Target";
    }
  }

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        bgcolor: bg,
        color,
        border: `1px solid ${bg}`,
        fontWeight: 800,
      }}
    />
  );
};

export default KpiCalculationBadge;