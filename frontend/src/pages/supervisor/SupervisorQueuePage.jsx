import React from "react";
import { Stack } from "@mui/material";
import WorkspaceLayout from "../../layouts/WorkspaceLayout";
import SubmissionSummaryCard from "../../features/reporting/components/SubmissionSummaryCard";

const queueItems = [
  {
    id: "sub-001",
    department: "Finance Operations",
    division: "Finance",
    period: "Q1 2026",
    submittedBy: "K. Molefe",
    submittedAt: "2026-03-18 14:20",
    status: "submitted",
  },
  {
    id: "sub-002",
    department: "Revenue Assurance",
    division: "Finance",
    period: "Q1 2026",
    submittedBy: "T. Dube",
    submittedAt: "2026-03-18 09:10",
    status: "returned",
  },
  {
    id: "sub-003",
    department: "Procurement",
    division: "Operations",
    period: "Q1 2026",
    submittedBy: "L. Moyo",
    submittedAt: "2026-03-17 16:42",
    status: "approved",
  },
];

const SupervisorQueuePage = () => {
  return (
    <WorkspaceLayout
      role="supervisor"
      title="Review Queue"
      subtitle="Review departmental submissions before approval or return."
    >
      <Stack spacing={2}>
        {queueItems.map((item) => (
          <SubmissionSummaryCard
            key={item.id}
            title={item.department}
            subtitle={`${item.division} Division`}
            status={item.status}
            primaryActionLabel="Review"
            primaryActionTo={`/supervisor/review/${item.id}`}
            meta={[
              { label: "Period", value: item.period },
              { label: "Submitted By", value: item.submittedBy },
              { label: "Submitted At", value: item.submittedAt },
              { label: "Division", value: item.division },
            ]}
          />
        ))}
      </Stack>
    </WorkspaceLayout>
  );
};

export default SupervisorQueuePage;