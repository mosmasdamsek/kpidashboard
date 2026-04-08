import React from "react";
import { Box, CardContent, Chip, Paper, Stack, Typography } from "@mui/material";
import GlassCard from "../common/GlassCard";
import SectionHeader from "../common/SectionHeader";
import { line, panel2, softText } from "../../theme/dashboardTokens";

const HighlightsPanel = ({ highlights = [] }) => {
  return (
    <GlassCard>
      <CardContent sx={{ p: 3 }}>
        <SectionHeader
          title="Weekly Highlights"
          subtitle="Latest executive updates"
        />

        <Stack spacing={1.6} sx={{ mt: 2.5 }}>
          {highlights.map((item) => (
            <Paper
              key={item.title}
              elevation={0}
              sx={{
                bgcolor: panel2,
                border: `1px solid ${line}`,
                borderRadius: 4,
                p: 2.1,
              }}
            >
              <Box className="flex items-start justify-between gap-4">
                <Box className="min-w-0">
                  <Typography sx={{ fontSize: 13.5, fontWeight: 800 }}>
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 12.2, color: softText, mt: 0.65, lineHeight: 1.7 }}
                  >
                    {item.text}
                  </Typography>
                </Box>

                <Chip
                  label={item.time}
                  size="small"
                  sx={{
                    bgcolor: `${item.tone}22`,
                    color: item.tone,
                    fontWeight: 700,
                  }}
                />
              </Box>
            </Paper>
          ))}
        </Stack>
      </CardContent>
    </GlassCard>
  );
};

export default HighlightsPanel;