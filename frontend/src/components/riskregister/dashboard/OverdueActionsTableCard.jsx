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

import { useGetOverdueActionsQuery } from "../../../services/riskregister/riskRegisterApi";
import { USE_MOCK } from "../../../config/appConfig";

const OverdueActionsTableCard = ({ filters, mockData }) => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetOverdueActionsQuery(filters, {
    skip: USE_MOCK,
  });

  const rows = USE_MOCK ? mockData : data?.results || [];

  return (
    <Paper sx={{ p: 3, borderRadius: 4 }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h6" fontWeight={700}>
            Overdue Actions
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mitigation actions that have passed their target dates
          </Typography>
        </Box>

        {isLoading ? (
          <Box sx={{ py: 6, display: "grid", placeItems: "center" }}>
            <CircularProgress size={28} />
          </Box>
        ) : rows.length === 0 ? (
          <Typography color="text.secondary">No overdue actions found.</Typography>
        ) : (
          <Box sx={{ overflowX: "auto" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Risk</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                  <TableCell><strong>Owner</strong></TableCell>
                  <TableCell><strong>Due Date</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(`/risk-register/items/${row.risk_id}`)}
                  >
                    <TableCell>{row.risk}</TableCell>
                    <TableCell>{row.action}</TableCell>
                    <TableCell>{row.owner}</TableCell>
                    <TableCell>{row.due_date}</TableCell>
                    <TableCell>
                      <Chip
                        label="Overdue"
                        size="small"
                        variant="outlined"
                        sx={{
                          color: "#f97316",
                          borderColor: "#f97316",
                          fontWeight: 600,
                        }}
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
            Could not load live data yet. Showing sample overdue actions.
          </Typography>
        ) : null}
      </Stack>
    </Paper>
  );
};

export default OverdueActionsTableCard;