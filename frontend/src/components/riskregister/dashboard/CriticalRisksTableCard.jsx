import React from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useGetCriticalRisksQuery } from "../../../services/riskregister/riskRegisterApi";
import { USE_MOCK } from "../../../config/appConfig";

const CriticalRisksTableCard = ({ filters, mockData }) => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetCriticalRisksQuery(filters, {
    skip: USE_MOCK,
  });

  const rows = USE_MOCK ? mockData : data?.results || [];

  return (
    <Paper sx={{ p: 3, borderRadius: 4 }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Critical Risks
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Highest-priority risks requiring close oversight
          </Typography>
        </Box>

        {isLoading ? (
          <Box sx={{ py: 6, display: "grid", placeItems: "center" }}>
            <CircularProgress size={28} />
          </Box>
        ) : rows.length === 0 ? (
          <Typography color="text.secondary">No critical risks found.</Typography>
        ) : (
          <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Risk No.</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell><strong>Category</strong></TableCell>
                  <TableCell><strong>Owner</strong></TableCell>
                  <TableCell><strong>Rating</strong></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(`/risk-register/items/${row.id}`)}
                  >
                    <TableCell>{row.risk_number}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.owner}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.rating || "Critical"}
                        size="small"
                        color="error"
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}

        {isError ? (
          <Typography variant="caption" color="warning.main">
            Could not load live data yet. Showing sample critical risks.
          </Typography>
        ) : null}
      </Stack>
    </Paper>
  );
};

export default CriticalRisksTableCard;