import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../routes/ProtectedRoute";
import RoleRedirect from "../routes/RoleRedirect";

import DashboardPage from "../pages/ceo/DashboardPage";

import DepartmentPeriodsPage from "../pages/department/DepartmentPeriodsPage";
import DepartmentEntryPage from "../pages/department/DepartmentEntryPage";
import DepartmentHistoryPage from "../pages/department/DepartmentHistoryPage";

import SupervisorQueuePage from "../pages/supervisor/SupervisorQueuePage";
import SupervisorReviewPage from "../pages/supervisor/SupervisorReviewPage";

import DivisionOverviewPage from "../pages/division/DivisionOverviewPage";
import DivisionCommentaryPage from "../pages/division/DivisionCommentaryPage";
import DivisionPreviewPage from "../pages/division/DivisionPreviewPage";

import StrategyPeriodsPage from "../pages/strategy/StrategyPeriodsPage";
import StrategyTemplatesPage from "../pages/strategy/StrategyTemplatesPage";
import StrategyTargetsPage from "../pages/strategy/StrategyTargetsPage";
import StrategyTrackerPage from "../pages/strategy/StrategyTrackerPage";
import StrategyPublishPage from "../pages/strategy/StrategyPublishPage";

import RiskDashboardPage from "../pages/riskregister/RiskDashboardPage";
import RiskRegistersPage from "../pages/riskregister/RiskRegistersPage";
import RiskItemsPage from "../pages/riskregister/RiskItemsPage";
import RiskItemDetailPage from "../pages/riskregister/RiskItemDetailPage";
import RiskActionsPage from "../pages/riskregister/RiskActionsPage";
import RiskReviewsPage from "../pages/riskregister/RiskReviewsPage";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <RoleRedirect />,
      },
      {
        path: "ceo/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["ceo"]}>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "executive/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["ceo"]}>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "department/periods",
        element: (
          <ProtectedRoute allowedRoles={["department"]}>
            <DepartmentPeriodsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "department/entry/:periodId",
        element: (
          <ProtectedRoute allowedRoles={["department"]}>
            <DepartmentEntryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "department/entry/current",
        element: (
          <ProtectedRoute allowedRoles={["department"]}>
            <DepartmentEntryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "department/history",
        element: (
          <ProtectedRoute allowedRoles={["department"]}>
            <DepartmentHistoryPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "supervisor/queue",
        element: (
          <ProtectedRoute allowedRoles={["supervisor"]}>
            <SupervisorQueuePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "supervisor/review/:submissionId",
        element: (
          <ProtectedRoute allowedRoles={["supervisor"]}>
            <SupervisorReviewPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "supervisor/review/demo-submission",
        element: (
          <ProtectedRoute allowedRoles={["supervisor"]}>
            <SupervisorReviewPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "division/overview/:periodId",
        element: (
          <ProtectedRoute allowedRoles={["division"]}>
            <DivisionOverviewPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "division/overview/current",
        element: (
          <ProtectedRoute allowedRoles={["division"]}>
            <DivisionOverviewPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "division/commentary/:periodId",
        element: (
          <ProtectedRoute allowedRoles={["division"]}>
            <DivisionCommentaryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "division/commentary/current",
        element: (
          <ProtectedRoute allowedRoles={["division"]}>
            <DivisionCommentaryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "division/preview/:periodId",
        element: (
          <ProtectedRoute allowedRoles={["division"]}>
            <DivisionPreviewPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "division/preview/current",
        element: (
          <ProtectedRoute allowedRoles={["division"]}>
            <DivisionPreviewPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "strategy/periods",
        element: (
          <ProtectedRoute allowedRoles={["strategy"]}>
            <StrategyPeriodsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "strategy/templates",
        element: (
          <ProtectedRoute allowedRoles={["strategy"]}>
            <StrategyTemplatesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "strategy/targets",
        element: (
          <ProtectedRoute allowedRoles={["strategy"]}>
            <StrategyTargetsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "strategy/tracker",
        element: (
          <ProtectedRoute allowedRoles={["strategy"]}>
            <StrategyTrackerPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "strategy/publish",
        element: (
          <ProtectedRoute allowedRoles={["strategy"]}>
            <StrategyPublishPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "risk-register/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["ceo", "strategy", "division", "department", "supervisor"]}>
            <RiskDashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "risk-register/registers",
        element: (
          <ProtectedRoute allowedRoles={["ceo", "strategy", "division", "department", "supervisor"]}>
            <RiskRegistersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "risk-register/items",
        element: (
          <ProtectedRoute allowedRoles={["strategy", "division", "department", "supervisor"]}>
            <RiskItemsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "risk-register/items/:id",
        element: (
          <ProtectedRoute allowedRoles={["strategy", "division", "department", "supervisor"]}>
            <RiskItemDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "risk-register/actions",
        element: (
          <ProtectedRoute allowedRoles={["strategy", "division", "department", "supervisor"]}>
            <RiskActionsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "risk-register/reviews",
        element: (
          <ProtectedRoute allowedRoles={["strategy", "division", "department", "supervisor"]}>
            <RiskReviewsPage />
          </ProtectedRoute>
        ),
      },

    ],
    
  },
];

export const router = createBrowserRouter(routes);
