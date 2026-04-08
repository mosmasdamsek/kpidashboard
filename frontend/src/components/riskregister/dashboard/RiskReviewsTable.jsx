import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const RiskReviewsTable = ({ rows }) => {
  const navigate = useNavigate();

  return (
    <Paper sx={{ p: 2.5, borderRadius: 4 }}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        Risk Reviews
      </Typography>

      {rows.length === 0 ? (
        <Typography color="text.secondary">No reviews found.</Typography>
      ) : (
        <Box sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Risk</strong></TableCell>
                <TableCell><strong>Review Date</strong></TableCell>
                <TableCell><strong>Reviewer</strong></TableCell>
                <TableCell><strong>Department</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>Comments</strong></TableCell>
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
                  <TableCell>{row.review_date}</TableCell>
                  <TableCell>{row.reviewer}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.comments}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Paper>
  );
};

export default RiskReviewsTable;