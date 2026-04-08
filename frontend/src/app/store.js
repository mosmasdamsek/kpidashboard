import { configureStore } from "@reduxjs/toolkit";
import executiveDashboardReducer from "../features/executiveDashboard/executiveDashboardSlice";
import { dashboardApi } from "../services/dashboardApi";
import { riskRegisterApi } from "../services/riskregister/riskRegisterApi";
import { apiSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    executiveDashboard: executiveDashboardReducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [riskRegisterApi.reducerPath]: riskRegisterApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(dashboardApi.middleware)
      .concat(riskRegisterApi.middleware)
      .concat(apiSlice.middleware),
});

export default store;