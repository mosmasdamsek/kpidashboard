import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import WorkspaceLayout from "../../layouts/WorkspaceLayout";
import GlassCard from "../../components/common/GlassCard";
import StatusChip from "../../components/common/StatusChip";
import SummaryStatCard from "../../components/common/SummaryStatCard";
import ActionBar from "../../components/common/ActionBar";
import FeedbackAlert from "../../components/common/FeedbackAlert";
import { line, panel2, softText, white } from "../../theme/dashboardTokens";
import useSupervisorReviewData from "../../features/reporting/hooks/useSupervisorReviewData";


const SupervisorReviewPage = () => {
  const { submissionId } = useParams();
  const { submission, kpis, review } = useSupervisorReviewData();
  const [reviewComment, setReviewComment] = useState(review.reviewComment);
  const [status, setStatus] = useState(submission.status);
  const [feedback, setFeedback] = useState(null);

  const computedRows = useMemo(() => {
    return kpis.map((row) => {
      const actualNum = Number(row.actual);
      const variance = actualNum - row.target;

      let achievement = 0;
      if (row.direction === "up") {
        achievement = row.target === 0 ? 0 : (actualNum / row.target) * 100;
      } else {
        achievement = actualNum === 0 ? 100 : (row.target / actualNum) * 100;
      }

      return {
        ...row,
        variance,
        achievement,
      };
    });
  }, [kpis]);

  const avgAchievement = (
    computedRows.reduce((sum, row) => sum + row.achievement, 0) / computedRows.length
  ).toFixed(1);

  const handleApprove = () => {
    setStatus("approved");
    setFeedback({
      severity: "success",
      message: "Submission approved and ready for divisional roll-up.",
    });
  };

  const handleReturn = () => {
    if (!reviewComment.trim()) {
      setFeedback({
        severity: "error",
        message: "Return blocked. Please provide a review note explaining what needs correction.",
      });
      return;
    }

    setStatus("returned");
    setFeedback({
      severity: "warning",
      message: "Submission returned to the department with supervisor comments.",
    });
  };

  return (
    <WorkspaceLayout
      role="supervisor"
      title="Review Submission"
      subtitle={`Inspect submission ${submissionId || submission.id} and decide whether to approve or return it.`}
      actions={<StatusChip status={status} />}
    >
      <Stack spacing={3}>
        {feedback ? (
          <FeedbackAlert severity={feedback.severity}>
            {feedback.message}
          </FeedbackAlert>
        ) : null}

        <GlassCard>
          <CardContent>
            <Box className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Box>
                <Typography sx={{ fontSize: 12, color: softText }}>Department</Typography>
                <Typography sx={{ fontWeight: 800, color: white }}>
                  {submission.departmentName}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: 12, color: softText }}>Division</Typography>
                <Typography sx={{ fontWeight: 800, color: white }}>
                  {submission.divisionName}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: 12, color: softText }}>Period</Typography>
                <Typography sx={{ fontWeight: 800, color: white }}>
                  {submission.periodName}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: 12, color: softText }}>Submitted By</Typography>
                <Typography sx={{ fontWeight: 800, color: white }}>
                  {submission.submittedBy}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </GlassCard>

        <Box className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <SummaryStatCard
            label="Submitted KPIs"
            value={computedRows.length}
            subtext="Total KPI lines under review"
          />
          <SummaryStatCard
            label="Average Achievement"
            value={`${avgAchievement}%`}
            subtext="Average across reviewed KPI values"
          />
          <SummaryStatCard
            label="Submission Time"
            value={submission.submittedAt}
            subtext="Latest submitted version timestamp"
          />
        </Box>

        <GlassCard>
          <CardContent>
            <Typography sx={{ fontSize: 18, fontWeight: 800, mb: 2 }}>
              Submitted KPI Values
            </Typography>

            <Stack spacing={2}>
              {computedRows.map((row) => (
                <Box
                  key={row.id}
                  sx={{
                    p: 2,
                    border: `1px solid ${line}`,
                    borderRadius: 3,
                    bgcolor: panel2,
                  }}
                >
                  <Box className="grid grid-cols-1 gap-3 xl:grid-cols-[1.4fr_0.7fr_0.8fr_0.8fr_0.8fr]">
                    <Box>
                      <Typography sx={{ fontWeight: 800, color: white }}>
                        {row.kpi}
                      </Typography>
                      <Typography sx={{ color: softText, fontSize: 12.5, mt: 0.5 }}>
                        Unit: {row.unit} • Direction: {row.direction}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 12, color: softText }}>Target</Typography>
                      <Typography sx={{ fontWeight: 800, color: white }}>{row.target}</Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 12, color: softText }}>Actual</Typography>
                      <Typography sx={{ fontWeight: 800, color: white }}>{row.actual}</Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 12, color: softText }}>Variance</Typography>
                      <Typography sx={{ fontWeight: 800, color: white }}>{row.variance}</Typography>
                    </Box>

                    <Box>
                      <Typography sx={{ fontSize: 12, color: softText }}>Achievement %</Typography>
                      <Typography sx={{ fontWeight: 800, color: white }}>
                        {row.achievement.toFixed(1)}%
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2, borderColor: line }} />

                  <Box>
                    <Typography sx={{ fontSize: 12, color: softText, mb: 0.75 }}>
                      Department Comment
                    </Typography>
                    <Typography sx={{ color: white }}>{row.comment || "-"}</Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </GlassCard>

        <GlassCard sx={{ borderColor: "rgba(239,68,68,0.25)" }}>
          <CardContent>
            <Typography sx={{ fontSize: 15, fontWeight: 800 }}>
              Review Guidance
            </Typography>
            <Typography sx={{ color: softText, mt: 0.75 }}>
              Use return only where correction is required. Approve where inputs are complete,
              reasonable, and aligned with reporting expectations.
            </Typography>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardContent>
            <Typography sx={{ fontSize: 18, fontWeight: 800, mb: 1.5 }}>
              Supervisor Review Note
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={4}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Add your review note, corrections request, or approval remarks."
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: white,
                  bgcolor: "rgba(255,255,255,0.02)",
                },
              }}
            />

            <Box sx={{ mt: 2 }}>
              <ActionBar>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ textTransform: "none" }}
                  onClick={handleReturn}
                >
                  Return Submission
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ textTransform: "none" }}
                  onClick={handleApprove}
                >
                  Approve Submission
                </Button>
              </ActionBar>
            </Box>
          </CardContent>
        </GlassCard>
      </Stack>
    </WorkspaceLayout>
  );
};

export default SupervisorReviewPage;