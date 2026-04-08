import React from "react";
import {
  Avatar,
  Box,
  CardContent,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import GlassCard from "../common/GlassCard";
import ChartContainer from "../common/ChartContainer";
import MetricMiniTrend from "../common/MetricMiniTrend";
import { bg, line, panel, softText, white } from "../../theme/dashboardTokens";
import { changeDisplayColor, getMetricColor } from "../../utils/dashboardHelpers";

const DivisionModal = ({ division, open, onClose }) => {
  if (!open || !division) return null;

  const isNegative = division.summary.wow.startsWith("-");

  const summaryCards = [
    { label: "OVERALL SCORE", value: division.score, sub: "", tone: division.tone },
    {
      label: "WOW CHANGE",
      value: division.summary.wow,
      sub: "",
      tone: isNegative ? "#ff5c83" : "#2ce0b8",
    },
    {
      label: "BEST KPI",
      value: division.summary.bestKpi,
      sub: division.summary.bestKpiChange,
      tone: "#2ce0b8",
    },
    {
      label: "NEEDS FOCUS",
      value: division.summary.needsFocus,
      sub: division.summary.needsFocusChange,
      tone: "#ffcc00",
    },
  ];

  return (
    <Box
      onClick={onClose}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        bgcolor: "rgba(2,6,23,0.82)",
        backdropFilter: "blur(10px)",
        p: { xs: 1.5, md: 2.5 },
        overflowY: "auto",
      }}
    >
      <Box onClick={(e) => e.stopPropagation()} sx={{ maxWidth: 1480, mx: "auto" }}>
        <GlassCard
          sx={{
            background: `radial-gradient(circle at top left, ${division.tone}18, transparent 20%), radial-gradient(circle at bottom right, ${division.tone}14, transparent 18%), linear-gradient(135deg, ${bg} 0%, ${panel} 100%)`,
            borderColor: `${division.tone}30`,
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box className="mb-5 flex items-start justify-between gap-4">
              <Box className="flex items-start gap-4">
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: `${division.tone}28`,
                    color: "#2ce0b8",
                    fontSize: 22,
                    fontWeight: 900,
                  }}
                >
                  {division.owner
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </Avatar>

                <Box>
                  <Typography sx={{ fontSize: { xs: 28, md: 36 }, fontWeight: 900 }}>
                    {division.name}
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: softText, mt: 0.5 }}>
                    {division.owner} • {division.role}
                  </Typography>
                </Box>
              </Box>

              <IconButton
                onClick={onClose}
                sx={{
                  bgcolor: "rgba(255,255,255,0.04)",
                  border: `1px solid ${line}`,
                  color: white,
                }}
              >
                <MoreHoriz sx={{ transform: "rotate(45deg)" }} />
              </IconButton>
            </Box>

            <Box className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {summaryCards.map((item) => (
                <GlassCard
                  key={item.label}
                  sx={{ bgcolor: "rgba(255,255,255,0.02)", borderRadius: 4 }}
                >
                  <CardContent sx={{ p: 2.2 }}>
                    <Typography sx={{ fontSize: 11.5, letterSpacing: 0.6, color: softText }}>
                      {item.label}
                    </Typography>
                    <Typography sx={{ fontSize: 18, fontWeight: 800, mt: 1.4, color: item.tone }}>
                      {item.value}
                    </Typography>
                    {item.sub ? (
                      <Typography sx={{ fontSize: 13, fontWeight: 700, color: item.tone, mt: 0.4 }}>
                        {item.sub}
                      </Typography>
                    ) : null}
                  </CardContent>
                </GlassCard>
              ))}
            </Box>

            <Box className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
              <GlassCard sx={{ minHeight: 260 }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography sx={{ fontSize: 15, fontWeight: 800, mb: 2 }}>
                    12-Week Score Trend
                  </Typography>

                  <ChartContainer height={220} minHeight={220} minWidth={250}>
                    <AreaChart
                      data={division.scoreTrend.map((v, i) => ({
                        name: `W${i + 1}`,
                        v,
                      }))}
                    >
                      <defs>
                        <linearGradient id="modalTrend" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={division.tone} stopOpacity={0.32} />
                          <stop offset="95%" stopColor={division.tone} stopOpacity={0.02} />
                        </linearGradient>
                      </defs>

                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={line} />
                      <XAxis
                        dataKey="name"
                        tickLine={false}
                        axisLine={false}
                        stroke={softText}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        stroke={softText}
                        domain={[Math.max(0, Math.min(...division.scoreTrend) - 5), 100]}
                      />
                      <RechartsTooltip />
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke={division.tone}
                        fill="url(#modalTrend)"
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </GlassCard>

              <GlassCard sx={{ minHeight: 260 }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography sx={{ fontSize: 15, fontWeight: 800, mb: 2 }}>
                    KPI Target Achievement
                  </Typography>

                  <ChartContainer height={220} minHeight={220} minWidth={300}>
                    <BarChart
                      data={division.metrics.map((m) => ({
                        name: m.name,
                        progress: m.progress,
                      }))}
                      layout="vertical"
                      margin={{ left: 20, right: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={line} />
                      <XAxis
                        type="number"
                        tickLine={false}
                        axisLine={false}
                        stroke={softText}
                        domain={[0, 130]}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tickLine={false}
                        axisLine={false}
                        stroke={softText}
                        width={110}
                      />
                      <RechartsTooltip />
                      <Bar dataKey="progress" radius={[0, 8, 8, 0]}>
                        {division.metrics.map((m) => (
                          <Cell
                            key={m.name}
                            fill={m.changeDir === "down" ? "#f59e0b" : division.tone}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </GlassCard>
            </Box>

            <GlassCard sx={{ mt: 4 }}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 2.5, pb: 2 }}>
                  <Typography sx={{ fontSize: 15, fontWeight: 800 }}>
                    Detailed KPI Breakdown
                  </Typography>
                </Box>

                <Stack divider={<Divider sx={{ borderColor: line }} />}>
                  {division.metrics.map((metric) => (
                    <Box
                      key={metric.name}
                      className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-[1fr_auto_auto_auto] md:items-center"
                    >
                      <Box className="grid grid-cols-[120px_90px] items-center gap-4">
                        <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                          {metric.name}
                        </Typography>
                        <MetricMiniTrend
                          points={metric.trend}
                          color={getMetricColor(metric)}
                        />
                      </Box>

                      <Box className="text-left md:text-right">
                        <Typography sx={{ fontSize: 14, fontWeight: 800 }}>
                          {metric.value}
                        </Typography>
                        <Typography sx={{ fontSize: 12, color: softText }}>
                          Target: {metric.target}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 800,
                          color: changeDisplayColor(metric),
                          textAlign: { md: "right" },
                        }}
                      >
                        {metric.change}
                      </Typography>

                      <Box className="md:justify-self-end" sx={{ width: { xs: "100%", md: 78 } }}>
                        <LinearProgress
                          variant="determinate"
                          value={metric.progress}
                          sx={{
                            height: 7,
                            borderRadius: 999,
                            bgcolor: "rgba(255,255,255,0.08)",
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 999,
                              bgcolor:
                                metric.changeDir === "down" ? "#f59e0b" : division.tone,
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </GlassCard>
          </CardContent>
        </GlassCard>
      </Box>
    </Box>
  );
};

export default DivisionModal;