import React from "react";
import { Box, Typography } from "@mui/material";
import { white, softText } from "../../theme/dashboardTokens";

const SectionHeader = ({ title, subtitle, action }) => {
  return (
    <Box className="flex items-start justify-between gap-4">
      <Box>
        <Typography sx={{ fontSize: 18, fontWeight: 800, color: white }}>
          {title}
        </Typography>

        {subtitle ? (
          <Typography sx={{ fontSize: 12.5, color: softText, mt: 0.6 }}>
            {subtitle}
          </Typography>
        ) : null}
      </Box>

      {action}
    </Box>
  );
};

export default SectionHeader;