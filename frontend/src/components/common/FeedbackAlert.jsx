import React from "react";
import { Alert } from "@mui/material";

const FeedbackAlert = ({ severity = "info", children }) => {
  return (
    <Alert
      severity={severity}
      sx={{
        borderRadius: 3,
        "& .MuiAlert-message": {
          fontWeight: 600,
        },
      }}
    >
      {children}
    </Alert>
  );
};

export default FeedbackAlert;