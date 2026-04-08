import React from "react";
import { Avatar, Box, CardContent, Chip, Divider, Stack, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import GlassCard from "../common/GlassCard";
import CircularScore from "../common/CircularScore";
import TinyTrend from "../common/TinyTrend";
import MetricMiniTrend from "../common/MetricMiniTrend";
import { bg, panel2, softText, white } from "../../theme/dashboardTokens";
import { changeDisplayColor, getMetricColor } from "../../utils/dashboardHelpers";

const DivisionCard = ({ division, onOpen }) => {
  return (
    <GlassCard
      sx={{
        bgcolor: panel2,
        overflow: "hidden",
        cursor: "pointer",
        background: `linear-gradient(135deg, ${division.tone}20 0%, ${panel2} 32%, ${bg} 100%)`,
        borderColor: `${division.tone}30`,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onOpen(division);
      }}
    >
      <CardContent sx={{ p: 2.4 }}>
        <Box className="flex items-start justify-between gap-4">
          <Box className="flex items-start gap-4">
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 3,
                bgcolor: `${division.tone}20`,
                border: `1px solid ${division.tone}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: division.tone,
                fontWeight: 900,
              }}
            >
              {division.owner
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </Box>

            <Box>
              <Typography sx={{ fontSize: 17, fontWeight: 800 }}>
                {division.name}
              </Typography>
              <Typography sx={{ fontSize: 12.2, color: softText, mt: 0.4 }}>
                {division.owner}
              </Typography>
            </Box>
          </Box>

          <CircularScore value={division.score} color={division.tone} />
        </Box>

        <Box className="mt-4 flex items-center gap-2 min-w-0">
          <Chip
            label={`${division.wow} WoW`}
            size="small"
            sx={{
              bgcolor: `${division.wow.startsWith("-") ? "#ff5c83" : division.tone}20`,
              color: division.wow.startsWith("-") ? "#ff5c83" : "#2ce0b8",
              fontWeight: 800,
              border: `1px solid ${
                division.wow.startsWith("-") ? "#ff5c83" : division.tone
              }30`,
            }}
          />
          <Box className="min-w-0 flex-1">
            <TinyTrend data={(division.scoreTrend || []).slice(-6)} color={division.tone} />
          </Box>
        </Box>

        <Stack spacing={1.2} sx={{ mt: 1.25 }}>
          {(division.metrics || []).slice(0, 4).map((metric) => (
            <Box
              key={metric.name}
              className="grid items-center gap-3 min-w-0"
              sx={{ gridTemplateColumns: "minmax(0,1fr) 88px auto auto" }}
            >
              <Typography sx={{ fontSize: 12.5, color: softText }}>
                {metric.name}
              </Typography>
              <MetricMiniTrend points={metric.trend} color={getMetricColor(metric)} />
              <Typography
                sx={{
                  fontSize: 13.2,
                  fontWeight: 800,
                  color: white,
                  minWidth: 64,
                  textAlign: "right",
                }}
              >
                {metric.value}
              </Typography>
              <Typography
                sx={{
                  fontSize: 12.2,
                  fontWeight: 800,
                  color: changeDisplayColor(metric),
                  minWidth: 48,
                  textAlign: "right",
                }}
              >
                {metric.change}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: 2, borderColor: "rgba(148,163,184,0.12)" }} />

        <Box className="flex items-center justify-between">
          <Box className="flex items-center gap-2">
            <Avatar
              sx={{
                width: 28,
                height: 28,
                bgcolor: `${division.tone}30`,
                color: white,
                fontSize: 11,
                fontWeight: 800,
              }}
            >
              {division.owner
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </Avatar>
            <Typography sx={{ fontSize: 11.8, color: softText }}>
              {division.role}
            </Typography>
          </Box>

          <ArrowForward sx={{ color: softText, fontSize: 18 }} />
        </Box>
      </CardContent>
    </GlassCard>
  );
};

export default DivisionCard;