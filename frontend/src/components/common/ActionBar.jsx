import React from "react";
import { Box } from "@mui/material";

const ActionBar = ({ children }) => {
  return (
    <Box className="flex flex-wrap items-center gap-2">
      {children}
    </Box>
  );
};

export default ActionBar;