import React from "react";
import { Box, CardContent, Stack, Typography } from "@mui/material";
import GlassCard from "../common/GlassCard";
import SectionHeader from "../common/SectionHeader";
import { line, panel2, softText } from "../../theme/dashboardTokens";


const RankingsPanel = ({ items = [] }) => {
  return (
    <GlassCard>
      <CardContent sx={{ p: 3 }}>
        <SectionHeader title="Top Rankings" subtitle="Best-performing divisions this week" />

        <Stack spacing={1.6} sx={{ mt: 2.5 }}>
          {items.map((item, idx) => (
            <Box
              key={item.name}
              className="flex items-center gap-3 rounded-3xl px-3 py-2.5"
              sx={{ bgcolor: panel2, border: `1px solid ${line}` }}
            >
              <Box
                className="flex h-9 w-9 items-center justify-center rounded-2xl"
                sx={{ bgcolor: `${item.color}20`, color: item.color, fontWeight: 900 }}
              >
                {idx + 1}
              </Box>

              <Box className="min-w-0 flex-1">
                <Typography sx={{ fontSize: 13.5, fontWeight: 800 }}>
                  {item.name}
                </Typography>
                <Typography sx={{ fontSize: 11.5, color: softText }}>
                  {item.change} WoW
                </Typography>
              </Box>

              <Typography sx={{ fontSize: 15, fontWeight: 900 }}>{item.score}</Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </GlassCard>
  );
};

export default RankingsPanel;