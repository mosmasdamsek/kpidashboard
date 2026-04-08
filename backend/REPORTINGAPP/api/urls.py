from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    ExecutiveDashboardAPIView,
    DivisionPeopleIssueViewSet,
    DivisionPeopleIssueUpdateViewSet,
    DivisionInitiativeViewSet,
    DivisionInitiativeUpdateViewSet,
    DivisionInitiativeIssueViewSet,
    DivisionInitiativeIssueUpdateViewSet,
    DivisionKPIViewSet,
    DivisionKPIActualViewSet,
    DivisionDetailAPIView,
)

router = DefaultRouter()
router.register(r"people-issues", DivisionPeopleIssueViewSet, basename="division-people-issue")
router.register(r"people-issue-updates", DivisionPeopleIssueUpdateViewSet, basename="division-people-issue-update")
router.register(r"initiatives", DivisionInitiativeViewSet, basename="division-initiative")
router.register(r"initiative-updates", DivisionInitiativeUpdateViewSet, basename="division-initiative-update")
router.register(r"initiative-issues", DivisionInitiativeIssueViewSet, basename="division-initiative-issue")
router.register(r"initiative-issue-updates", DivisionInitiativeIssueUpdateViewSet, basename="division-initiative-issue-update")
router.register(r"kpis", DivisionKPIViewSet, basename="division-kpi")
router.register(r"kpi-actuals", DivisionKPIActualViewSet, basename="division-kpi-actual")

urlpatterns = [
    path("dashboard/", ExecutiveDashboardAPIView.as_view(), name="executive-dashboard"),
    path("divisions/<int:division_id>/", DivisionDetailAPIView.as_view(), name="division-detail"),
    path("", include(router.urls)),
]