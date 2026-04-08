import { createSelector } from "@reduxjs/toolkit";

export const selectExecutiveDashboard = (state) => state.executiveDashboard;

export const selectDashboardPeriod = (state) =>
  state.executiveDashboard.period;

export const selectDashboardSearchQuery = (state) =>
  state.executiveDashboard.searchQuery;

export const selectDashboardNotificationsOpen = (state) =>
  state.executiveDashboard.notificationsOpen;

export const selectSelectedDivision = (state) =>
  state.executiveDashboard.selectedDivision;

const normalize = (value) => String(value || "").toLowerCase().trim();

const selectNormalizedSearchQuery = createSelector(
  [selectDashboardSearchQuery],
  (searchQuery) => normalize(searchQuery)
);

const selectDivisionsInput = (_, divisions = []) => divisions;
const selectRankingsInput = (_, rankings = []) => rankings;
const selectInsightsInput = (_, insightCards = []) => insightCards;
const selectHighlightsInput = (_, highlights = []) => highlights;
const selectActivitiesInput = (_, activities = []) => activities;
const selectGoalsInput = (_, goals = []) => goals;
const selectRevenueSegmentsInput = (_, revenueSegments = []) => revenueSegments;
const selectMatrixInput = (_, matrixData = []) => matrixData;

export const makeSelectFilteredDivisions = () =>
  createSelector(
    [selectNormalizedSearchQuery, selectDivisionsInput],
    (query, divisions) => {
      if (!query) return divisions;

      return divisions.filter((division) => {
        const haystack = [
          division.name,
          division.owner,
          division.role,
          division.wow,
          division.summary?.bestKpi,
          division.summary?.bestKpiChange,
          division.summary?.needsFocus,
          division.summary?.needsFocusChange,
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(query);
      });
    }
  );

export const makeSelectFilteredRankings = () =>
  createSelector(
    [selectNormalizedSearchQuery, selectRankingsInput],
    (query, rankings) => {
      if (!query) return rankings;

      return rankings.filter((item) => {
        const haystack = [item.name, item.category, item.status]
          .join(" ")
          .toLowerCase();

        return haystack.includes(query);
      });
    }
  );

export const makeSelectFilteredInsights = () =>
  createSelector(
    [selectNormalizedSearchQuery, selectInsightsInput],
    (query, insightCards) => {
      if (!query) return insightCards;

      return insightCards.filter((item) => {
        const haystack = [item.title, item.description, item.tag]
          .join(" ")
          .toLowerCase();

        return haystack.includes(query);
      });
    }
  );

export const makeSelectFilteredHighlights = () =>
  createSelector(
    [selectNormalizedSearchQuery, selectHighlightsInput],
    (query, highlights) => {
      if (!query) return highlights;

      return highlights.filter((item) => {
        const haystack = [item.title, item.description, item.category]
          .join(" ")
          .toLowerCase();

        return haystack.includes(query);
      });
    }
  );

export const makeSelectFilteredActivities = () =>
  createSelector(
    [selectNormalizedSearchQuery, selectActivitiesInput],
    (query, activities) => {
      if (!query) return activities;

      return activities.filter((item) => {
        const haystack = [item.title, item.description, item.actor]
          .join(" ")
          .toLowerCase();

        return haystack.includes(query);
      });
    }
  );

export const makeSelectFilteredGoals = () =>
  createSelector(
    [selectNormalizedSearchQuery, selectGoalsInput],
    (query, goals) => {
      if (!query) return goals;

      return goals.filter((goal) => {
        const haystack = [goal.title, goal.owner, goal.status]
          .join(" ")
          .toLowerCase();

        return haystack.includes(query);
      });
    }
  );

export const makeSelectFilteredRevenueSegments = () =>
  createSelector(
    [selectNormalizedSearchQuery, selectRevenueSegmentsInput],
    (query, revenueSegments) => {
      if (!query) return revenueSegments;

      return revenueSegments.filter((item) => {
        const haystack = [item.name, item.label].join(" ").toLowerCase();

        return haystack.includes(query);
      });
    }
  );

export const makeSelectFilteredMatrixData = () =>
  createSelector(
    [selectNormalizedSearchQuery, selectMatrixInput],
    (query, matrixData) => {
      if (!query) return matrixData;

      return matrixData.filter((item) => {
        const haystack = [item.name, item.xLabel, item.yLabel]
          .join(" ")
          .toLowerCase();

        return haystack.includes(query);
      });
    }
  );

export const makeSelectAverageDivisionScore = () =>
  createSelector([makeSelectFilteredDivisions()], (filteredDivisions) => {
    if (!filteredDivisions.length) return 0;

    return Math.round(
      filteredDivisions.reduce(
        (sum, item) => sum + Number(item.score || 0),
        0
      ) / filteredDivisions.length
    );
  });

export const makeSelectTopPerformer = () =>
  createSelector([makeSelectFilteredDivisions()], (filteredDivisions) => {
    if (!filteredDivisions.length) return null;

    return [...filteredDivisions].sort(
      (a, b) => Number(b.score || 0) - Number(a.score || 0)
    )[0];
  });

export const makeSelectDashboardSummary = () => {
  const selectFilteredDivisions = makeSelectFilteredDivisions();
  const selectAverageDivisionScore = makeSelectAverageDivisionScore();
  const selectTopPerformer = makeSelectTopPerformer();

  return createSelector(
    [selectFilteredDivisions, selectAverageDivisionScore, selectTopPerformer, selectDashboardPeriod, selectNormalizedSearchQuery],
    (filteredDivisions, avgScore, topPerformer, period, query) => ({
      divisionCount: filteredDivisions.length,
      avgScore,
      topPerformer: topPerformer?.name || "N/A",
      activePeriod: period,
      hasSearch: Boolean(query),
    })
  );
};