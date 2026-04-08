import React from "react";
import { Box, Typography } from "@mui/material";
import { softText, white } from "../../theme/dashboardTokens";

const PageHeader = ({ title, subtitle, actions }) => {
  return (
    <Box className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between" sx={{ flex: 1 }}>
      <Box>
        <Typography sx={{ fontSize: 28, fontWeight: 900, color: white }}>
          {title}
        </Typography>
        {subtitle ? (
          <Typography sx={{ color: softText, mt: 0.75 }}>
            {subtitle}
          </Typography>
        ) : null}
      </Box>

      {actions ? <Box>{actions}</Box> : null}
    </Box>
  );
};

export default PageHeader;