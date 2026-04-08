import React from "react";
import { Box, Typography } from "@mui/material";
import { softText, white } from "../../../theme/dashboardTokens";

const SubmissionMetaRow = ({ label, value }) => {
  return (
    <Box>
      <Typography sx={{ fontSize: 12, color: softText }}>{label}</Typography>
      <Typography sx={{ fontWeight: 800, color: white }}>{value}</Typography>
    </Box>
  );
};

export default SubmissionMetaRow;