import React, { useState } from "react";
import {
  Box,
  Button,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import WorkspaceLayout from "../../layouts/WorkspaceLayout";
import GlassCard from "../../components/common/GlassCard";
import StatusChip from "../../components/common/StatusChip";
import { softText, white } from "../../theme/dashboardTokens";
import useDivisionWorkflowData from "../../features/reporting/hooks/useDivisionWorkflowData";

const DivisionCommentaryPage = () => {
  const { division, commentary } = useDivisionWorkflowData();

  const [form, setForm] = useState({
    executiveSummary: commentary.executiveSummary,
    achievements: commentary.achievements,
    risks: commentary.risks,
    supportNeeded: commentary.supportNeeded,
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <WorkspaceLayout
      role="division"
      title="Division Commentary"
      subtitle="Add divisional narrative, achievements, risks, and support needs before upward submission."
      actions={<StatusChip status="draft" label="Commentary Draft" />}
    >
      <Stack spacing={3}>
        <GlassCard>
          <CardContent>
            <Box className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Box>
                <Typography sx={{ fontSize: 12, color: softText }}>Division</Typography>
                <Typography sx={{ fontWeight: 800, color: white }}>
                  {division.name}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: 12, color: softText }}>Period</Typography>
                <Typography sx={{ fontWeight: 800, color: white }}>
                  {division.periodName}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: 12, color: softText }}>Division Head</Typography>
                <Typography sx={{ fontWeight: 800, color: white }}>
                  {division.divisionHead}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: 12, color: softText }}>Status</Typography>
                <Box sx={{ mt: 0.5 }}>
                  <StatusChip status="draft" />
                </Box>
              </Box>
            </Box>
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardContent>
            <Typography sx={{ fontSize: 18, fontWeight: 800, mb: 2 }}>
              Division Executive Summary
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={4}
              value={form.executiveSummary}
              onChange={(e) => handleChange("executiveSummary", e.target.value)}
              placeholder="Summarize the overall divisional performance for the period."
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: white,
                  bgcolor: "rgba(255,255,255,0.02)",
                },
              }}
            />
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardContent>
            <Typography sx={{ fontSize: 18, fontWeight: 800, mb: 2 }}>
              Major Achievements
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={4}
              value={form.achievements}
              onChange={(e) => handleChange("achievements", e.target.value)}
              placeholder="Outline key divisional wins, progress areas, and noteworthy improvements."
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: white,
                  bgcolor: "rgba(255,255,255,0.02)",
                },
              }}
            />
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardContent>
            <Typography sx={{ fontSize: 18, fontWeight: 800, mb: 2 }}>
              Risks and Challenges
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={4}
              value={form.risks}
              onChange={(e) => handleChange("risks", e.target.value)}
              placeholder="Describe major risks, underperformance, bottlenecks, or emerging concerns."
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: white,
                  bgcolor: "rgba(255,255,255,0.02)",
                },
              }}
            />
          </CardContent>
        </GlassCard>

        <GlassCard>
          <CardContent>
            <Typography sx={{ fontSize: 18, fontWeight: 800, mb: 2 }}>
              Support Required
            </Typography>

            <TextField
              fullWidth
              multiline
              minRows={4}
              value={form.supportNeeded}
              onChange={(e) => handleChange("supportNeeded", e.target.value)}
              placeholder="Indicate decisions, escalations, or support required from Strategy Office or CEO."
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: white,
                  bgcolor: "rgba(255,255,255,0.02)",
                },
              }}
            />

            <Box className="mt-4 flex flex-wrap items-center gap-2">
              <Button variant="outlined" sx={{ textTransform: "none" }}>
                Save Draft
              </Button>
              <Button variant="contained" sx={{ textTransform: "none" }}>
                Submit Division Commentary
              </Button>
            </Box>
          </CardContent>
        </GlassCard>
      </Stack>
    </WorkspaceLayout>
  );
};

export default DivisionCommentaryPage;