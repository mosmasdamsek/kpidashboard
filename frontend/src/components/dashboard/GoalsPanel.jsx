import React from "react";
import { Box, CardContent, LinearProgress, Stack, Typography } from "@mui/material";
import GlassCard from "../common/GlassCard";
import SectionHeader from "../common/SectionHeader";
import { white } from "../../theme/dashboardTokens";

const GoalsPanel = ({ goals = [] }) => {
  return (
    <GlassCard>
      <CardContent sx={{ p: 3 }}>
        <SectionHeader
          title="Q1 Goals"
          subtitle="Progress against strategic objectives"
        />

        <Stack spacing={2} sx={{ mt: 2.5 }}>
          {goals.map((goal) => (
            <Box key={goal.name}>
              <Box className="mb-1.5 flex items-center justify-between gap-3">
                <Typography sx={{ fontSize: 12.8, color: white }}>
                  {goal.name}
                </Typography>
                <Typography sx={{ fontSize: 12.8, fontWeight: 800 }}>
                  {goal.value}%
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={goal.value}
                sx={{
                  height: 9,
                  borderRadius: 999,
                  bgcolor: "rgba(255,255,255,0.08)",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 999,
                    bgcolor: goal.tone,
                    boxShadow: `0 0 20px ${goal.tone}66`,
                  },
                }}
              />
            </Box>
          ))}
        </Stack>
      </CardContent>
    </GlassCard>
  );
};

export default GoalsPanel;