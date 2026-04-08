import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getExecutiveDashboard: builder.query({
      query: ({ period = "last_30_days", search = "" }) => ({
        url: "/executive/dashboard/",
        params: { period, search },
      }),
    }),
  }),
});

export const { useGetExecutiveDashboardQuery } = dashboardApi;