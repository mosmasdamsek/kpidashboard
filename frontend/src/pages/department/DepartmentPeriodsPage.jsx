import React from "react";
import { Stack } from "@mui/material";
import WorkspaceLayout from "../../layouts/WorkspaceLayout";
import SubmissionSummaryCard from "../../features/reporting/components/SubmissionSummaryCard";

const periods = [
  { id: "2026-q1", name: "Q1 2026", dueDate: "31 Mar 2026", status: "draft" },
  { id: "2025-q4", name: "Q4 2025", dueDate: "31 Dec 2025", status: "locked" },
];

const DepartmentPeriodsPage = () => {
  return (
    <WorkspaceLayout
      role="department"
      title="My Reporting Periods"
      subtitle="Select a reporting period to capture or review departmental KPI inputs."
    >
      <Stack spacing={2}>
        {periods.map((period) => (
          <SubmissionSummaryCard
            key={period.id}
            title={period.name}
            subtitle="Finance Operations Department"
            status={period.status}
            primaryActionLabel="Open"
            primaryActionTo={`/department/entry/${period.id}`}
            meta={[
              { label: "Due Date", value: period.dueDate },
              { label: "Department", value: "Finance Operations" },
              { label: "Division", value: "Finance" },
              { label: "Reporting Type", value: "Quarterly" },
            ]}
          />
        ))}
      </Stack>
    </WorkspaceLayout>
  );
};

export default DepartmentPeriodsPage;