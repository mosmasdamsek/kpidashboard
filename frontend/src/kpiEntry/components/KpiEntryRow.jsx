import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { line, panel2, softText, white } from "../../theme/dashboardTokens";
import KpiCalculationBadge from "./KpiCalculationBadge";

const KpiEntryRow = ({ row, onChange }) => {
  return (
    <Box
      sx={{
        p: 2,
        border: `1px solid ${line}`,
        borderRadius: 3,
        bgcolor: panel2,
      }}
    >
      <Box className="grid grid-cols-1 gap-3 xl:grid-cols-[1.4fr_0.6fr_0.8fr_0.8fr_0.8fr_1fr]">
        <Box>
          <Typography sx={{ fontWeight: 800, color: white }}>{row.kpi}</Typography>
          <Typography sx={{ color: softText, fontSize: 12.5, mt: 0.5 }}>
            Unit: {row.unit} • Direction: {row.direction}
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: 12, color: softText, mb: 0.75 }}>
            Target
          </Typography>
          <Typography sx={{ fontWeight: 800, color: white }}>{row.target}</Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: 12, color: softText, mb: 0.75 }}>
            Actual
          </Typography>
          <TextField
            size="small"
            fullWidth
            value={row.actual}
            onChange={(e) => onChange(row.id, "actual", e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: white,
                bgcolor: "rgba(255,255,255,0.02)",
              },
            }}
          />
        </Box>

        <Box>
          <Typography sx={{ fontSize: 12, color: softText, mb: 0.75 }}>
            Variance
          </Typography>
          <Typography sx={{ fontWeight: 800, color: white }}>
            {row.variance === "" ? "-" : row.variance}
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: 12, color: softText, mb: 0.75 }}>
            Achievement %
          </Typography>
          <Typography sx={{ fontWeight: 800, color: white }}>
            {row.achievement === "" ? "-" : `${row.achievement.toFixed(1)}%`}
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: 12, color: softText, mb: 0.75 }}>
            Performance
          </Typography>
          <KpiCalculationBadge achievement={row.achievement} />
        </Box>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontSize: 12, color: softText, mb: 0.75 }}>
          Comment
        </Typography>
        <TextField
          size="small"
          fullWidth
          multiline
          minRows={2}
          value={row.comment}
          onChange={(e) => onChange(row.id, "comment", e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: white,
              bgcolor: "rgba(255,255,255,0.02)",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default KpiEntryRow;