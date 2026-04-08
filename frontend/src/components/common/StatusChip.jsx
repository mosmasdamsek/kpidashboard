import React from "react";
import { Chip } from "@mui/material";

const toneMap = {
  draft: {
    bg: "rgba(148,163,184,0.16)",
    color: "#cbd5e1",
    border: "rgba(148,163,184,0.25)",
  },
  submitted: {
    bg: "rgba(59,130,246,0.16)",
    color: "#93c5fd",
    border: "rgba(59,130,246,0.25)",
  },
  returned: {
    bg: "rgba(239,68,68,0.16)",
    color: "#fca5a5",
    border: "rgba(239,68,68,0.25)",
  },
  approved: {
    bg: "rgba(34,197,94,0.16)",
    color: "#86efac",
    border: "rgba(34,197,94,0.25)",
  },
  locked: {
    bg: "rgba(168,85,247,0.16)",
    color: "#d8b4fe",
    border: "rgba(168,85,247,0.25)",
  },
};

const StatusChip = ({ status = "draft", label }) => {
  const tone = toneMap[status] || toneMap.draft;

  return (
    <Chip
      label={label || status}
      size="small"
      sx={{
        bgcolor: tone.bg,
        color: tone.color,
        border: `1px solid ${tone.border}`,
        fontWeight: 800,
        textTransform: "capitalize",
      }}
    />
  );
};

export default StatusChip;