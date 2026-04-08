import React from "react";
import { Card } from "@mui/material";
import { panel, line, white } from "../../theme/dashboardTokens";

const GlassCard = ({ children, sx = {}, className = "", ...props }) => {
  return (
    <Card
      elevation={0}
      className={className}
      {...props}
      sx={{
        bgcolor: panel,
        border: `1px solid ${line}`,
        borderRadius: 5,
        boxShadow: "0 20px 50px rgba(0,0,0,0.22)",
        color: white,
        ...sx,
      }}
    >
      {children}
    </Card>
  );
};

export default GlassCard;