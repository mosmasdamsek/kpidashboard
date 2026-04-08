import React from "react";
import { Box, Button, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GlassCard from "../../../components/common/GlassCard";
import StatusChip from "../../../components/common/StatusChip";
import SubmissionMetaRow from "./SubmissionMetaRow";
import { softText, white } from "../../../theme/dashboardTokens";

const SubmissionSummaryCard = ({
  title,
  subtitle,
  meta = [],
  status,
  primaryActionLabel,
  primaryActionTo,
  secondaryActionLabel,
  secondaryActionTo,
  footerText,
}) => {
  return (
    <GlassCard>
      <CardContent>
        <Box className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <Box className="flex-1">
            <Typography sx={{ fontSize: 18, fontWeight: 800, color: white }}>
              {title}
            </Typography>

            {subtitle ? (
              <Typography sx={{ color: softText, mt: 0.5 }}>{subtitle}</Typography>
            ) : null}

            {meta.length ? (
              <Box className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
                {meta.map((item) => (
                  <SubmissionMetaRow
                    key={`${item.label}-${item.value}`}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </Box>
            ) : null}

            {footerText ? (
              <Typography sx={{ color: softText, mt: 3, fontSize: 12.5 }}>
                {footerText}
              </Typography>
            ) : null}
          </Box>

          <Box className="flex flex-wrap items-center gap-2">
            {status ? <StatusChip status={status} /> : null}

            {secondaryActionLabel && secondaryActionTo ? (
              <Button
                component={Link}
                to={secondaryActionTo}
                variant="outlined"
                sx={{ textTransform: "none", fontWeight: 700 }}
              >
                {secondaryActionLabel}
              </Button>
            ) : null}

            {primaryActionLabel && primaryActionTo ? (
              <Button
                component={Link}
                to={primaryActionTo}
                variant="contained"
                sx={{ textTransform: "none", fontWeight: 700 }}
              >
                {primaryActionLabel}
              </Button>
            ) : null}
          </Box>
        </Box>
      </CardContent>
    </GlassCard>
  );
};

export default SubmissionSummaryCard;