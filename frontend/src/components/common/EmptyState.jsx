import React from "react";
import { Box, Typography } from "@mui/material";
import { softText, white } from "../../theme/dashboardTokens";

const EmptyState = ({ title, subtitle }) => {
  return (
    <Box
      sx={{
        p: 4,
        textAlign: "center",
        borderRadius: 3,
        border: "1px dashed rgba(148,163,184,0.25)",
        bgcolor: "rgba(255,255,255,0.02)",
      }}
    >
      <Typography sx={{ fontSize: 18, fontWeight: 800, color: white }}>
        {title}
      </Typography>
      {subtitle ? (
        <Typography sx={{ color: softText, mt: 1 }}>
          {subtitle}
        </Typography>
      ) : null}
    </Box>
  );
};

export default EmptyState;