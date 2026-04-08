import React from "react";
import { Stack } from "@mui/material";
import WorkspaceLayout from "../../layouts/WorkspaceLayout";
import SubmissionSummaryCard from "../../features/reporting/components/SubmissionSummaryCard";

const submissionHistory = [
  {
    id: "2025-q4",
    period: "Q4 2025",
    status: "approved",
    submittedAt: "31 Dec 2025 16:30",
    reviewer: "M. Dube",
  },
  {
    id: "2025-q3",
    period: "Q3 2025",
    status: "approved",
    submittedAt: "30 Sep 2025 14:10",
    reviewer: "M. Dube",
  },
  {
    id: "2025-q2",
    period: "Q2 2025",
    status: "returned",
    submittedAt: "30 Jun 2025 11:45",
    reviewer: "M. Dube",
  },
];

const DepartmentHistoryPage = () => {
  return (
    <WorkspaceLayout
      role="department"
      title="Submission History"
      subtitle="Review previously submitted departmental reporting periods."
    >
      <Stack spacing={2}>
        {submissionHistory.map((item) => (
          <SubmissionSummaryCard
            key={item.id}
            title={item.period}
            subtitle="Finance Operations Department"
            status={item.status}
            primaryActionLabel="View"
            primaryActionTo={`/department/entry/${item.id}`}
            meta={[
              { label: "Submitted At", value: item.submittedAt },
              { label: "Reviewer", value: item.reviewer },
              { label: "Department", value: "Finance Operations" },
              { label: "Division", value: "Finance" },
            ]}
          />
        ))}
      </Stack>
    </WorkspaceLayout>
  );
};

export default DepartmentHistoryPage;