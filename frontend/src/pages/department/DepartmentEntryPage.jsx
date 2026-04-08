import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  CardContent,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import WorkspaceLayout from "../../layouts/WorkspaceLayout";
import GlassCard from "../../components/common/GlassCard";
import KpiEntryTable from "../../kpiEntry/components/KpiEntryTable";
import SummaryStatCard from "../../components/common/SummaryStatCard";
import ActionBar from "../../components/common/ActionBar";
import FeedbackAlert from "../../components/common/FeedbackAlert";
import { panel2, softText, white } from "../../theme/dashboardTokens";
import useDepartmentSubmissionData from "../../features/reporting/hooks/useDepartmentSubmissionData";

const DepartmentEntryPage = () => {
  const { periodId } = useParams();
  const { submission, kpis, narrative: narrativeData } = useDepartmentSubmissionData();

  const [rows, setRows] = useState(kpis);
  const [narrative, setNarrative] = useState(narrativeData.summary);
  const [status, setStatus] = useState(submission.status);
  const [feedback, setFeedback] = useState(null);

  const updateRow = (id, field, value) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const computedRows = useMemo(() => {
    return rows.map((row) => {
      const actualNum = Number(row.actual);
      const hasActual = row.actual !== "" && !Number.isNaN(actualNum);

      let variance = "";
      let achievement = "";

      if (hasActual) {
        variance = actualNum - row.target;

        if (row.direction === "up") {
          achievement = row.target === 0 ? 0 : (actualNum / row.target) * 100;
        } else {
          achievement = actualNum === 0 ? 100 : (row.target / actualNum) * 100;
        }
      }

      return {
        ...row,
        variance,
        achievement,
      };
    });
  }, [rows]);

  const completedCount = computedRows.filter((row) => row.actual !== "").length;
  const missingCount = computedRows.length - completedCount;
  const canSubmit = missingCount === 0;

  const avgAchievement =
    computedRows.filter((r) => r.achievement !== "").length > 0
      ? (
          computedRows
            .filter((r) => r.achievement !== "")
            .reduce((sum, r) => sum + r.achievement, 0) /
          computedRows.filter((r) => r.achievement !== "").length
        ).toFixed(1)
      : "-";

  const handleSaveDraft = () => {
    setStatus("draft");
    setFeedback({
      severity: "success",
      message: "Draft saved locally. This will later connect to the backend save-draft endpoint.",
    });
  };

  const handleSubmit = () => {
    if (!canSubmit) {
      setFeedback({
        severity: "error",
        message: `Submission blocked. ${missingCount} KPI value(s) still need actual inputs.`,
      });
      return;
    }

    setStatus("submitted");
    setFeedback({
      severity: "success",
      message: "Submission marked as submitted and ready for supervisor review.",
    });
  };

  return (
    <WorkspaceLayout
      role="department"
      title="Department KPI Entry"
      subtitle={`Capture actuals for reporting period: ${periodId || submission.periodId}`}
    >
      <Stack spacing={3}>
        {feedback ? (
          <FeedbackAlert severity={feedback.severity}>
            {feedback.message}
          </FeedbackAlert>
        ) : null}

        <GlassCard>
          <CardContent>
            <Box className="flex flex-wrap items-center justify-between gap-3">
              <Box>
                <Typography sx={{ fontSize: 18, fontWeight: 800 }}>
                  {submission.departmentName}
                </Typography>
                <Typography sx={{ color: softText, mt: 0.5 }}>
                  Division: {submission.divisionName} • Due date: {submission.dueDate}
                </Typography>
              </Box>

              <ActionBar>
                <Chip
                  label={status}
                  sx={{ bgcolor: panel2, color: white, textTransform: "capitalize" }}
                />
                <Chip
                  label={`${completedCount}/${computedRows.length} KPIs completed`}
                  sx={{ bgcolor: "rgba(255,255,255,0.06)", color: white }}
                />
                <Button variant="outlined" sx={{ textTransform: "none" }} onClick={handleSaveDraft}>
                  Save Draft
                </Button>
                <Button
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                >
                  Submit
                </Button>
              </ActionBar>
            </Box>
          </CardContent>
        </GlassCard>

        <Box className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <SummaryStatCard
            label="KPIs Completed"
            value={`${completedCount}/${computedRows.length}`}
            subtext="Progress of departmental capture"
          />
          <SummaryStatCard
            label="Missing Inputs"
            value={missingCount}
            subtext="KPIs still requiring actual values"
          />
          <SummaryStatCard
            label="Average Achievement"
            value={avgAchievement === "-" ? "-" : `${avgAchievement}%`}
            subtext="Average across entered KPIs only"
          />
        </Box>

        {missingCount > 0 ? (
          <GlassCard sx={{ borderColor: "rgba(245,158,11,0.3)" }}>
            <CardContent>
              <Typography sx={{ fontSize: 15, fontWeight: 800 }}>
                Validation Notice
              </Typography>
              <Typography sx={{ color: softText, mt: 0.75 }}>
                There are still {missingCount} KPI value(s) without actual inputs.
                Submission is currently disabled until all required KPI fields are completed.
              </Typography>
            </CardContent>
          </GlassCard>
        ) : null}

        <GlassCard>
          <CardContent>
            <Typography sx={{ fontSize: 18, fontWeight: 800, mb: 2 }}>
              KPI Input Table
            </Typography>

            <KpiEntryTable rows={computedRows} onChange={updateRow} />
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardContent>
            <Typography sx={{ fontSize: 18, fontWeight: 800, mb: 1.5 }}>
              Department Narrative
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={4}
              value={narrative}
              onChange={(e) => setNarrative(e.target.value)}
              placeholder="Summarize achievements, issues, risks, and notable context for this reporting period."
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: white,
                  bgcolor: "rgba(255,255,255,0.02)",
                },
              }}
            />
          </CardContent>
        </GlassCard>
      </Stack>
    </WorkspaceLayout>
  );
};

export default DepartmentEntryPage;