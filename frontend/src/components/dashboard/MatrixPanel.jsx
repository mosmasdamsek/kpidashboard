import React from "react";
import { Box, CardContent, Typography } from "@mui/material";
import GlassCard from "../common/GlassCard";
import SectionHeader from "../common/SectionHeader";
import { panel2, softText } from "../../theme/dashboardTokens";

const MatrixPanel = ({ items = [] }) => {
  return (
    <GlassCard>
      <CardContent sx={{ p: 3 }}>
        <SectionHeader
          title="Performance Matrix"
          subtitle="Balanced view across strategic dimensions"
        />

        <Box className="mt-4 grid grid-cols-2 gap-3">
          {items.map((item) => (
            <Box
              key={item.label}
              className="rounded-3xl p-4"
              sx={{
                background: `linear-gradient(135deg, ${item.color}18 0%, ${panel2} 100%)`,
                border: `1px solid ${item.color}26`,
              }}
            >
              <Typography sx={{ fontSize: 12, color: softText }}>
                {item.label}
              </Typography>
              <Typography sx={{ fontSize: 30, lineHeight: 1.1, fontWeight: 900, mt: 1 }}>
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </GlassCard>
  );
};

export default MatrixPanel;