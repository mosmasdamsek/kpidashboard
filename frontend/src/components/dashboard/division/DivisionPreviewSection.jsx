import React from "react";
import { Box, Typography } from "@mui/material";
import GlassCard from "../../common/GlassCard";

const DivisionPreviewSection = ({ title, subtitle, children }) => {
  return (
    <GlassCard>
      <Box sx={{ p: 3 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 900 }}>
          {title}
        </Typography>
        {subtitle ? (
          <Typography sx={{ fontSize: 12.5, opacity: 0.72, mt: 0.5 }}>
            {subtitle}
          </Typography>
        ) : null}

        <Box sx={{ mt: 2 }}>{children}</Box>
      </Box>
    </GlassCard>
  );
};

export default DivisionPreviewSection;