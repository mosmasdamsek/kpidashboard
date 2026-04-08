import React from "react";
import {
  Box,
  Button,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import WorkspaceLayout from "../../layouts/WorkspaceLayout";
import GlassCard from "../../components/common/GlassCard";
import StatusChip from "../../components/common/StatusChip";
import CircularScore from "../../components/common/CircularScore";
import { softText, white } from "../../theme/dashboardTokens";
import useDivisionWorkflowData from "../../features/reporting/hooks/useDivisionWorkflowData";

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

const kpiStatusColorMap = {
  "Above Target": {
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.28)",
  },
  "Below Target": {
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.28)",
  },
  "Slightly Below Target": {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.28)",
  },
  "On Target": {
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.28)",
  },
};

const formatLabel = (value = "") =>
  value
    .toString()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const PreviewSection = ({ title, subtitle, accent = "#8b5cf6", children }) => (
  <GlassCard>
    <CardContent sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          mb: 2.25,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 900,
              color: white,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </Typography>
          {subtitle ? (
            <Typography
              sx={{
                color: softText,
                fontSize: 12.5,
                mt: 0.55,
                maxWidth: 760,
                lineHeight: 1.6,
              }}
            >
              {subtitle}
            </Typography>
          ) : null}
        </Box>

        <Box
          sx={{
            width: 46,
            height: 4,
            borderRadius: 999,
            flexShrink: 0,
            mt: 0.8,
            background: `linear-gradient(90deg, ${accent} 0%, rgba(255,255,255,0.12) 100%)`,
          }}
        />
      </Box>

      {children}
    </CardContent>
  </GlassCard>
);

const metricCardSx = {
  p: 2.2,
  borderRadius: 3,
  bgcolor: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.06)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
};

const DivisionPreviewPage = () => {
  const {
    division,
    departments,
    kpis,
    initiatives,
    peopleIssues,
    commentary,
  } = useDivisionWorkflowData();

  const financialKpis = (kpis || []).filter(
    (item) => item.type === "financial"
  );
  const nonFinancialKpis = (kpis || []).filter(
    (item) => item.type === "non_financial"
  );

  return (
    <WorkspaceLayout
      role="division"
      title="Division Preview"
      subtitle="Preview the divisional submission before final upward review."
      actions={<StatusChip status={division.status} label="Preview Ready" />}
    >
      <Stack spacing={3}>
        <GlassCard>
          <CardContent sx={{ p: 3 }}>
            <Box className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    px: 1.25,
                    py: 0.7,
                    borderRadius: 999,
                    bgcolor: "rgba(139,92,246,0.12)",
                    border: "1px solid rgba(139,92,246,0.22)",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "#8b5cf6",
                    }}
                  />
                  <Typography sx={{ fontSize: 11.5, fontWeight: 800, color: "#c4b5fd" }}>
                    EXCO DIVISION REPORT PREVIEW
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    fontSize: { xs: 26, md: 30 },
                    fontWeight: 900,
                    color: white,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {division.name} Division
                </Typography>

                <Typography sx={{ color: softText, mt: 0.9, fontSize: 13.5 }}>
                  EXCO Reporting Period: {division.periodName}
                </Typography>

                <Typography
                  sx={{
                    color: softText,
                    mt: 0.5,
                    fontSize: 13,
                    maxWidth: 760,
                    lineHeight: 1.7,
                  }}
                >
                  Divisional submission preview prepared for upward reporting and executive review.
                </Typography>

                <Box
                  sx={{
                    mt: 2.5,
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr 1fr",
                      md: "repeat(4, minmax(0, 1fr))",
                    },
                    gap: 2,
                  }}
                >
                  <Box sx={metricCardSx}>
                    <Typography sx={{ fontSize: 11.5, color: softText }}>
                      Division Head
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: white, fontWeight: 700, mt: 0.5 }}>
                      {division.head || "-"}
                    </Typography>
                  </Box>

                  <Box sx={metricCardSx}>
                    <Typography sx={{ fontSize: 11.5, color: softText }}>
                      Reporting Period
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: white, fontWeight: 700, mt: 0.5 }}>
                      {division.periodName}
                    </Typography>
                  </Box>

                  <Box sx={metricCardSx}>
                    <Typography sx={{ fontSize: 11.5, color: softText }}>
                      Status
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: white, fontWeight: 700, mt: 0.5 }}>
                      {formatLabel(division.status)}
                    </Typography>
                  </Box>

                  <Box sx={metricCardSx}>
                    <Typography sx={{ fontSize: 11.5, color: softText }}>
                      Overall Score
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: white, fontWeight: 700, mt: 0.5 }}>
                      {division.score}%
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  flexShrink: 0,
                  alignSelf: { xs: "flex-start", xl: "center" },
                }}
              >
                <CircularScore value={division.score} color="#8b5cf6" />
              </Box>
            </Box>
          </CardContent>
        </GlassCard>

        <PreviewSection
          title="Executive Narrative Preview"
          subtitle="Narrative that accompanies the divisional submission."
          accent="#8b5cf6"
        >
          <Box
            sx={{
              p: 2.25,
              borderRadius: 3,
              bgcolor: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <Typography sx={{ color: white, lineHeight: 1.85, fontSize: 13.2 }}>
              {commentary.summary}
            </Typography>
          </Box>

          <Divider sx={{ my: 2.5, borderColor: "rgba(148,163,184,0.12)" }} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", xl: "repeat(3, minmax(0, 1fr))" },
              gap: 2,
            }}
          >
            <Box sx={metricCardSx}>
              <Typography sx={{ fontSize: 14.5, fontWeight: 800, mb: 1, color: white }}>
                Major Achievements
              </Typography>
              <Typography sx={{ color: white, lineHeight: 1.75, fontSize: 12.8 }}>
                {commentary.achievements}
              </Typography>
            </Box>

            <Box sx={metricCardSx}>
              <Typography sx={{ fontSize: 14.5, fontWeight: 800, mb: 1, color: white }}>
                Risks and Challenges
              </Typography>
              <Typography sx={{ color: white, lineHeight: 1.75, fontSize: 12.8 }}>
                {commentary.risks}
              </Typography>
            </Box>

            <Box sx={metricCardSx}>
              <Typography sx={{ fontSize: 14.5, fontWeight: 800, mb: 1, color: white }}>
                Support Required
              </Typography>
              <Typography sx={{ color: white, lineHeight: 1.75, fontSize: 12.8 }}>
                {commentary.supportNeeded}
              </Typography>
            </Box>
          </Box>
        </PreviewSection>

        <PreviewSection
          title="Financial KPIs"
          subtitle="Financial performance indicators for divisional reporting."
          accent="#22c55e"
        >
          {financialKpis.length ? (
            <Box className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {financialKpis.map((item) => (
                <Box key={item.id} sx={metricCardSx}>
                  <Typography sx={{ fontSize: 12.5, color: softText }}>
                    {item.name}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 23,
                      fontWeight: 900,
                      mt: 1,
                      color: white,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {item.actual}
                  </Typography>

                  <Box
                    sx={{
                      mt: 1.4,
                      display: "grid",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      gap: 1,
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontSize: 11.5, color: softText }}>
                        Target
                      </Typography>
                      <Typography sx={{ fontSize: 12.5, color: white }}>
                        {item.target}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 11.5, color: softText }}>
                        Achievement
                      </Typography>
                      <Typography sx={{ fontSize: 12.5, color: white }}>
                        {item.achievement}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 11.5, color: softText }}>
                        Variance
                      </Typography>
                      <Typography sx={{ fontSize: 12.5, color: white }}>
                        {item.variance}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 11.5, color: softText, mb: 0.45 }}>
                        Status
                      </Typography>
                      {item.status ? (
                        <Chip
                          label={item.status}
                          size="small"
                          sx={{
                            bgcolor:
                              kpiStatusColorMap[item.status]?.bg ||
                              "rgba(255,255,255,0.06)",
                            color: kpiStatusColorMap[item.status]?.color || white,
                            border: `1px solid ${
                              kpiStatusColorMap[item.status]?.border ||
                              "rgba(255,255,255,0.12)"
                            }`,
                            fontWeight: 700,
                          }}
                        />
                      ) : (
                        <Typography sx={{ fontSize: 12.5, color: white }}>-</Typography>
                      )}
                    </Box>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 800,
                      mt: 1.2,
                      color: item.tone,
                    }}
                  >
                    {item.trend}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography sx={{ color: softText }}>
              No financial KPIs have been added for this reporting period.
            </Typography>
          )}
        </PreviewSection>

        <PreviewSection
          title="Non-Financial KPIs"
          subtitle="Operational and service indicators reported for the period."
          accent="#3b82f6"
        >
          {nonFinancialKpis.length ? (
            <Box className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {nonFinancialKpis.map((item) => (
                <Box key={item.id} sx={metricCardSx}>
                  <Typography sx={{ fontSize: 12.5, color: softText }}>
                    {item.name}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 23,
                      fontWeight: 900,
                      mt: 1,
                      color: white,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {item.actual}
                  </Typography>

                  <Box
                    sx={{
                      mt: 1.4,
                      display: "grid",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      gap: 1,
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontSize: 11.5, color: softText }}>
                        Target
                      </Typography>
                      <Typography sx={{ fontSize: 12.5, color: white }}>
                        {item.target}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 11.5, color: softText }}>
                        Achievement
                      </Typography>
                      <Typography sx={{ fontSize: 12.5, color: white }}>
                        {item.achievement}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 11.5, color: softText }}>
                        Variance
                      </Typography>
                      <Typography sx={{ fontSize: 12.5, color: white }}>
                        {item.variance}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 11.5, color: softText, mb: 0.45 }}>
                        Status
                      </Typography>
                      {item.status ? (
                        <Chip
                          label={item.status}
                          size="small"
                          sx={{
                            bgcolor:
                              kpiStatusColorMap[item.status]?.bg ||
                              "rgba(255,255,255,0.06)",
                            color: kpiStatusColorMap[item.status]?.color || white,
                            border: `1px solid ${
                              kpiStatusColorMap[item.status]?.border ||
                              "rgba(255,255,255,0.12)"
                            }`,
                            fontWeight: 700,
                          }}
                        />
                      ) : (
                        <Typography sx={{ fontSize: 12.5, color: white }}>-</Typography>
                      )}
                    </Box>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 800,
                      mt: 1.2,
                      color: item.tone,
                    }}
                  >
                    {item.trend}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography sx={{ color: softText }}>
              No non-financial KPIs have been added for this reporting period.
            </Typography>
          )}
        </PreviewSection>

        <PreviewSection
          title="Strategic Initiatives & Projects"
          subtitle="Progress against strategic initiatives and key divisional projects."
          accent="#f59e0b"
        >
          {initiatives.length ? (
            <Stack spacing={2}>
              {initiatives.map((item) => (
                <Box key={item.id} sx={metricCardSx}>
                  <Box className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <Box>
                      <Typography sx={{ fontWeight: 900, color: white, fontSize: 15.5 }}>
                        {item.initiative}
                      </Typography>
                      <Typography
                        sx={{ color: softText, fontSize: 12.5, mt: 0.45, lineHeight: 1.65 }}
                      >
                        Strategic Objective: {item.strategicObjective}
                      </Typography>
                    </Box>

                    <Box className="flex flex-wrap gap-2">
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
                      <Chip
                        label={`${item.progress}% complete`}
                        size="small"
                        sx={{
                          bgcolor: "rgba(255,255,255,0.06)",
                          color: white,
                          border: "1px solid rgba(255,255,255,0.08)",
                          fontWeight: 700,
                        }}
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      mt: 2,
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        md: "repeat(2, minmax(0, 1fr))",
                        xl: "repeat(3, minmax(0, 1fr))",
                      },
                      gap: 1.5,
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontSize: 11.5, color: softText }}>
                        Owner
                      </Typography>
                      <Typography sx={{ fontSize: 12.5, color: white }}>
                        {formatLabel(item.owner)}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 11.5, color: softText }}>
                        Type
                      </Typography>
                      <Typography sx={{ fontSize: 12.5, color: white }}>
                        {formatLabel(item.type)}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 11.5, color: softText }}>
                        Current Milestone
                      </Typography>
                      <Typography sx={{ fontSize: 12.5, color: white }}>
                        {item.milestoneCurrent}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 11.5, color: softText }}>
                        Next Milestone
                      </Typography>
                      <Typography sx={{ fontSize: 12.5, color: white }}>
                        {item.milestoneNext}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 11.5, color: softText }}>
                        Due Date
                      </Typography>
                      <Typography sx={{ fontSize: 12.5, color: white }}>
                        {item.dueDate || "-"}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 11.5, color: softText }}>
                        Progress
                      </Typography>
                      <Typography sx={{ fontSize: 12.5, color: white }}>
                        {item.progress}%
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mt: 1.75 }}>
                    <Typography sx={{ fontSize: 11.5, color: softText }}>
                      Progress This Period
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 12.5,
                        color: white,
                        mt: 0.35,
                        lineHeight: 1.7,
                      }}
                    >
                      {item.reportingPeriodUpdate}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 1.25 }}>
                    <Typography sx={{ fontSize: 11.5, color: softText }}>
                      Risks / Issues
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 12.5,
                        color: "#fca5a5",
                        mt: 0.35,
                        lineHeight: 1.7,
                      }}
                    >
                      {item.risksIssues}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 1.25 }}>
                    <Typography sx={{ fontSize: 11.5, color: softText }}>
                      Support Required
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 12.5,
                        color: white,
                        mt: 0.35,
                        lineHeight: 1.7,
                      }}
                    >
                      {item.supportRequired}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography sx={{ color: softText }}>
              No strategic initiatives or projects have been added for this reporting period.
            </Typography>
          )}
        </PreviewSection>

        <PreviewSection
          title="People Issues & Workforce Risks"
          subtitle="People-related issues affecting divisional delivery and execution."
          accent="#ef4444"
        >
          {peopleIssues.length ? (
            <Stack spacing={2}>
              {peopleIssues.map((item) => (
                <Box key={item.id} sx={metricCardSx}>
                  <Box className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <Box>
                      <Typography sx={{ fontWeight: 900, color: white, fontSize: 15 }}>
                        {item.issue}
                      </Typography>
                    </Box>

                    <Box className="flex flex-wrap gap-2">
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
                      <StatusChip status={item.status} />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      mt: 2,
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        md: "repeat(2, minmax(0, 1fr))",
                      },
                      gap: 1.5,
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontSize: 11.5, color: softText }}>
                        Affected Area
                      </Typography>
                      <Typography sx={{ fontSize: 12.5, color: white }}>
                        {item.affectedArea}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 11.5, color: softText }}>
                        Category
                      </Typography>
                      <Typography sx={{ fontSize: 12.5, color: white }}>
                        {formatLabel(item.category)}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 11.5, color: softText }}>
                        Owner
                      </Typography>
                      <Typography sx={{ fontSize: 12.5, color: white }}>
                        {item.owner}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 11.5, color: softText }}>
                        Due Date
                      </Typography>
                      <Typography sx={{ fontSize: 12.5, color: white }}>
                        {item.dueDate}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mt: 1.5 }}>
                    <Typography sx={{ fontSize: 11.5, color: softText }}>
                      Impact
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 12.5,
                        color: white,
                        mt: 0.35,
                        lineHeight: 1.7,
                      }}
                    >
                      {item.impact}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 1.25 }}>
                    <Typography sx={{ fontSize: 11.5, color: softText }}>
                      Mitigation
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 12.5,
                        color: white,
                        mt: 0.35,
                        lineHeight: 1.7,
                      }}
                    >
                      {item.mitigation}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography sx={{ color: softText }}>
              No people issues have been raised for this reporting period.
            </Typography>
          )}
        </PreviewSection>

        <PreviewSection
          title="Department Contributions"
          subtitle="Department-level contribution to the divisional submission."
          accent="#06b6d4"
        >
          <Stack spacing={1.5}>
            {departments.map((item) => (
              <Box
                key={item.id}
                className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
                sx={metricCardSx}
              >
                <Box>
                  <Typography sx={{ fontWeight: 800, color: white }}>
                    {item.department}
                  </Typography>
                  <Typography
                    sx={{ color: softText, fontSize: 12.5, mt: 0.4, lineHeight: 1.65 }}
                  >
                    Department score: {item.score}% · {item.highlights}
                  </Typography>
                </Box>

                <StatusChip status={item.status} />
              </Box>
            ))}
          </Stack>
        </PreviewSection>

        <GlassCard>
          <CardContent sx={{ p: 3 }}>
            <Box className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <Box>
                <Typography sx={{ fontWeight: 800, color: white }}>
                  Ready for upward submission
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: softText, mt: 0.4 }}>
                  Review the content above before forwarding the divisional report.
                </Typography>
              </Box>

              <Box className="flex flex-wrap items-center gap-2">
                <Button variant="outlined" sx={{ textTransform: "none" }}>
                  Back to Commentary
                </Button>
                <Button variant="contained" sx={{ textTransform: "none" }}>
                  Submit Upward
                </Button>
              </Box>
            </Box>
          </CardContent>
        </GlassCard>
      </Stack>
    </WorkspaceLayout>
  );
};

export default DivisionPreviewPage;