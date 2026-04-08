import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import WorkspaceLayout from "../../layouts/WorkspaceLayout";
import GlassCard from "../../components/common/GlassCard";
import StatusChip from "../../components/common/StatusChip";
import SummaryStatCard from "../../components/common/SummaryStatCard";
import ActionBar from "../../components/common/ActionBar";
import FeedbackAlert from "../../components/common/FeedbackAlert";
import { line, panel2, softText, white } from "../../theme/dashboardTokens";

const readinessChecks = [
  { label: "All departments submitted", status: "approved" },
  { label: "Supervisor reviews completed", status: "submitted" },
  { label: "Division commentary completed", status: "approved" },
  { label: "Validation issues resolved", status: "returned" },
];

const publishSummary = [
  { label: "Reporting Period", value: "Q1 2026", subtext: "Current active reporting window" },
  { label: "Divisions Complete", value: "6 / 8", subtext: "Divisions with sufficient workflow progress" },
  { label: "Departments Complete", value: "18 / 24", subtext: "Department submissions fully processed" },
  { label: "Current State", value: "Awaiting final readiness", subtext: "Not yet safe for executive publishing" },
];

const StrategyPublishPage = () => {
  const [feedback, setFeedback] = useState(null);
  const [locked, setLocked] = useState(false);
  const [published, setPublished] = useState(false);

  const blockingIssues = useMemo(
    () => readinessChecks.filter((item) => item.status !== "approved"),
    []
  );

  const canLock = blockingIssues.length === 0;
  const canPublish = canLock && locked;

  const handleValidationCheck = () => {
    setFeedback({
      severity: canLock ? "success" : "warning",
      message: canLock
        ? "Validation passed. This reporting period is ready to be locked."
        : `Validation found ${blockingIssues.length} blocking issue(s). Resolve them before locking.`,
    });
  };

  const handleLock = () => {
    if (!canLock) {
      setFeedback({
        severity: "error",
        message: "Lock blocked. There are unresolved readiness checks.",
      });
      return;
    }

    setLocked(true);
    setFeedback({
      severity: "success",
      message: "Reporting period locked. Further edits should now be prevented.",
    });
  };

  const handlePublish = () => {
    if (!canPublish) {
      setFeedback({
        severity: "error",
        message: "Publish blocked. Lock the period first and ensure all checks are resolved.",
      });
      return;
    }

    setPublished(true);
    setFeedback({
      severity: "success",
      message: "Executive snapshot published successfully to the CEO view.",
    });
  };

  return (
    <WorkspaceLayout
      role="strategy"
      title="Publish & Lock"
      subtitle="Finalize approved submissions and publish the executive snapshot."
      actions={
        <StatusChip
          status={published ? "approved" : locked ? "locked" : "submitted"}
          label={published ? "Published" : locked ? "Locked" : "Pending Lock"}
        />
      }
    >
      <Stack spacing={3}>
        {feedback ? (
          <FeedbackAlert severity={feedback.severity}>
            {feedback.message}
          </FeedbackAlert>
        ) : null}

        <Box className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {publishSummary.map((item) => (
            <SummaryStatCard
              key={item.label}
              label={item.label}
              value={item.value}
              subtext={item.subtext}
            />
          ))}
        </Box>

        {blockingIssues.length > 0 ? (
          <GlassCard sx={{ borderColor: "rgba(239,68,68,0.3)" }}>
            <CardContent>
              <Typography sx={{ fontSize: 15, fontWeight: 800 }}>
                Blocking Issues Detected
              </Typography>
              <Typography sx={{ color: softText, mt: 0.75 }}>
                This period is not yet ready to lock and publish. Resolve all non-approved
                readiness checks first.
              </Typography>
            </CardContent>
          </GlassCard>
        ) : null}

        <GlassCard>
          <CardContent>
            <Typography sx={{ fontSize: 18, fontWeight: 800, mb: 2 }}>
              Readiness Checks
            </Typography>

            <Stack spacing={1.5}>
              {readinessChecks.map((check) => (
                <Box
                  key={check.label}
                  className="flex items-center justify-between gap-3"
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: panel2,
                    border: `1px solid ${line}`,
                  }}
                >
                  <Typography sx={{ color: white, fontWeight: 700 }}>
                    {check.label}
                  </Typography>
                  <StatusChip status={check.status} />
                </Box>
              ))}
            </Stack>

            <Divider sx={{ my: 2.5, borderColor: line }} />

            <Typography sx={{ color: softText, lineHeight: 1.8 }}>
              Locking this reporting period will prevent further edits and make the
              finalized performance snapshot available to the CEO dashboard.
            </Typography>

            <Box sx={{ mt: 2 }}>
              <ActionBar>
                <Button
                  variant="outlined"
                  sx={{ textTransform: "none" }}
                  onClick={handleValidationCheck}
                >
                  Run Validation Check
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ textTransform: "none" }}
                  onClick={handleLock}
                  disabled={!canLock || locked}
                >
                  Lock Period
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ textTransform: "none" }}
                  onClick={handlePublish}
                  disabled={!canPublish || published}
                >
                  Publish to CEO View
                </Button>
              </ActionBar>
            </Box>
          </CardContent>
        </GlassCard>
      </Stack>
    </WorkspaceLayout>
  );
};

export default StrategyPublishPage;