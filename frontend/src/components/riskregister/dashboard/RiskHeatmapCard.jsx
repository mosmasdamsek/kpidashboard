import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";

import { useGetRiskHeatmapQuery } from "../../../services/riskregister/riskRegisterApi";
import { USE_MOCK } from "../../../config/appConfig";
import { mockHeatmap } from "../../../data/riskregister/mockRiskDashboard";

const impactLabels = [1, 2, 3, 4, 5];
const likelihoodLabels = [5, 4, 3, 2, 1];

const getCellCount = (data, likelihood, impact) => {
  const match = data.find(
    (item) => item.likelihood === likelihood && item.impact === impact
  );
  return match ? match.count : 0;
};

const getRiskColor = (likelihood, impact, count) => {
  const score = likelihood * impact;

  if (count === 0) return "rgba(255,255,255,0.08)";
  if (score >= 20) return "rgba(239,68,68,0.9)";
  if (score >= 15) return "rgba(249,115,22,0.82)";
  if (score >= 8) return "rgba(245,158,11,0.78)";
  return "rgba(34,197,94,0.7)";
};

const RiskHeatmapCard = ({ filters, mockData }) => {
  const { data } = useGetRiskHeatmapQuery(filters, {
    skip: USE_MOCK,
  });

  const heatmapData = USE_MOCK ? mockData : data?.results || [];

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
        minHeight: 420,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)",
      }}
    >
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Risk Heatmap
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Likelihood versus impact distribution of registered risks
          </Typography>
        </Box>

        <Box sx={{ overflowX: "auto" }}>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: 12,
              fontWeight: 700,
              color: "text.secondary",
              mb: 1,
            }}
          >
            Impact →
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "90px repeat(5, minmax(56px, 1fr))",
              gap: 1,
              alignItems: "center",
              minWidth: 420,
            }}
          >
            <Box />
            {impactLabels.map((impact) => (
              <Box
                key={`impact-header-${impact}`}
                sx={{
                  textAlign: "center",
                  fontWeight: 800,
                  fontSize: 13,
                  letterSpacing: "0.5px",
                  color: "text.secondary",
                }}
              >
                I{impact}
              </Box>
            ))}

            {likelihoodLabels.map((likelihood) => (
              <React.Fragment key={`row-${likelihood}`}>
                <Box
                  sx={{
                    fontWeight: 800,
                    fontSize: 13,
                    letterSpacing: "0.5px",
                    color: "text.secondary",
                  }}
                >
                  L{likelihood}
                </Box>

                {impactLabels.map((impact) => {
                  const count = getCellCount(heatmapData, likelihood, impact);

                  return (
                    <Box
                      key={`${likelihood}-${impact}`}
                      sx={{
                        height: 58,
                        borderRadius: 2.5,
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                        display: "grid",
                        placeItems: "center",
                        fontWeight: 800,
                        fontSize: 16,
                        color: count > 0 ? "#fff" : "rgba(255,255,255,0.2)",
                        background: getRiskColor(likelihood, impact, count),
                        border: "1px solid rgba(255,255,255,0.06)",
                        boxShadow:
                          count > 0
                            ? "inset 0 1px 0 rgba(255,255,255,0.08)"
                            : "none",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
                        },
                      }}
                    >
                      {count}
                    </Box>
                  );
                })}
              </React.Fragment>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2.5,
            pt: 1,
          }}
        >

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <Box
              sx={{
                width: 14,
                height: 14,
                borderRadius: 1,
                bgcolor: "rgba(34,197,94,0.7)",
              }}
            />
            <Typography variant="caption" color="text.secondary">
              Low
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <Box
              sx={{
                width: 14,
                height: 14,
                borderRadius: 1,
                bgcolor: "rgba(245,158,11,0.78)",
              }}
            />
            <Typography variant="caption" color="text.secondary">
              Medium
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <Box
              sx={{
                width: 14,
                height: 14,
                borderRadius: 1,
                bgcolor: "rgba(249,115,22,0.82)",
              }}
            />
            <Typography variant="caption" color="text.secondary">
              High
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <Box
              sx={{
                width: 14,
                height: 14,
                borderRadius: 1,
                bgcolor: "rgba(239,68,68,0.85)",
              }}
            />
            <Typography variant="caption" color="text.secondary">
              Critical
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
};

export default RiskHeatmapCard;