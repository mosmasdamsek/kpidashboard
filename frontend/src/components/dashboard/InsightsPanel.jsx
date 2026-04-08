import React from "react";
import { Box, CardContent, Paper, Stack, Typography } from "@mui/material";
import GlassCard from "../common/GlassCard";
import SectionHeader from "../common/SectionHeader";
import { line, panel2, softText } from "../../theme/dashboardTokens";

const InsightsPanel = ({ items = [] }) => {
  return (
    <GlassCard>
      <CardContent sx={{ p: 3 }}>
        <SectionHeader
          title="Key Insights"
          subtitle="Executive observations from the latest updates"
        />

        <Stack spacing={1.5} sx={{ mt: 2.5 }}>
          {items.map((item) => (
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
              <Box className="flex items-start gap-3">
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    bgcolor: item.accent,
                    mt: 0.9,
                    boxShadow: `0 0 20px ${item.accent}66`,
                  }}
                />
                <Box>
                  <Typography sx={{ fontSize: 13.5, fontWeight: 800 }}>
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 12.2, color: softText, mt: 0.7, lineHeight: 1.7 }}
                  >
                    {item.body}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))}
        </Stack>
      </CardContent>
    </GlassCard>
  );
};

export default InsightsPanel;