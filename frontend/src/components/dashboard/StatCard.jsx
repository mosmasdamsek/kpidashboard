import React from "react";
import { Box, CardContent, Typography } from "@mui/material";
import { North } from "@mui/icons-material";
import GlassCard from "../common/GlassCard";
import { green, panel, softText } from "../../theme/dashboardTokens";

const StatCard = ({ item }) => {
  return (
    <GlassCard
      sx={{
        background: `linear-gradient(135deg, ${item.colorA}22 0%, ${item.colorB}12 48%, ${panel} 100%)`,
        borderColor: `${item.colorA}33`,
      }}
    >
      <CardContent sx={{ p: 2.4 }}>
        <Box className="flex items-start justify-between gap-4">
          <Box>
            <Typography sx={{ fontSize: 12.5, color: softText, fontWeight: 700 }}>
              {item.title}
            </Typography>
            <Typography sx={{ fontSize: 31, lineHeight: 1.1, fontWeight: 900, mt: 1 }}>
              {item.value}
            </Typography>
            <Box className="mt-2 flex items-center gap-1.5">
              <North sx={{ fontSize: 14, color: green }} />
              <Typography sx={{ fontSize: 12.5, color: green, fontWeight: 700 }}>
                {item.change}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${item.colorA} 0%, ${item.colorB} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 16px 30px ${item.colorA}33`,
            }}
          >
            {item.icon ? React.cloneElement(item.icon, { fontSize: "small" }) : null}
          </Box>
        </Box>
      </CardContent>
    </GlassCard>
  );
};

export default StatCard;