export const departmentSubmissionMock = {
  submission: {
    id: "dep-sub-001",
    periodId: "2026-q1",
    periodName: "Q1 2026",
    departmentId: "finance-operations",
    departmentName: "Finance Operations",
    divisionName: "Finance",
    status: "draft",
    dueDate: "31 Mar 2026",
    submittedBy: null,
    submittedAt: null,
  },

  kpis: [
    {
      id: 1,
      kpi: "Revenue",
      unit: "BWP",
      target: 8000000,
      actual: "",
      direction: "up",
      comment: "",
    },
    {
      id: 2,
      kpi: "Operational Cost",
      unit: "BWP",
      target: 2400000,
      actual: "",
      direction: "down",
      comment: "",
    },
    {
      id: 3,
      kpi: "Customer Satisfaction",
      unit: "%",
      target: 90,
      actual: "",
      direction: "up",
      comment: "",
    },
  ],

  narrative: {
    summary: "",
  },
};