import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  period: "last_30_days",
  searchQuery: "",
  notificationsOpen: false,
  selectedDivision: null,
};

const executiveDashboardSlice = createSlice({
  name: "executiveDashboard",
  initialState,
  reducers: {
    setPeriod: (state, action) => {
      state.period = action.payload;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    toggleNotifications: (state) => {
      state.notificationsOpen = !state.notificationsOpen;
    },

    setNotificationsOpen: (state, action) => {
      state.notificationsOpen = action.payload;
    },

    setSelectedDivision: (state, action) => {
      state.selectedDivision = action.payload;
    },

    clearSelectedDivision: (state) => {
      state.selectedDivision = null;
    },

    resetExecutiveDashboardState: () => initialState,
  },
});

export const {
  setPeriod,
  setSearchQuery,
  toggleNotifications,
  setNotificationsOpen,
  setSelectedDivision,
  clearSelectedDivision,
  resetExecutiveDashboardState,
} = executiveDashboardSlice.actions;

export default executiveDashboardSlice.reducer;