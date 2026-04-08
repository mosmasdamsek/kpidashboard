from django.urls import path
from . import views

urlpatterns = [
    path("dashboard/summary/", views.dashboard_summary, name="risk-dashboard-summary"),
    path("dashboard/by-category/", views.dashboard_by_category, name="risk-dashboard-by-category"),
    path("dashboard/by-division/", views.dashboard_by_division, name="risk-dashboard-by-division"),
    path("dashboard/trend/", views.dashboard_trend, name="risk-dashboard-trend"),
    path("dashboard/heatmap/", views.dashboard_heatmap, name="risk-dashboard-heatmap"),
    path("dashboard/critical-risks/", views.dashboard_critical_risks, name="risk-dashboard-critical-risks"),
    path("dashboard/overdue-actions/", views.dashboard_overdue_actions, name="risk-dashboard-overdue-actions"),

    path("registers/", views.RiskRegisterListAPIView.as_view(), name="risk-register-list"),
    path("items/", views.RiskItemListAPIView.as_view(), name="risk-item-list"),
    path("items/<int:pk>/", views.RiskItemDetailAPIView.as_view(), name="risk-item-detail"),
    path("actions/", views.RiskMitigationActionListAPIView.as_view(), name="risk-action-list"),
    path("reviews/", views.RiskReviewListAPIView.as_view(), name="risk-review-list"),
]