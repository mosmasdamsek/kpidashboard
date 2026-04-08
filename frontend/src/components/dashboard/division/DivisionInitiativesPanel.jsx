import React from "react";
import { Box, Typography, Chip, LinearProgress } from "@mui/material";
import GlassCard from "../../common/GlassCard";
import SectionHeader from "../../common/SectionHeader";

const ragColor = {
  green: "#22c55e",
  amber: "#f59e0b",
  red: "#ef4444",
};

const DivisionInitiativesPanel = ({ initiatives = [] }) => {
  return (
    <GlassCard>
      <Box sx={{ p: 3 }}>
        <SectionHeader
          title="Strategic Initiatives & Projects"
          subtitle={`${initiatives.length} active initiatives being tracked this period`}
        />

        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          {initiatives.map((item) => (
            <Box
              key={item.id}
              sx={{
                p: 2,
                borderRadius: 3,
                border: "1px solid rgba(255,255,255,0.08)",
                bgcolor: "rgba(255,255,255,0.02)",
              }}
            >
              {/* Top row */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 800 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ fontSize: 12, opacity: 0.7 }}>
                    Owner: {item.owner}
                  </Typography>
                </Box>

                <Chip
                  label={item.status}
                  sx={{
                    bgcolor: `${ragColor[item.rag]}20`,
                    color: ragColor[item.rag],
                    border: `1px solid ${ragColor[item.rag]}40`,
                    fontWeight: 700,
                  }}
                />
              </Box>

              {/* Progress */}
              <Box sx={{ mt: 1.5 }}>
                <LinearProgress
                  variant="determinate"
                  value={item.progress}
                  sx={{
                    height: 6,
                    borderRadius: 10,
                  }}
                />
                <Typography sx={{ fontSize: 12, mt: 0.5 }}>
                  {item.progress}% complete · Current Milestone: {item.milestoneCurrent}· Next Milestone: {item.milestoneNext}
                </Typography>
              </Box>

              {/* Update */}
              <Typography sx={{ fontSize: 12.5, mt: 1.5 }}>
                {item.reportingPeriodUpdate}
              </Typography>

              {/* Risk */}
              <Typography
                sx={{
                  fontSize: 12,
                  mt: 1,
                  color: "#fca5a5",
                }}
              >
                ⚠ {item.risksIssues}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </GlassCard>
  );
};

export default DivisionInitiativesPanel;