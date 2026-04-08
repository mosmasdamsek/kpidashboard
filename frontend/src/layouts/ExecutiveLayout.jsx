import React from "react";
import { Box } from "@mui/material";
import { bg } from "../theme/dashboardTokens";

const ExecutiveLayout = ({ children }) => {
  return <Box sx={{ minHeight: "100vh", bgcolor: bg }}>{children}</Box>;
};

export default ExecutiveLayout;