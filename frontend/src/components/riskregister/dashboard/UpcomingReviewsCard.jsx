import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const UpcomingReviewsCard = () => {
  return (
    <Paper sx={{ p: 3, borderRadius: 4 }}>
      <Typography variant="h6" fontWeight={700}>
        Upcoming Reviews
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography color="text.secondary">Coming next.</Typography>
      </Box>
    </Paper>
  );
};

export default UpcomingReviewsCard;