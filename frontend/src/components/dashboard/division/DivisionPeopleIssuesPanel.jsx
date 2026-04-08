import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import GlassCard from "../../common/GlassCard";
import SectionHeader from "../../common/SectionHeader";

const severityColors = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#22c55e",
};

const statusColors = {
  Open: "#94a3b8",
  "In Progress": "#3b82f6",
  Resolved: "#22c55e",
};

const formatLabel = (value = "") =>
  value.charAt(0).toUpperCase() + value.slice(1);

const DivisionPeopleIssuesPanel = ({ issues = [] }) => {
  return (
    <GlassCard>
      <Box sx={{ p: 3 }}>
        <SectionHeader
          title="People Issues & Workforce Risks"
          subtitle={`${issues.length} active people issues being tracked this period`}
        />

        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          {issues.map((item) => (
            <Box
              key={item.id}
              sx={{
                p: 2,
                borderRadius: 3,
                border: "1px solid rgba(255,255,255,0.08)",
                bgcolor: "rgba(255,255,255,0.02)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 800 }}>
                    {item.issue}
                  </Typography>

                  <Typography sx={{ fontSize: 12, opacity: 0.72, mt: 0.5 }}>
                    Affected Area: {item.affectedArea}
                  </Typography>

                  <Typography sx={{ fontSize: 12, opacity: 0.72 }}>
                    Category: {formatLabel(item.category)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Chip
                    label={formatLabel(item.severity)}
                    size="small"
                    sx={{
                      bgcolor: `${severityColors[item.severity]}20`,
                      color: severityColors[item.severity],
                      border: `1px solid ${severityColors[item.severity]}40`,
                      fontWeight: 700,
                    }}
                  />

                  <Chip
                    label={item.status}
                    size="small"
                    sx={{
                      bgcolor: `${statusColors[item.status]}20`,
                      color: statusColors[item.status],
                      border: `1px solid ${statusColors[item.status]}40`,
                      fontWeight: 700,
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ mt: 1.5 }}>
                <Typography sx={{ fontSize: 12, opacity: 0.7 }}>
                  Impact
                </Typography>
                <Typography sx={{ fontSize: 13.2, mt: 0.35 }}>
                  {item.impact}
                </Typography>
              </Box>

              <Box sx={{ mt: 1.25 }}>
                <Typography sx={{ fontSize: 12, opacity: 0.7 }}>
                  Mitigation
                </Typography>
                <Typography sx={{ fontSize: 13.2, mt: 0.35 }}>
                  {item.mitigation}
                </Typography>
              </Box>

              <Box
                sx={{
                  mt: 1.5,
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                  gap: 1.5,
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: 12, opacity: 0.7 }}>
                    Owner
                  </Typography>
                  <Typography sx={{ fontSize: 13, mt: 0.25 }}>
                    {item.owner}
                  </Typography>
                </Box>

                <Box>
                  <Typography sx={{ fontSize: 12, opacity: 0.7 }}>
                    Due Date
                  </Typography>
                  <Typography sx={{ fontSize: 13, mt: 0.25 }}>
                    {item.dueDate}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </GlassCard>
  );
};

export default DivisionPeopleIssuesPanel;