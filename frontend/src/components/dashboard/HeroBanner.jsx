import React from "react";
import { Box, Button, CardContent, Chip, Stack, Typography } from "@mui/material";
import { ArrowForward, North, Slideshow } from "@mui/icons-material";
import { AreaChart, Area } from "recharts";
import GlassCard from "../common/GlassCard";
import ChartContainer from "../common/ChartContainer";
import { blue, cyan, green, line, softText, white } from "../../theme/dashboardTokens";

const periodLabelMap = {
  last_7_days: "Last 7 days",
  last_30_days: "Last 30 days",
  this_quarter: "This quarter",
  this_year: "This year",
};

const HeroBanner = ({
  title = "Your business is thriving.",
  subtitle = "Here's your performance overview.",
  description = "Monitor real-time performance across revenue, customer growth, operational efficiency, and strategic execution in one elegant executive workspace.",
  snapshotValue = "92.4%",
  snapshotChange = "+12.7% from last month",
  snapshotTrend = [10, 16, 14, 19, 24, 22, 29],
  summary = null,
  onStartPresentation 
}) => {
  const activePeriodLabel =
    periodLabelMap[summary?.activePeriod] || "Last 30 days";

  const resolvedDescription = summary?.hasSearch
    ? `Showing filtered executive insights across ${summary?.divisionCount || 0} divisions for ${activePeriodLabel}.`
    : description;

  return (
    <GlassCard
      sx={{
        background:
          "radial-gradient(circle at top right, rgba(48,199,255,0.22), transparent 24%), linear-gradient(135deg, rgba(79,140,255,0.28) 0%, rgba(139,92,246,0.22) 50%, rgba(15,29,49,1) 100%)",
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Box className="grid grid-cols-1 gap-8 xl:grid-cols-[1.3fr_0.7fr] xl:items-center">
          <Box>
            <Chip
              label={
                summary?.activePeriod
                  ? `Executive View · ${activePeriodLabel}`
                  : "Welcome back, Executive"
              }
              sx={{
                bgcolor: "rgba(255,255,255,0.08)",
                color: white,
                border: `1px solid ${line}`,
                fontWeight: 700,
                mb: 2.25,
              }}
            />

            <Typography
              sx={{
                fontSize: { xs: 30, md: 42 },
                lineHeight: 1.08,
                fontWeight: 900,
                letterSpacing: -0.8,
              }}
            >
              {title}
              <br />
              {subtitle}
            </Typography>

            <Typography
              sx={{
                fontSize: 14,
                color: softText,
                mt: 2.25,
                maxWidth: 680,
                lineHeight: 1.8,
              }}
            >
              {resolvedDescription}
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 3.5 }}>
              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{
                  textTransform: "none",
                  fontWeight: 800,
                  bgcolor: blue,
                  borderRadius: 999,
                  px: 2.5,
                  py: 1.2,
                  boxShadow: "0 16px 30px rgba(79,140,255,0.35)",
                }}
              >
                View Full Analytics
              </Button>

              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  fontWeight: 800,
                  color: white,
                  borderColor: line,
                  borderRadius: 999,
                  px: 2.5,
                  py: 1.2,
                }}
              >
                Download Report
              </Button>

              <Button
                variant="contained"
                startIcon={<Slideshow />}
                onClick={onStartPresentation}
                sx={{
                  textTransform: "none",
                  borderRadius: "16px",
                  px: 2.4,
                  py: 1.2,
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #4f8cff 0%, #8b5cf6 100%)",
                  boxShadow: "0 16px 40px rgba(79,140,255,0.28)",
                }}
              >
                Start EXCO Presentation
              </Button>
            </Stack>
          </Box>

          <GlassCard sx={{ bgcolor: "rgba(9,17,32,0.55)", borderRadius: 5 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: softText }}>
                Performance Snapshot
              </Typography>

              <Typography sx={{ fontSize: 44, lineHeight: 1, fontWeight: 900, mt: 1.4 }}>
                {snapshotValue}
              </Typography>

              <Box className="mt-3 flex items-center gap-2">
                <North sx={{ fontSize: 16, color: green }} />
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: green }}>
                  {snapshotChange}
                </Typography>
              </Box>

              {summary && (
                <Box className="mt-3 flex flex-wrap gap-2">
                  <Chip
                    label={`${summary?.divisionCount || 0} divisions`}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.06)",
                      color: white,
                      border: `1px solid ${line}`,
                    }}
                  />
                  <Chip
                    label={`Avg ${summary?.avgScore || 0}%`}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.06)",
                      color: white,
                      border: `1px solid ${line}`,
                    }}
                  />
                </Box>
              )}

              <ChartContainer height={120} minWidth={200} sx={{ mt: 3 }}>
                <AreaChart data={snapshotTrend.map((v, i) => ({ i, v }))}>
                  <defs>
                    <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={cyan} stopOpacity={0.35} />
                      <stop offset="95%" stopColor={cyan} stopOpacity={0.03} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke={cyan}
                    strokeWidth={3}
                    fill="url(#heroGrad)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </GlassCard>
        </Box>
      </CardContent>
    </GlassCard>
  );
};

export default HeroBanner;