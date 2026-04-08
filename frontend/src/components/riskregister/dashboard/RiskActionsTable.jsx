import React from "react";
import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const statusColorMap = {
  Overdue: "warning",
  "In Progress": "info",
  Completed: "success",
};

const RiskActionsTable = ({ rows }) => {
  const navigate = useNavigate();

  return (
    <Paper sx={{ p: 2.5, borderRadius: 4 }}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        Mitigation Actions
      </Typography>

      {rows.length === 0 ? (
        <Typography color="text.secondary">No actions found.</Typography>
      ) : (
        <Box sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Risk</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
                <TableCell><strong>Owner</strong></TableCell>
                <TableCell><strong>Department</strong></TableCell>
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
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.due_date}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      size="small"
                      color={statusColorMap[row.status] || "default"}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Paper>
  );
};

export default RiskActionsTable;