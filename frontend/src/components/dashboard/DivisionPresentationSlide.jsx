import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import { softText, white } from "../../theme/dashboardTokens";

const ragColorMap = {
  green: "#22c55e",
  amber: "#f59e0b",
  red: "#ef4444",
};

const severityColorMap = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#22c55e",
};

const kpiToneMap = {
  positive: "#22c55e",
  warning: "#f59e0b",
  neutral: "#60a5fa",
};

const formatLabel = (value = "") =>
  value
    .toString()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const metricCardStyle = (glow) => ({
  borderRadius: "24px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: `linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.025) 100%), ${glow}`,
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
  backdropFilter: "blur(14px)",
});

const DivisionPresentationSlide = ({ division }) => {
  const meta = division.division; 
  const financialKpis = (division.kpis || []).filter((k) => k.type === "financial");
  const topKpis = financialKpis.slice(0, 4);
  const initiatives = division.initiatives || [];
  const peopleIssues = division.peopleIssues || [];

  return (
    <div className="mx-auto w-full max-w-[1460px] rounded-[30px] border border-white/10 bg-[#071126]/95 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-7">
      <div className="mb-5 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-xl font-black text-white">
            {meta.name?.[0] || "D"}
          </div>

          <div>
            <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
              {meta.name} Division
            </h2>
            <p className="mt-1 text-sm text-white/65">
              EXCO Report · {meta.periodName}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <p className="text-[11px] uppercase tracking-wide text-white/45">Division Head</p>
            <p className="mt-1 text-sm font-semibold text-white">{meta.head || "-"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <p className="text-[11px] uppercase tracking-wide text-white/45">Role</p>
            <p className="mt-1 text-sm font-semibold text-white">{meta.role || "-"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <p className="text-[11px] uppercase tracking-wide text-white/45">Status</p>
            <p className="mt-1 text-sm font-semibold capitalize text-white">{meta.status}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <p className="text-[11px] uppercase tracking-wide text-white/45">Score</p>
            <p className="mt-1 text-sm font-semibold text-white">{meta.score}%</p>
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {topKpis.map((kpi, idx) => {
          const glows = [
            "radial-gradient(circle at top left, rgba(14,165,233,0.24), transparent 45%)",
            "radial-gradient(circle at top right, rgba(255,255,255,0.12), transparent 40%)",
            "radial-gradient(circle at center, rgba(139,92,246,0.28), transparent 50%)",
            "radial-gradient(circle at top left, rgba(244,114,182,0.18), transparent 45%)",
          ];

          return (
            <Box key={kpi.id} sx={metricCardStyle(glows[idx] || glows[0])}>
              <div className="p-5">
                <p className="text-sm font-semibold text-white/85">{kpi.name}</p>
                <p className="mt-3 text-4xl font-black tracking-tight text-white">
                  {kpi.actual}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-white/55">
                    {kpi.variance}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: kpi.tone || kpiToneMap.positive }}
                  >
                    {kpi.trend}
                  </span>
                </div>
              </div>
            </Box>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.7fr_0.95fr]">
        <div className="rounded-[24px] border border-white/10 bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <h3 className="text-2xl font-black tracking-tight text-white">
              Strategic Initiatives
            </h3>
            <p className="text-sm text-white/50">People Issues</p>
          </div>

          <div className="overflow-hidden">
            <div className="grid grid-cols-[1.2fr_0.7fr_0.7fr_0.9fr_1.2fr_1.1fr] border-b border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/75">
              <div>Initiative</div>
              <div>% Actual</div>
              <div>% Target</div>
              <div>Status</div>
              <div>Status Update</div>
              <div>Risks / Issues</div>
            </div>

            {initiatives.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[1.2fr_0.7fr_0.7fr_0.9fr_1.2fr_1.1fr] items-center border-b border-white/10 px-5 py-3 text-sm"
              >
                <div className="font-semibold text-white">{item.initiative}</div>
                <div className="text-white/80">{item.progress}%</div>
                <div className="text-white/80">100%</div>
                <div>
                  <Chip
                    label={item.status}
                    size="small"
                    sx={{
                      bgcolor: `${ragColorMap[item.rag]}20`,
                      color: ragColorMap[item.rag],
                      border: `1px solid ${ragColorMap[item.rag]}40`,
                      fontWeight: 700,
                    }}
                  />
                </div>
                <div className="pr-3 text-white/75">{item.reportingPeriodUpdate}</div>
                <div className="text-white/70">{item.risksIssues}</div>
              </div>
            ))}

            <div className="flex items-center justify-between px-5 py-4">
              <p className="text-sm text-white/60">Generated on April 4, 2026</p>
              <div className="flex items-center gap-2">
                <button className="rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-red-500/20">
                  PDF
                </button>
                <button className="rounded-xl bg-green-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-green-500/20">
                  Excel
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-2xl font-black tracking-tight text-white">
              KPI Highlights
            </h3>
            <span className="text-2xl text-white/50">···</span>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "People Retention", value: "91%", accent: "#8b5cf6" },
              { label: "Leadership Strength", value: "88%", accent: "#8b5cf6" },
              { label: "Governance", value: "84%", accent: "#8b5cf6" },
              { label: "Execution", value: "86%", accent: "#0ea5e9" },
            ].map((item) => (
              <div key={item.label}>
                <p className="mb-3 text-sm font-medium text-white/80">{item.label}</p>
                <div className="relative h-24 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                  <svg viewBox="0 0 120 70" className="h-full w-full">
                    <path
                      d="M20 55 A40 40 0 0 1 100 55"
                      fill="none"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M20 55 A40 40 0 0 1 82 24"
                      fill="none"
                      stroke={item.accent}
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <line
                      x1="60"
                      y1="55"
                      x2="84"
                      y2="37"
                      stroke="rgba(255,255,255,0.42)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-sm font-black text-white">
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-blue-500/10 p-4">
            <p className="text-sm font-semibold text-white">People Issues Snapshot</p>
            <div className="mt-3 space-y-3">
              {peopleIssues.slice(0, 3).map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-white">{item.issue}</p>
                    <Chip
                      label={formatLabel(item.severity)}
                      size="small"
                      sx={{
                        bgcolor: `${severityColorMap[item.severity]}20`,
                        color: severityColorMap[item.severity],
                        border: `1px solid ${severityColorMap[item.severity]}40`,
                        fontWeight: 700,
                      }}
                    />
                  </div>
                  <p className="text-xs leading-5 text-white/65">{item.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DivisionPresentationSlide;