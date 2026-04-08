import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { mockRiskItems } from "../../data/riskregister/mockRiskDashboard";

const InfoBlock = ({ label, value }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1">{value || "-"}</Typography>
  </Box>
);

const getTitleName = (obj) =>
  obj?.name || obj?.title || obj?.position_name || obj?.job_title || "-";

const getUserName = (obj) =>
  obj?.full_name || obj?.name || obj?.username || obj?.email || "-";

const getDepartmentName = (risk) =>
  risk?.register?.Department?.name ||
  risk?.register?.department?.name ||
  "-";

const getCurrentScore = (risk) => {
  if (risk?.residual_impact && risk?.residual_likelihood) {
    return risk.residual_impact * risk.residual_likelihood;
  }
  return (risk?.inherent_impact || 0) * (risk?.inherent_likelihood || 0);
};

const getRating = (score) => {
  if (!score) return "Not Rated";
  if (score >= 21) return "Critical";
  if (score >= 15) return "Maximum";
  if (score >= 10) return "High";
  if (score >= 4) return "Medium";
  return "Low";
};

const labelize = (value) => {
  if (!value) return "-";
  return String(value)
    .replaceAll("_", " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
};

const RiskItemDetailPage = () => {
  const { riskId, id } = useParams();
  const resolvedId = riskId || id;

  const risk = useMemo(
    () => mockRiskItems.find((item) => String(item.id) === String(resolvedId)),
    [resolvedId]
  );

  if (!risk) {
    return (
      <Box p={3}>
        <Typography variant="h5" fontWeight={700}>
          Risk not found
        </Typography>
      </Box>
    );
  }

  const inherentScore =
    (risk.inherent_likelihood || 0) * (risk.inherent_impact || 0);

  const residualScore =
    risk.residual_likelihood && risk.residual_impact
      ? risk.residual_likelihood * risk.residual_impact
      : null;

  const currentScore = getCurrentScore(risk);
  const rating = getRating(currentScore);

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={700} mb={1}>
        {risk.risk_number} - {risk.description}
      </Typography>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
        <Chip size="small" label={labelize(risk.entry_type)} />
        <Chip size="small" label={labelize(risk.response_status)} />
        <Chip size="small" label={rating} color="warning" />
        <Chip
          size="small"
          variant="outlined"
          label={risk.register?.reporting_period?.name || "-"}
        />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Risk Information
              </Typography>

              <InfoBlock label="Department" value={getDepartmentName(risk)} />
              <InfoBlock label="Category" value={risk.category?.name} />
              <InfoBlock
                label="Strategic Objective"
                value={risk.strategic_objective?.name || risk.strategic_objective?.title}
              />
              <InfoBlock label="Description" value={risk.description} />
              <InfoBlock
                label="Contributing Factors"
                value={risk.contributing_factors}
              />
              <InfoBlock label="Consequences" value={risk.consequences} />
              <InfoBlock
                label="Speed of Onset"
                value={labelize(risk.speed_of_onset)}
              />
              <InfoBlock label="Existing Controls" value={risk.existing_controls} />
              <InfoBlock
                label="Response Strategy"
                value={labelize(risk.response_strategy)}
              />
              <InfoBlock label="Risk Trend" value={labelize(risk.risk_trend)} />
              <InfoBlock label="Notes" value={risk.notes} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Ownership and Scoring
              </Typography>

              <InfoBlock
                label="Register Owner"
                value={getUserName(risk.register?.owner)}
              />
              <InfoBlock
                label="Risk Owner Title"
                value={getTitleName(risk.risk_owner)}
              />
              <InfoBlock
                label="Risk Owner User"
                value={getUserName(risk.risk_owner_user)}
              />
              <InfoBlock
                label="Responsible Title"
                value={getTitleName(risk.responsible)}
              />
              <InfoBlock
                label="Responsible User"
                value={getUserName(risk.responsible_user)}
              />
              <InfoBlock
                label="Escalation Level"
                value={risk.escalation_level?.name}
              />

              <Divider sx={{ my: 2 }} />

              <InfoBlock label="Inherent Impact" value={risk.inherent_impact} />
              <InfoBlock
                label="Inherent Likelihood"
                value={risk.inherent_likelihood}
              />
              <InfoBlock label="Inherent Score" value={inherentScore} />
              <InfoBlock label="Residual Impact" value={risk.residual_impact} />
              <InfoBlock
                label="Residual Likelihood"
                value={risk.residual_likelihood}
              />
              <InfoBlock label="Residual Score" value={residualScore} />
              <InfoBlock label="Current Score" value={currentScore} />
              <InfoBlock label="Rating" value={rating} />
              <InfoBlock label="Due Date" value={risk.due_date} />
              <InfoBlock label="Due Period" value={risk.due_period} />
              <InfoBlock label="Last Review Date" value={risk.last_review_date} />
              <InfoBlock label="Next Review Date" value={risk.next_review_date} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Mitigation Actions
              </Typography>

              {(risk.mitigation_actions || []).length ? (
                (risk.mitigation_actions || []).map((action) => (
                  <Box key={action.id} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {action.action_description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Owner: {getUserName(action.owner_user)} /{" "}
                      {getTitleName(action.owner_title)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {labelize(action.status)} | Target Date:{" "}
                      {action.target_date || "-"} | Target Period:{" "}
                      {action.target_period || "-"}
                    </Typography>
                    <Typography variant="body2">
                      {action.progress_notes || "-"}
                    </Typography>
                    <Divider sx={{ mt: 1.5 }} />
                  </Box>
                ))
              ) : (
                <Typography color="text.secondary">
                  No mitigation actions recorded.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Review History
              </Typography>

              {(risk.reviews || []).length ? (
                (risk.reviews || []).map((review) => (
                  <Box key={review.id} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Review Date: {review.review_date || "-"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Reviewer: {getUserName(review.reviewed_by)}
                    </Typography>
                    <Typography variant="body2">
                      {review.comments || "-"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Next Review: {review.next_review_date || "-"}
                    </Typography>
                    <Divider sx={{ mt: 1.5 }} />
                  </Box>
                ))
              ) : (
                <Typography color="text.secondary">
                  No reviews recorded.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RiskItemDetailPage;