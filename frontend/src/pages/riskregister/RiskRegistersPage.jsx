import React, { useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useGetRiskRegistersQuery } from "../../services/riskregister/riskRegisterApi";

const getOwnerName = (owner) =>
  owner?.full_name || owner?.name || owner?.username || owner?.email || "-";

const RiskRegistersPage = () => {
  const {
    data: registers = [],
    isLoading,
    isError,
    error,
  } = useGetRiskRegistersQuery();

  const rows = useMemo(
    () =>
      (registers || []).map((register) => ({
        id: register.id,
        department:
          register.Department?.name || register.department?.name || "-",
        reporting_period: register.reporting_period?.name || "-",
        financial_year: register.reporting_period?.financial_year || "-",
        quarter: register.reporting_period?.quarter || "-",
        owner: getOwnerName(register.owner),
        workflow_status: register.workflow_status || "-",
        is_active: register.is_active ? "Active" : "Inactive",
        notes: register.notes || "",
        risk_count: register.risk_count ?? 0,
        critical_risks: register.critical_risks ?? 0,
        overdue_actions: register.overdue_actions ?? 0,
        created_at: register.created_at || "-",
        updated_at: register.updated_at || "-",
      })),
    [registers]
  );

  if (isLoading) {
    return (
      <Box p={3}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Risk Registers
        </Typography>
        <Typography color="text.secondary">Loading risk registers...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={3}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Risk Registers
        </Typography>
        <Typography color="error">
          Failed to load risk registers.
        </Typography>
        <Typography color="text.secondary" variant="body2" mt={1}>
          {error?.status ? `Status: ${error.status}` : "Check API route and serializer output."}
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Risk Registers
      </Typography>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Total Registers
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {rows.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Active Registers
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {rows.filter((r) => r.is_active === "Active").length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Critical Risks
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {rows.reduce((sum, row) => sum + (row.critical_risks || 0), 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Overdue Actions
              </Typography>
              <Typography variant="h4" fontWeight={700}>
                {rows.reduce((sum, row) => sum + (row.overdue_actions || 0), 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Department</strong></TableCell>
                  <TableCell><strong>Reporting Period</strong></TableCell>
                  <TableCell><strong>Financial Year</strong></TableCell>
                  <TableCell><strong>Quarter</strong></TableCell>
                  <TableCell><strong>Owner</strong></TableCell>
                  <TableCell><strong>Workflow</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell align="right"><strong>Risks</strong></TableCell>
                  <TableCell align="right"><strong>Critical</strong></TableCell>
                  <TableCell align="right"><strong>Overdue Actions</strong></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.department}</TableCell>
                    <TableCell>{row.reporting_period}</TableCell>
                    <TableCell>{row.financial_year}</TableCell>
                    <TableCell>{row.quarter}</TableCell>
                    <TableCell>{row.owner}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={row.workflow_status}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={row.is_active}
                        color={row.is_active === "Active" ? "success" : "default"}
                        variant={row.is_active === "Active" ? "filled" : "outlined"}
                      />
                    </TableCell>
                    <TableCell align="right">{row.risk_count}</TableCell>
                    <TableCell align="right">{row.critical_risks}</TableCell>
                    <TableCell align="right">{row.overdue_actions}</TableCell>
                  </TableRow>
                ))}

                {!rows.length && (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      No risk registers found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RiskRegistersPage;