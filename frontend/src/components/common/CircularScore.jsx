import React from "react";
import { Box, Typography } from "@mui/material";
import { panel2, line, softText } from "../../theme/dashboardTokens";

const CircularScore = ({ value, color }) => {
  const deg = Math.round((value / 100) * 360);

  return (
    <Box
      sx={{
        width: 88,
        height: 88,
        borderRadius: "50%",
        background: `conic-gradient(${color} ${deg}deg, rgba(255,255,255,0.08) ${deg}deg)`,
        p: "5px",
        boxShadow: `0 0 30px ${color}33`,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          bgcolor: panel2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          border: `1px solid ${line}`,
        }}
      >
        <Typography sx={{ fontSize: 24, lineHeight: 1, fontWeight: 900 }}>
          {value}
        </Typography>
        <Typography sx={{ fontSize: 10.5, color: softText }}>score</Typography>
      </Box>
    </Box>
  );
};

export default CircularScore;