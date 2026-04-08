import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const ratingColor = (rating) => {
  if (rating === "Critical") return "error";
  if (rating === "Maximum") return "warning";
  if (rating === "High") return "warning";
  if (rating === "Medium") return "info";
  if (rating === "Low") return "success";
  return "default";
};

const statusLabel = (status) => {
  if (!status) return "-";
  return String(status)
    .replaceAll("_", " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
};

const RiskItemsTable = ({ rows }) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Risk No.</strong></TableCell>
            <TableCell><strong>Description</strong></TableCell>
            <TableCell><strong>Category</strong></TableCell>
            <TableCell><strong>Department</strong></TableCell>
            <TableCell><strong>Owner</strong></TableCell>
            <TableCell><strong>Rating</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Period</strong></TableCell>
            <TableCell><strong>Due Date</strong></TableCell>
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
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.owner}</TableCell>
              <TableCell>
                <Chip
                  size="small"
                  label={row.rating}
                  color={ratingColor(row.rating)}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{statusLabel(row.status)}</TableCell>
              <TableCell>{row.reporting_period}</TableCell>
              <TableCell>{row.due_date}</TableCell>
            </TableRow>
          ))}

          {!rows.length && (
            <TableRow>
              <TableCell colSpan={9} align="center">
                No risk items found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RiskItemsTable;