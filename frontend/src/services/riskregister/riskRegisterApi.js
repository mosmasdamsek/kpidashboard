import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const riskRegisterApi = createApi({
  reducerPath: "riskRegisterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/risk-register/",
    credentials: "include",
  }),
  tagTypes: ["RiskRegister", "RiskItem", "RiskAction", "RiskReview", "RiskDashboard"],
  endpoints: (builder) => ({
    getRiskDashboardSummary: builder.query({
      query: () => "dashboard/summary/",
      providesTags: ["RiskDashboard"],
    }),

    getRisksByCategory: builder.query({
      query: () => "dashboard/by-category/",
      providesTags: ["RiskDashboard"],
    }),

    getRisksByDivision: builder.query({
      query: () => "dashboard/by-division/",
      providesTags: ["RiskDashboard"],
    }),

    getRiskTrend: builder.query({
      query: () => "dashboard/trend/",
      providesTags: ["RiskDashboard"],
    }),

    getRiskHeatmap: builder.query({
      query: () => "dashboard/heatmap/",
      providesTags: ["RiskDashboard"],
    }),

    getCriticalRisks: builder.query({
      query: () => "dashboard/critical-risks/",
      providesTags: ["RiskDashboard"],
    }),

    getOverdueActions: builder.query({
      query: () => "dashboard/overdue-actions/",
      providesTags: ["RiskDashboard"],
    }),

    getRiskRegisters: builder.query({
      query: () => "registers/",
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "RiskRegister", id: item.id })),
              { type: "RiskRegister", id: "LIST" },
            ]
          : [{ type: "RiskRegister", id: "LIST" }],
    }),

    getRiskItems: builder.query({
      query: () => "items/",
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "RiskItem", id: item.id })),
              { type: "RiskItem", id: "LIST" },
            ]
          : [{ type: "RiskItem", id: "LIST" }],
    }),

    getRiskItem: builder.query({
      query: (id) => `items/${id}/`,
      providesTags: (result, error, id) => [{ type: "RiskItem", id }],
    }),

    getRiskActions: builder.query({
      query: () => "actions/",
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "RiskAction", id: item.id })),
              { type: "RiskAction", id: "LIST" },
            ]
          : [{ type: "RiskAction", id: "LIST" }],
    }),

    getRiskReviews: builder.query({
      query: () => "reviews/",
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "RiskReview", id: item.id })),
              { type: "RiskReview", id: "LIST" },
            ]
          : [{ type: "RiskReview", id: "LIST" }],
    }),
  }),
});

export const {
  useGetRiskDashboardSummaryQuery,
  useGetRisksByCategoryQuery,
  useGetRisksByDivisionQuery,
  useGetRiskTrendQuery,
  useGetRiskHeatmapQuery,
  useGetCriticalRisksQuery,
  useGetOverdueActionsQuery,
  useGetRiskRegistersQuery,
  useGetRiskItemsQuery,
  useGetRiskItemQuery,
  useGetRiskActionsQuery,
  useGetRiskReviewsQuery,
} = riskRegisterApi;