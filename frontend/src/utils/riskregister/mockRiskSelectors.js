const ALL = "all";
const CURRENT = "current";

const normalize = (value) => (value ?? "").toString().trim().toLowerCase();

const safeIncludes = (value, search) =>
  normalize(value).includes(normalize(search));

const isNil = (value) => value === null || value === undefined || value === "";

const toDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const formatStatus = (value) => {
  const map = {
    open: "Open",
    progress: "In Progress",
    overdue: "Overdue",
    completed: "Completed",
    closed: "Closed",
    not_started: "Not Started",
    in_progress: "In Progress",
    deferred: "Deferred",
    cancelled: "Cancelled",
    risk: "Risk",
    issue: "Issue",
    up: "Upward",
    down: "Downward",
    steady: "Stable",
  };

  return map[value] || value || "-";
};

const getReportingPeriodName = (item) =>
  item?.register?.reporting_period?.name || item?.reporting_period?.name || item?.reporting_period || "";

const getReportingPeriodId = (item) =>
  item?.register?.reporting_period?.id || item?.reporting_period?.id || null;

const getDepartmentName = (item) =>
  item?.register?.Department?.name ||
  item?.register?.department?.name ||
  item?.department?.name ||
  item?.department ||
  "Unassigned";

const getCategoryName = (item) =>
  item?.category?.name || item?.category || "Uncategorized";

const getRegisterOwnerName = (item) => {
  const owner = item?.register?.owner;
  if (!owner) return "Unassigned";
  return owner.full_name || owner.name || owner.username || owner.email || "Unassigned";
};

const getRiskOwnerName = (item) =>
  item?.risk_owner?.name ||
  item?.risk_owner?.title ||
  item?.risk_owner?.position_name ||
  item?.risk_owner?.job_title ||
  item?.risk_owner_user?.full_name ||
  item?.risk_owner_user?.name ||
  item?.risk_owner_user?.username ||
  item?.risk_owner_user?.email ||
  item?.owner ||
  "Unassigned";

const getResponsibleName = (item) =>
  item?.responsible?.name ||
  item?.responsible?.title ||
  item?.responsible?.position_name ||
  item?.responsible?.job_title ||
  item?.responsible_user?.full_name ||
  item?.responsible_user?.name ||
  item?.responsible_user?.username ||
  item?.responsible_user?.email ||
  "Unassigned";

const getActionOwnerName = (action) =>
  action?.owner ||
  action?.owner_user?.full_name ||
  action?.owner_user?.name ||
  action?.owner_user?.username ||
  action?.owner_user?.email ||
  action?.owner_title?.name ||
  action?.owner_title?.title ||
  action?.owner_title?.position_name ||
  "Unassigned";

const getInherentScore = (risk) => {
  if (isNil(risk?.inherent_impact) || isNil(risk?.inherent_likelihood)) return null;
  return Number(risk.inherent_impact) * Number(risk.inherent_likelihood);
};

const getResidualScore = (risk) => {
  if (isNil(risk?.residual_impact) || isNil(risk?.residual_likelihood)) return null;
  return Number(risk.residual_impact) * Number(risk.residual_likelihood);
};

const getCurrentScore = (risk) => getResidualScore(risk) || getInherentScore(risk) || 0;

const getRiskRating = (risk) => {
  const score = getCurrentScore(risk);

  if (!score) return "Not Rated";
  if (score >= 21) return "Critical";
  if (score >= 15) return "Maximum";
  if (score >= 10) return "High";
  if (score >= 4) return "Medium";
  return "Low";
};

const isIssue = (risk) =>
  risk?.entry_type === "issue" || Number(risk?.inherent_likelihood) === 6;

const isClosedRisk = (risk) =>
  ["completed", "closed"].includes(normalize(risk?.response_status));

const isRiskOverdue = (risk) => {
  if (isClosedRisk(risk)) return false;
  const due = toDate(risk?.due_date);
  if (!due) return false;
  return due < today();
};

const isActionOverdue = (action) => {
  if (normalize(action?.status) === "completed") return false;
  const due = toDate(action?.target_date || action?.due_date);
  if (!due) return false;
  return due < today();
};

const matchesPeriod = (item, filterValue, currentPeriodName = null, currentPeriodId = null) => {
  if (!filterValue || filterValue === ALL) return true;

  const itemPeriodName = getReportingPeriodName(item);
  const itemPeriodId = getReportingPeriodId(item);

  if (filterValue === CURRENT) {
    if (currentPeriodId && itemPeriodId) {
      return String(itemPeriodId) === String(currentPeriodId);
    }
    if (currentPeriodName) {
      return itemPeriodName === currentPeriodName;
    }
    return false;
  }

  return (
    String(itemPeriodId) === String(filterValue) ||
    itemPeriodName === filterValue
  );
};

const matchesFilter = (value, filterValue) => {
  if (!filterValue || filterValue === ALL || filterValue === CURRENT) return true;
  return value === filterValue;
};

export const filterRiskItems = (items, filters = {}, currentReportingPeriod = null) => {
  const currentPeriodName = currentReportingPeriod?.name || null;
  const currentPeriodId = currentReportingPeriod?.id || null;

  return items.filter((item) => {
    return (
      matchesPeriod(item, filters.reporting_period, currentPeriodName, currentPeriodId) &&
      matchesFilter(getDepartmentName(item), filters.department) &&
      matchesFilter(getCategoryName(item), filters.category) &&
      matchesFilter(getRiskOwnerName(item), filters.owner)
    );
  });
};

export const filterActionItems = (items, filters = {}, currentReportingPeriod = null) => {
  const currentPeriodName = currentReportingPeriod?.name || null;
  const currentPeriodId = currentReportingPeriod?.id || null;

  return items.filter((item) => {
    return (
      matchesPeriod(item, filters.reporting_period, currentPeriodName, currentPeriodId) &&
      matchesFilter(item.department, filters.department) &&
      matchesFilter(item.category, filters.category) &&
      matchesFilter(item.owner, filters.owner)
    );
  });
};

export const buildSummaryFromRisks = (risks = [], actions = []) => ({
  total_risks: risks.length,
  critical_risks: risks.filter((r) => getRiskRating(r) === "Critical").length,
  high_risks: risks.filter((r) => ["High", "Maximum"].includes(getRiskRating(r))).length,
  overdue_actions: actions.filter((a) => a.status === "Overdue").length,
  open_issues: risks.filter((r) => isIssue(r) && !isClosedRisk(r)).length,
  upcoming_reviews: risks.filter((r) => {
    const nextReview = toDate(r?.next_review_date);
    if (!nextReview) return false;
    const diff = Math.ceil((nextReview - today()) / (1000 * 60 * 60 * 24));
    return diff >= 0 && diff <= 30;
  }).length,
});

export const buildCategoryChart = (risks = []) => {
  const grouped = risks.reduce((acc, item) => {
    const key = getCategoryName(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(grouped).map(([name, value]) => ({ name, value }));
};

export const buildDivisionChart = (risks = []) => {
  const grouped = risks.reduce((acc, item) => {
    const key = getDepartmentName(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(grouped).map(([name, value]) => ({ name, value }));
};

export const buildTrendChart = (risks = []) => {
  const grouped = risks.reduce((acc, item) => {
    const key = getReportingPeriodName(item) || "Unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(grouped).map(([period, value]) => ({
    period,
    value,
  }));
};

export const buildHeatmap = (risks = []) => {
  const grouped = {};

  risks.forEach((item) => {
    const likelihood = Number(item?.residual_likelihood || item?.inherent_likelihood || 0);
    const impact = Number(item?.residual_impact || item?.inherent_impact || 0);

    if (!likelihood || !impact) return;

    const key = `${likelihood}-${impact}`;
    grouped[key] = (grouped[key] || 0) + 1;
  });

  return Object.entries(grouped).map(([key, count]) => {
    const [likelihood, impact] = key.split("-").map(Number);
    return { likelihood, impact, count };
  });
};

export const buildCriticalRisks = (risks = []) =>
  risks.filter((r) => getRiskRating(r) === "Critical");

export const buildOverdueActions = (actions = []) =>
  actions.filter((a) => a.status === "Overdue");

export const filterRiskItemsForList = (items = [], filters = {}, currentReportingPeriod = null) => {
  const currentPeriodName = currentReportingPeriod?.name || null;
  const currentPeriodId = currentReportingPeriod?.id || null;

  return items.filter((item) => {
    const search = normalize(filters.search);

    const matchesSearch =
      !search ||
      safeIncludes(item.risk_number, search) ||
      safeIncludes(item.description, search) ||
      safeIncludes(getCategoryName(item), search) ||
      safeIncludes(getDepartmentName(item), search) ||
      safeIncludes(getRiskOwnerName(item), search) ||
      safeIncludes(getRegisterOwnerName(item), search);

    const matchesCategory =
      !filters.category || filters.category === ALL || getCategoryName(item) === filters.category;

    const matchesDepartment =
      !filters.department || filters.department === ALL || getDepartmentName(item) === filters.department;

    const matchesRating =
      !filters.rating || filters.rating === ALL || getRiskRating(item) === filters.rating;

    const matchesStatus =
      !filters.status || filters.status === ALL || formatStatus(item.response_status) === filters.status;

    const periodMatch = matchesPeriod(
      item,
      filters.reporting_period,
      currentPeriodName,
      currentPeriodId
    );

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDepartment &&
      matchesRating &&
      matchesStatus &&
      periodMatch
    );
  });
};

export const filterActionItemsForList = (items = [], filters = {}, currentReportingPeriod = null) => {
  const currentPeriodName = currentReportingPeriod?.name || null;
  const currentPeriodId = currentReportingPeriod?.id || null;

  return items.filter((item) => {
    const search = normalize(filters.search);

    const matchesSearch =
      !search ||
      safeIncludes(item.risk, search) ||
      safeIncludes(item.action, search) ||
      safeIncludes(item.owner, search) ||
      safeIncludes(item.category, search) ||
      safeIncludes(item.department, search);

    const matchesDepartment =
      !filters.department || filters.department === ALL || item.department === filters.department;

    const matchesCategory =
      !filters.category || filters.category === ALL || item.category === filters.category;

    const matchesStatus =
      !filters.status || filters.status === ALL || item.status === filters.status;

    const periodMatch =
      !filters.reporting_period ||
      filters.reporting_period === ALL ||
      filters.reporting_period === CURRENT
        ? matchesPeriod(item, filters.reporting_period, currentPeriodName, currentPeriodId)
        : item.reporting_period === filters.reporting_period;

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesCategory &&
      matchesStatus &&
      periodMatch
    );
  });
};

export const filterReviewItemsForList = (items = [], filters = {}, currentReportingPeriod = null) => {
  const currentPeriodName = currentReportingPeriod?.name || null;

  return items.filter((item) => {
    const search = normalize(filters.search);

    const matchesSearch =
      !search ||
      safeIncludes(item.risk, search) ||
      safeIncludes(item.reviewer, search) ||
      safeIncludes(item.comments, search) ||
      safeIncludes(item.category, search) ||
      safeIncludes(item.department, search);

    const matchesDepartment =
      !filters.department || filters.department === ALL || item.department === filters.department;

    const matchesCategory =
      !filters.category || filters.category === ALL || item.category === filters.category;

    const periodMatch =
      !filters.reporting_period ||
      filters.reporting_period === ALL ||
      (filters.reporting_period === CURRENT
        ? item.reporting_period === currentPeriodName
        : item.reporting_period === filters.reporting_period);

    return matchesSearch && matchesDepartment && matchesCategory && periodMatch;
  });
};