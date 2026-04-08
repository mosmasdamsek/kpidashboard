export const navigationByRole = {
  department: [
    { label: "My Periods", path: "/department/periods" },
    { label: "KPI Entry", path: "/department/entry/current" },
    { label: "History", path: "/department/history" },
    { label: "Risk Register", path: "/risk-register/dashboard"},
  ],
  supervisor: [
    { label: "Review Queue", path: "/supervisor/queue" },
    { label: "Review Submission", path: "/supervisor/review/demo-submission" },
    { label: "Risk Register", path: "/risk-register/dashboard"},
  ],
  division: [
    { label: "Overview", path: "/division/overview/current" },
    { label: "Commentary", path: "/division/commentary/current" },
    { label: "Preview", path: "/division/preview/current" },
    { label: "Risk Register", path: "/risk-register/dashboard"},
  ],
  strategy: [
    { label: "Periods", path: "/strategy/periods" },
    { label: "Templates", path: "/strategy/templates" },
    { label: "Targets", path: "/strategy/targets" },
    { label: "Tracker", path: "/strategy/tracker" },
    { label: "Publish", path: "/strategy/publish" },
  ],
  ceo: [{ label: "Dashboard", path: "/ceo/dashboard" }],
};

export const roleDisplayNames = {
  department: "Department Workspace",
  supervisor: "Supervisor Workspace",
  division: "Division Workspace",
  strategy: "Strategy Office",
  ceo: "CEO Workspace",
};