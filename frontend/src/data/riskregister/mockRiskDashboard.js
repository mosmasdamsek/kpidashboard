const makeUser = (id, username, full_name, email) => ({
  id,
  username,
  full_name,
  email,
});

const makeTitle = (id, title) => ({
  id,
  title,
  name: title,
});

const makeObjective = (id, name) => ({
  id,
  name,
});

const makeGovBody = (id, name) => ({
  id,
  name,
});

const makeDepartment = (id, name) => ({
  id,
  name,
});

export const mockReportingPeriods = [
  {
    id: 1,
    name: "2026-2027 Q1",
    financial_year: "2026-2027",
    quarter: "Q1",
    start_date: "2026-04-01",
    end_date: "2026-06-30",
    is_active: true,
  },
  {
    id: 2,
    name: "2026-2027 Q2",
    financial_year: "2026-2027",
    quarter: "Q2",
    start_date: "2026-07-01",
    end_date: "2026-09-30",
    is_active: false,
  },
];

export const currentReportingPeriod = mockReportingPeriods.find((period) => period.is_active) || mockReportingPeriods[0];

export const mockRiskCategories = [
  {
    id: 1,
    name: "Operational",
    definition: "Risks arising from internal processes, systems, or people.",
  },
  {
    id: 2,
    name: "Financial",
    definition: "Risks affecting financial performance, controls, or revenue.",
  },
  {
    id: 3,
    name: "Compliance",
    definition: "Risks related to laws, regulations, and policy obligations.",
  },
  {
    id: 4,
    name: "Strategic",
    definition: "Risks affecting long-term direction and strategic objectives.",
  },
  {
    id: 5,
    name: "Technology",
    definition: "Risks arising from IT, cybersecurity, and digital platforms.",
  },
];

const departments = {
  operations: makeDepartment(1, "Operations"),
  finance: makeDepartment(2, "Finance"),
  commercial: makeDepartment(3, "Commercial"),
  hr: makeDepartment(4, "HR"),
  it: makeDepartment(5, "IT"),
};

const users = {
  strategy: makeUser(1, "strategy.user", "Strategy Office", "strategy@bofinet.co.bw"),
  ops: makeUser(2, "ops.user", "Operations Officer", "ops@bofinet.co.bw"),
  finance: makeUser(3, "finance.user", "Finance Officer", "finance@bofinet.co.bw"),
  hr: makeUser(4, "hr.user", "HR Officer", "hr@bofinet.co.bw"),
  it: makeUser(5, "it.user", "IT Officer", "it@bofinet.co.bw"),
  opsManager: makeUser(6, "ops.manager", "Operations Manager", "ops.manager@bofinet.co.bw"),
  financeManager: makeUser(7, "finance.manager", "Finance Manager", "finance.manager@bofinet.co.bw"),
  commercialManager: makeUser(8, "commercial.manager", "Commercial Manager", "commercial.manager@bofinet.co.bw"),
  hrManager: makeUser(9, "hr.manager", "HR Manager", "hr.manager@bofinet.co.bw"),
  itManager: makeUser(10, "it.manager", "IT Manager", "it.manager@bofinet.co.bw"),
  financeReportingLeadUser: makeUser(11, "fin.reporting", "Finance Reporting Lead", "fin.reporting@bofinet.co.bw"),
  securityLeadUser: makeUser(12, "security.lead", "Security Lead", "security.lead@bofinet.co.bw"),
};

const titles = {
  infrastructureLead: makeTitle(1, "Infrastructure Lead"),
  operationsSupervisor: makeTitle(2, "Operations Supervisor"),
  operationsManager: makeTitle(3, "Operations Manager"),
  billingLead: makeTitle(4, "Billing Lead"),
  financeManager: makeTitle(5, "Finance Manager"),
  financeReportingLead: makeTitle(6, "Finance Reporting Lead"),
  systemsAnalyst: makeTitle(7, "Systems Analyst"),
  commercialPlanningLead: makeTitle(8, "Commercial Planning Lead"),
  commercialManager: makeTitle(9, "Commercial Manager"),
  hrBusinessPartner: makeTitle(10, "HR Business Partner"),
  hrManager: makeTitle(11, "HR Manager"),
  securityLead: makeTitle(12, "Security Lead"),
  itManager: makeTitle(13, "IT Manager"),
};

const objectives = {
  networkResilience: makeObjective(1, "Network resilience"),
  serviceContinuity: makeObjective(2, "Service continuity"),
  revenueAssurance: makeObjective(3, "Revenue assurance"),
  regulatoryCompliance: makeObjective(4, "Regulatory compliance"),
  strategicExecution: makeObjective(5, "Strategic execution"),
  workforceCapability: makeObjective(6, "Workforce capability"),
  cyberResilience: makeObjective(7, "Cyber resilience"),
};

const govBodies = {
  exco: makeGovBody(1, "EXCO"),
  management: makeGovBody(2, "Management"),
};

export const mockRiskRegisters = [
  {
    id: 1,
    Department: departments.operations,
    reporting_period: currentReportingPeriod,
    owner: users.opsManager,
    workflow_status: "draft",
    is_active: true,
    notes: "Quarterly review ongoing.",
    created_at: "2026-04-01T08:00:00Z",
    updated_at: "2026-04-14T10:30:00Z",
    risks: [],
  },
  {
    id: 2,
    Department: departments.finance,
    reporting_period: currentReportingPeriod,
    owner: users.financeManager,
    workflow_status: "reviewed",
    is_active: true,
    notes: "Finance register under quarterly update.",
    created_at: "2026-04-01T09:00:00Z",
    updated_at: "2026-04-13T11:20:00Z",
    risks: [],
  },
  {
    id: 3,
    Department: departments.commercial,
    reporting_period: currentReportingPeriod,
    owner: users.commercialManager,
    workflow_status: "submitted",
    is_active: true,
    notes: "Commercial review submitted.",
    created_at: "2026-04-01T09:30:00Z",
    updated_at: "2026-04-12T15:00:00Z",
    risks: [],
  },
  {
    id: 4,
    Department: departments.hr,
    reporting_period: currentReportingPeriod,
    owner: users.hrManager,
    workflow_status: "draft",
    is_active: true,
    notes: "HR register updated with staffing risks.",
    created_at: "2026-04-02T08:30:00Z",
    updated_at: "2026-04-11T09:45:00Z",
    risks: [],
  },
  {
    id: 5,
    Department: departments.it,
    reporting_period: currentReportingPeriod,
    owner: users.itManager,
    workflow_status: "reviewed",
    is_active: true,
    notes: "IT register includes cybersecurity review items.",
    created_at: "2026-04-02T10:00:00Z",
    updated_at: "2026-04-14T14:00:00Z",
    risks: [],
  },
];

const categoryByName = Object.fromEntries(
  mockRiskCategories.map((category) => [category.name, category])
);

const registerById = Object.fromEntries(
  mockRiskRegisters.map((register) => [register.id, register])
);

const rawActionItems = [
  {
    id: 101,
    risk_id: 1,
    action_description: "Implement redundancy failover",
    owner_title: titles.infrastructureLead,
    owner_user: users.it,
    target_date: "2026-05-01",
    target_period: "",
    status: "in_progress",
    progress_notes: "Procurement completed, deployment pending",
    completed_at: null,
    created_by: users.strategy,
    created_at: "2026-04-02T08:00:00Z",
    updated_at: "2026-04-14T12:00:00Z",
  },
  {
    id: 102,
    risk_id: 1,
    action_description: "Run disaster recovery simulation",
    owner_title: titles.operationsSupervisor,
    owner_user: users.ops,
    target_date: "2026-05-20",
    target_period: "",
    status: "not_started",
    progress_notes: "Scenario design pending",
    completed_at: null,
    created_by: users.ops,
    created_at: "2026-04-03T08:00:00Z",
    updated_at: "2026-04-10T12:00:00Z",
  },
  {
    id: 201,
    risk_id: 3,
    action_description: "Audit billing pipeline",
    owner_title: titles.billingLead,
    owner_user: users.finance,
    target_date: "2026-04-20",
    target_period: "",
    status: "in_progress",
    progress_notes: "Initial findings identified unbilled events",
    completed_at: null,
    created_by: users.finance,
    created_at: "2026-04-02T09:30:00Z",
    updated_at: "2026-04-13T11:00:00Z",
  },
  {
    id: 202,
    risk_id: 3,
    action_description: "Automate reconciliation checks",
    owner_title: titles.systemsAnalyst,
    owner_user: users.it,
    target_date: "2026-05-25",
    target_period: "",
    status: "not_started",
    progress_notes: "Requirements being defined",
    completed_at: null,
    created_by: users.finance,
    created_at: "2026-04-04T10:00:00Z",
    updated_at: "2026-04-12T14:00:00Z",
  },
  {
    id: 301,
    risk_id: 4,
    action_description: "Map reporting data sources",
    owner_title: titles.financeReportingLead,
    owner_user: users.financeReportingLeadUser,
    target_date: "2026-04-18",
    target_period: "",
    status: "completed",
    progress_notes: "Completed and validated",
    completed_at: "2026-04-17T15:00:00Z",
    created_by: users.finance,
    created_at: "2026-04-02T11:00:00Z",
    updated_at: "2026-04-17T15:00:00Z",
  },
  {
    id: 401,
    risk_id: 7,
    action_description: "Patch exposed services",
    owner_title: titles.securityLead,
    owner_user: users.securityLeadUser,
    target_date: "2026-04-28",
    target_period: "",
    status: "in_progress",
    progress_notes: "Patching window approved and rollout underway",
    completed_at: null,
    created_by: users.it,
    created_at: "2026-04-03T09:00:00Z",
    updated_at: "2026-04-14T16:00:00Z",
  },
];

const rawReviewItems = [
  {
    id: 1001,
    risk_id: 1,
    reviewed_by: users.strategy,
    review_date: "2026-03-15",
    comments: "Risk remains critical until full failover is implemented.",
    updated_inherent_impact: 5,
    updated_inherent_likelihood: 5,
    updated_residual_impact: 4,
    updated_residual_likelihood: 4,
    next_review_date: "2026-04-15",
  },
  {
    id: 1002,
    risk_id: 1,
    reviewed_by: users.ops,
    review_date: "2026-02-12",
    comments: "Existing redundancy is insufficient for major outages.",
    updated_inherent_impact: 5,
    updated_inherent_likelihood: 5,
    updated_residual_impact: 4,
    updated_residual_likelihood: 4,
    next_review_date: "2026-03-15",
  },
  {
    id: 2001,
    risk_id: 3,
    reviewed_by: users.finance,
    review_date: "2026-03-10",
    comments: "Leakage exposure remains high pending automation.",
    updated_inherent_impact: 5,
    updated_inherent_likelihood: 4,
    updated_residual_impact: 4,
    updated_residual_likelihood: 4,
    next_review_date: "2026-04-10",
  },
  {
    id: 3001,
    risk_id: 4,
    reviewed_by: users.finance,
    review_date: "2026-03-08",
    comments: "Reporting workflow is improving but still partly manual.",
    updated_inherent_impact: 4,
    updated_inherent_likelihood: 3,
    updated_residual_impact: 3,
    updated_residual_likelihood: 3,
    next_review_date: "2026-04-08",
  },
  {
    id: 4001,
    risk_id: 7,
    reviewed_by: users.securityLeadUser,
    review_date: "2026-03-14",
    comments: "Exposure remains elevated until critical systems are fully patched.",
    updated_inherent_impact: 5,
    updated_inherent_likelihood: 4,
    updated_residual_impact: 4,
    updated_residual_likelihood: 4,
    next_review_date: "2026-04-14",
  },
];

const rawRiskItems = [
  {
    id: 1,
    register_id: 1,
    risk_number: "OP001",
    entry_type: "risk",
    category_name: "Operational",
    strategic_objective: objectives.networkResilience,
    description: "Network outage affecting backbone",
    contributing_factors: "Single points of failure in core network paths",
    consequences: "Service downtime, customer dissatisfaction, revenue loss",
    speed_of_onset: "rapid",
    inherent_impact: 5,
    inherent_likelihood: 5,
    existing_controls: "Basic redundancy in selected segments",
    control_effectiveness: 2,
    responsible: titles.infrastructureLead,
    responsible_user: users.it,
    residual_impact: 4,
    residual_likelihood: 4,
    response_strategy: "mitigate",
    escalation_level: govBodies.exco,
    risk_owner: titles.operationsManager,
    risk_owner_user: users.opsManager,
    due_date: "2026-05-15",
    due_period: "",
    risk_trend: "up",
    response_status: "overdue",
    notes: "Awaiting final deployment approval",
    last_review_date: "2026-03-15",
    next_review_date: "2026-04-15",
    created_by: users.strategy,
    updated_by: users.ops,
    created_at: "2026-04-01T08:30:00Z",
    updated_at: "2026-04-14T13:10:00Z",
  },
  {
    id: 2,
    register_id: 1,
    risk_number: "OP002",
    entry_type: "risk",
    category_name: "Operational",
    strategic_objective: objectives.serviceContinuity,
    description: "Service delivery interruption",
    contributing_factors: "Delayed response coordination across operations teams",
    consequences: "Prolonged service outages and customer complaints",
    speed_of_onset: "moderate",
    inherent_impact: 4,
    inherent_likelihood: 4,
    existing_controls: "Escalation procedures and shift monitoring",
    control_effectiveness: 2,
    responsible: titles.operationsSupervisor,
    responsible_user: users.ops,
    residual_impact: 3,
    residual_likelihood: 3,
    response_strategy: "mitigate",
    escalation_level: govBodies.management,
    risk_owner: titles.operationsManager,
    risk_owner_user: users.opsManager,
    due_date: "2026-05-30",
    due_period: "",
    risk_trend: "steady",
    response_status: "progress",
    notes: "",
    last_review_date: "2026-03-12",
    next_review_date: "2026-04-12",
    created_by: users.ops,
    updated_by: users.ops,
    created_at: "2026-04-01T09:00:00Z",
    updated_at: "2026-04-12T10:00:00Z",
  },
  {
    id: 3,
    register_id: 2,
    risk_number: "FI001",
    entry_type: "risk",
    category_name: "Financial",
    strategic_objective: objectives.revenueAssurance,
    description: "Revenue leakage in billing system",
    contributing_factors: "Billing reconciliation gaps and delayed exception handling",
    consequences: "Lost revenue, audit findings, weakened controls",
    speed_of_onset: "moderate",
    inherent_impact: 5,
    inherent_likelihood: 4,
    existing_controls: "Periodic reconciliation and manual review",
    control_effectiveness: 2,
    responsible: titles.billingLead,
    responsible_user: users.finance,
    residual_impact: 4,
    residual_likelihood: 4,
    response_strategy: "mitigate",
    escalation_level: govBodies.exco,
    risk_owner: titles.financeManager,
    risk_owner_user: users.financeManager,
    due_date: "2026-05-01",
    due_period: "",
    risk_trend: "up",
    response_status: "overdue",
    notes: "Leakage exposure still under investigation",
    last_review_date: "2026-03-10",
    next_review_date: "2026-04-10",
    created_by: users.finance,
    updated_by: users.finance,
    created_at: "2026-04-01T10:00:00Z",
    updated_at: "2026-04-13T11:00:00Z",
  },
  {
    id: 4,
    register_id: 2,
    risk_number: "FI002",
    entry_type: "risk",
    category_name: "Compliance",
    strategic_objective: objectives.regulatoryCompliance,
    description: "Regulatory reporting delays",
    contributing_factors: "Manual reporting cycles and fragmented source data",
    consequences: "Compliance breaches and reputational damage",
    speed_of_onset: "slow",
    inherent_impact: 4,
    inherent_likelihood: 3,
    existing_controls: "Checklist-based reporting reviews",
    control_effectiveness: 2,
    responsible: titles.financeReportingLead,
    responsible_user: users.financeReportingLeadUser,
    residual_impact: 3,
    residual_likelihood: 3,
    response_strategy: "mitigate",
    escalation_level: govBodies.management,
    risk_owner: titles.financeManager,
    risk_owner_user: users.financeManager,
    due_date: "2026-05-20",
    due_period: "",
    risk_trend: "steady",
    response_status: "progress",
    notes: "",
    last_review_date: "2026-03-08",
    next_review_date: "2026-04-08",
    created_by: users.finance,
    updated_by: users.finance,
    created_at: "2026-04-01T11:00:00Z",
    updated_at: "2026-04-11T12:00:00Z",
  },
  {
    id: 5,
    register_id: 3,
    risk_number: "CO001",
    entry_type: "risk",
    category_name: "Strategic",
    strategic_objective: objectives.strategicExecution,
    description: "Slow execution of strategic initiatives",
    contributing_factors: "Weak follow-through and dependency bottlenecks",
    consequences: "Delayed value realization and stakeholder frustration",
    speed_of_onset: "slow",
    inherent_impact: 3,
    inherent_likelihood: 3,
    existing_controls: "Monthly review meetings",
    control_effectiveness: 2,
    responsible: titles.commercialPlanningLead,
    responsible_user: users.commercialManager,
    residual_impact: 3,
    residual_likelihood: 2,
    response_strategy: "accept",
    escalation_level: govBodies.management,
    risk_owner: titles.commercialManager,
    risk_owner_user: users.commercialManager,
    due_date: "2026-06-10",
    due_period: "",
    risk_trend: "steady",
    response_status: "open",
    notes: "",
    last_review_date: "2026-03-05",
    next_review_date: "2026-04-05",
    created_by: users.commercialManager,
    updated_by: users.commercialManager,
    created_at: "2026-04-01T12:00:00Z",
    updated_at: "2026-04-10T15:00:00Z",
  },
  {
    id: 6,
    register_id: 4,
    risk_number: "HR001",
    entry_type: "risk",
    category_name: "Operational",
    strategic_objective: objectives.workforceCapability,
    description: "Skills gaps in key teams",
    contributing_factors: "Dependence on a few critical personnel and limited succession planning",
    consequences: "Reduced delivery capability and slower execution",
    speed_of_onset: "slow",
    inherent_impact: 3,
    inherent_likelihood: 2,
    existing_controls: "Training plan and manager supervision",
    control_effectiveness: 2,
    responsible: titles.hrBusinessPartner,
    responsible_user: users.hr,
    residual_impact: 2,
    residual_likelihood: 2,
    response_strategy: "mitigate",
    escalation_level: govBodies.management,
    risk_owner: titles.hrManager,
    risk_owner_user: users.hrManager,
    due_date: "2026-06-30",
    due_period: "",
    risk_trend: "steady",
    response_status: "open",
    notes: "",
    last_review_date: "2026-03-06",
    next_review_date: "2026-04-06",
    created_by: users.hr,
    updated_by: users.hr,
    created_at: "2026-04-02T09:00:00Z",
    updated_at: "2026-04-09T13:00:00Z",
  },
  {
    id: 7,
    register_id: 5,
    risk_number: "IT001",
    entry_type: "risk",
    category_name: "Technology",
    strategic_objective: objectives.cyberResilience,
    description: "Cybersecurity vulnerability exposure",
    contributing_factors: "Delayed patching and external exposure of critical services",
    consequences: "Security breach, downtime, data compromise",
    speed_of_onset: "instant",
    inherent_impact: 5,
    inherent_likelihood: 4,
    existing_controls: "Firewalling, access controls, endpoint tools",
    control_effectiveness: 2,
    responsible: titles.securityLead,
    responsible_user: users.securityLeadUser,
    residual_impact: 4,
    residual_likelihood: 4,
    response_strategy: "mitigate",
    escalation_level: govBodies.exco,
    risk_owner: titles.itManager,
    risk_owner_user: users.itManager,
    due_date: "2026-05-05",
    due_period: "",
    risk_trend: "up",
    response_status: "progress",
    notes: "External scanning still shows medium-risk exposures",
    last_review_date: "2026-03-14",
    next_review_date: "2026-04-14",
    created_by: users.it,
    updated_by: users.it,
    created_at: "2026-04-02T10:00:00Z",
    updated_at: "2026-04-14T16:00:00Z",
  },
];

export const mockRiskActionsByRiskId = rawActionItems.reduce((acc, item) => {
  if (!acc[item.risk_id]) acc[item.risk_id] = [];
  acc[item.risk_id].push(item);
  return acc;
}, {});

export const mockRiskReviewsByRiskId = rawReviewItems.reduce((acc, item) => {
  if (!acc[item.risk_id]) acc[item.risk_id] = [];
  acc[item.risk_id].push(item);
  return acc;
}, {});

export const mockRiskItems = rawRiskItems.map((risk) => ({
  ...risk,
  register: registerById[risk.register_id],
  category: categoryByName[risk.category_name],
  mitigation_actions: mockRiskActionsByRiskId[risk.id] || [],
  reviews: mockRiskReviewsByRiskId[risk.id] || [],
}));

mockRiskRegisters.forEach((register) => {
  register.risks = mockRiskItems.filter((risk) => risk.register_id === register.id);
});

const normalize = (value) => (value ?? "").toString().trim().toLowerCase();

const toDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const today = new Date("2026-04-02T00:00:00");

const getRiskScore = (risk) => {
  if (risk?.residual_impact && risk?.residual_likelihood) {
    return risk.residual_impact * risk.residual_likelihood;
  }
  return (risk?.inherent_impact || 0) * (risk?.inherent_likelihood || 0);
};

const getRiskRating = (risk) => {
  const score = getRiskScore(risk);
  if (!score) return "Not Rated";
  if (score >= 21) return "Critical";
  if (score >= 15) return "Maximum";
  if (score >= 10) return "High";
  if (score >= 4) return "Medium";
  return "Low";
};

const isRiskOpenIssue = (risk) =>
  (risk.entry_type === "issue" || risk.inherent_likelihood === 6) &&
  !["completed", "closed"].includes(normalize(risk.response_status));

const isUpcomingReview = (risk) => {
  const nextReview = toDate(risk?.next_review_date);
  if (!nextReview) return false;
  const diffDays = Math.ceil((nextReview - today) / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= 30;
};

const isActionOverdue = (action) => {
  if (normalize(action?.status) === "completed") return false;
  const targetDate = toDate(action?.target_date);
  if (!targetDate) return false;
  return targetDate < today;
};

export const mockActionItems = mockRiskItems.flatMap((risk) =>
  (risk.mitigation_actions || []).map((action) => ({
    ...action,
    risk: `${risk.risk_number} - ${risk.description}`,
    risk_number: risk.risk_number,
    department: risk.register?.Department?.name || risk.register?.department?.name || "-",
    category: risk.category?.name || "-",
    reporting_period: risk.register?.reporting_period?.name || "-",
    owner:
      action?.owner_user?.full_name ||
      action?.owner_user?.name ||
      action?.owner_user?.username ||
      action?.owner_user?.email ||
      action?.owner_title?.title ||
      action?.owner_title?.name ||
      "-",
    status: isActionOverdue(action)
      ? "Overdue"
      : normalize(action.status) === "in_progress"
      ? "In Progress"
      : normalize(action.status) === "not_started"
      ? "Not Started"
      : normalize(action.status) === "completed"
      ? "Completed"
      : normalize(action.status) === "deferred"
      ? "Deferred"
      : normalize(action.status) === "cancelled"
      ? "Cancelled"
      : action.status,
    action: action.action_description,
  }))
);

export const mockReviewItems = mockRiskItems.flatMap((risk) =>
  (risk.reviews || []).map((review) => ({
    ...review,
    risk: `${risk.risk_number} - ${risk.description}`,
    risk_number: risk.risk_number,
    reviewer:
      review?.reviewed_by?.full_name ||
      review?.reviewed_by?.name ||
      review?.reviewed_by?.username ||
      review?.reviewed_by?.email ||
      "-",
    department: risk.register?.Department?.name || risk.register?.department?.name || "-",
    category: risk.category?.name || "-",
    reporting_period: risk.register?.reporting_period?.name || "-",
  }))
);

export const mockCriticalRisks = mockRiskItems
  .filter((risk) => getRiskRating(risk) === "Critical")
  .map((risk) => ({
    id: risk.id,
    risk_number: risk.risk_number,
    description: risk.description,
    category: risk.category?.name || "-",
    owner: risk.risk_owner?.title || risk.risk_owner?.name || "-",
    rating: getRiskRating(risk),
  }));

export const mockOverdueActions = mockActionItems
  .filter((action) => action.status === "Overdue")
  .map((action) => ({
    id: action.id,
    risk: action.risk_number,
    action: action.action_description,
    owner: action.owner,
    due_date: action.target_date,
  }));

export const mockSummary = {
  total_risks: mockRiskItems.length,
  critical_risks: mockRiskItems.filter((risk) => getRiskRating(risk) === "Critical").length,
  high_risks: mockRiskItems.filter((risk) =>
    ["High", "Maximum"].includes(getRiskRating(risk))
  ).length,
  overdue_actions: mockActionItems.filter((action) => action.status === "Overdue").length,
  open_issues: mockRiskItems.filter((risk) => isRiskOpenIssue(risk)).length,
  upcoming_reviews: mockRiskItems.filter((risk) => isUpcomingReview(risk)).length,
};

export const mockByCategory = Object.entries(
  mockRiskItems.reduce((acc, risk) => {
    const key = risk.category?.name || "Uncategorized";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {})
).map(([name, value]) => ({ name, value }));

export const mockByDivision = Object.entries(
  mockRiskItems.reduce((acc, risk) => {
    const key = risk.register?.Department?.name || risk.register?.department?.name || "Unassigned";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {})
).map(([name, value]) => ({ name, value }));

export const mockTrend = Object.entries(
  mockRiskItems.reduce((acc, risk) => {
    const key = risk.register?.reporting_period?.name || "Unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {})
).map(([period, value]) => ({ period, value }));

export const mockHeatmap = Object.entries(
  mockRiskItems.reduce((acc, risk) => {
    const likelihood = risk.residual_likelihood || risk.inherent_likelihood || 0;
    const impact = risk.residual_impact || risk.inherent_impact || 0;
    const key = `${likelihood}-${impact}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {})
).map(([key, count]) => {
  const [likelihood, impact] = key.split("-").map(Number);
  return { likelihood, impact, count };
});