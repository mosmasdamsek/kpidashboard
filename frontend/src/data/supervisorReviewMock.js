export const supervisorReviewMock = {
  submission: {
    id: "sub-001",
    periodId: "2026-q1",
    periodName: "Q1 2026",
    departmentId: "finance-operations",
    departmentName: "Finance Operations",
    divisionName: "Finance",
    submittedBy: "K. Molefe",
    submittedAt: "2026-03-18 14:20",
    status: "submitted",
  },

  kpis: [
    {
      id: 1,
      kpi: "Revenue",
      unit: "BWP",
      target: 8000000,
      actual: 7450000,
      direction: "up",
      comment:
        "Collections improved late in the period, but one major client payment slipped.",
    },
    {
      id: 2,
      kpi: "Operational Cost",
      unit: "BWP",
      target: 2400000,
      actual: 2515000,
      direction: "down",
      comment: "Travel and emergency procurement drove overspend.",
    },
    {
      id: 3,
      kpi: "Customer Satisfaction",
      unit: "%",
      target: 90,
      actual: 92,
      direction: "up",
      comment: "Service response times improved after shift changes.",
    },
  ],

  review: {
    reviewerName: "M. Dube",
    reviewComment: "",
  },
};