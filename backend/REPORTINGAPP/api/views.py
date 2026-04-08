from decimal import Decimal

from rest_framework import permissions, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ORGDATA.models import Divisions,Departments, division_Depts
from REPORTINGAPP.models import (
    DepartmentSubmission,
    ExecutiveReview,
    DivisionPeopleIssue,
    DivisionPeopleIssueUpdate,
    DivisionInitiative,
    DivisionInitiativeUpdate,
    DivisionInitiativeIssue,
    DivisionInitiativeIssueUpdate,
    DivisionKPI,
    DivisionKPIActual,
)
from .serializers import (
    DivisionPeopleIssueSerializer,
    DivisionPeopleIssueUpdateSerializer,
    DivisionInitiativeSerializer,
    DivisionInitiativeUpdateSerializer,
    DivisionInitiativeIssueSerializer,
    DivisionInitiativeIssueUpdateSerializer,
    DivisionKPISerializer,
    DivisionKPIActualSerializer,
)
from REPORTINGAPP.services import build_executive_dashboard


class ExecutiveDashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        period = request.GET.get("period", "last_30_days")
        search = request.GET.get("search", "").strip()

        data = build_executive_dashboard(
            user=request.user,
            period=period,
            search=search,
        )
        return Response(data)


def _user_name(user):
    if not user:
        return ""
    return user.get_full_name() or user.username


def _format_value(value, unit=""):
    if value is None:
        return ""
    if unit == "%":
        return f"{value}%"
    if unit and unit.lower() == "bwp":
        return f"BWP {value}"
    return f"{value} {unit}".strip()


def _build_kpi_card(kpi):
    latest = kpi.actual_updates.order_by("-updated_at", "-id").first()
    history = list(
        kpi.actual_updates.order_by("updated_at", "id").values("updated_at", "actual")
    )

    target = kpi.target or Decimal("0")
    actual = latest.actual if latest else Decimal("0")
    achievement = (actual / target * 100) if target else Decimal("0")
    variance = actual - target

    if achievement >= 100:
        status = "Above Target"
        tone = "#22c55e"
    elif achievement >= 95:
        status = "Slightly Below Target"
        tone = "#f59e0b"
    else:
        status = "Below Target"
        tone = "#ef4444"

    return {
        "id": kpi.id,
        "name": kpi.name,
        "type": kpi.kpi_type,
        "target": _format_value(kpi.target, kpi.unit),
        "actual": _format_value(actual, kpi.unit),
        "achievement": f"{round(achievement, 1)}%",
        "variance": _format_value(variance, kpi.unit),
        "trend": [
            {
                "date": row["updated_at"],
                "value": float(row["actual"]),
            }
            for row in history
        ],
        "tone": tone,
        "status": status,
        "lastUpdatedAt": latest.updated_at if latest else None,
    }


class DivisionPeopleIssueViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DivisionPeopleIssueSerializer

    def get_queryset(self):
        queryset = DivisionPeopleIssue.objects.select_related(
            "division",
            "strategic_objective",
            "owner",
            "created_by",
        ).prefetch_related("updates")

        division_id = self.request.query_params.get("division")
        status_value = self.request.query_params.get("status")
        category = self.request.query_params.get("category")
        severity = self.request.query_params.get("severity")
        search = self.request.query_params.get("search", "").strip()

        if division_id:
            queryset = queryset.filter(division_id=division_id)
        if status_value:
            queryset = queryset.filter(status=status_value)
        if category:
            queryset = queryset.filter(category=category)
        if severity:
            queryset = queryset.filter(severity=severity)
        if search:
            queryset = queryset.filter(title__icontains=search)

        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class DivisionPeopleIssueUpdateViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DivisionPeopleIssueUpdateSerializer

    def get_queryset(self):
        queryset = DivisionPeopleIssueUpdate.objects.select_related(
            "people_issue",
            "updated_by",
        )
        people_issue_id = self.request.query_params.get("people_issue")
        if people_issue_id:
            queryset = queryset.filter(people_issue_id=people_issue_id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(updated_by=self.request.user)


class DivisionInitiativeViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DivisionInitiativeSerializer

    def get_queryset(self):
        queryset = DivisionInitiative.objects.select_related(
            "division",
            "strategic_objective",
            "owner",
            "created_by",
        ).prefetch_related("updates", "issues")

        division_id = self.request.query_params.get("division")
        status_value = self.request.query_params.get("status")
        initiative_type = self.request.query_params.get("initiative_type")
        search = self.request.query_params.get("search", "").strip()

        if division_id:
            queryset = queryset.filter(division_id=division_id)
        if status_value:
            queryset = queryset.filter(status=status_value)
        if initiative_type:
            queryset = queryset.filter(initiative_type=initiative_type)
        if search:
            queryset = queryset.filter(name__icontains=search)

        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class DivisionInitiativeUpdateViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DivisionInitiativeUpdateSerializer

    def get_queryset(self):
        queryset = DivisionInitiativeUpdate.objects.select_related(
            "initiative",
            "updated_by",
        )
        initiative_id = self.request.query_params.get("initiative")
        if initiative_id:
            queryset = queryset.filter(initiative_id=initiative_id)
        return queryset

    def perform_create(self, serializer):
        instance = serializer.save(updated_by=self.request.user)
        initiative = instance.initiative
        if initiative.status != instance.status:
            initiative.status = instance.status
            initiative.save(update_fields=["status", "updated_at"])


class DivisionInitiativeIssueViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DivisionInitiativeIssueSerializer

    def get_queryset(self):
        queryset = DivisionInitiativeIssue.objects.select_related(
            "initiative",
            "created_by",
        ).prefetch_related("issues_updates")

        initiative_id = self.request.query_params.get("initiative")
        status_value = self.request.query_params.get("status")

        if initiative_id:
            queryset = queryset.filter(initiative_id=initiative_id)
        if status_value:
            queryset = queryset.filter(status=status_value)

        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class DivisionInitiativeIssueUpdateViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DivisionInitiativeIssueUpdateSerializer

    def get_queryset(self):
        queryset = DivisionInitiativeIssueUpdate.objects.select_related(
            "risk_issue",
            "updated_by",
        )
        issue_id = self.request.query_params.get("risk_issue")
        if issue_id:
            queryset = queryset.filter(risk_issue_id=issue_id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(updated_by=self.request.user)


class DivisionKPIViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DivisionKPISerializer

    def get_queryset(self):
        queryset = DivisionKPI.objects.select_related(
            "division",
            "strategic_objective",
            "created_by",
        ).prefetch_related("actual_updates")

        division_id = self.request.query_params.get("division")
        kpi_type = self.request.query_params.get("kpi_type")
        active = self.request.query_params.get("is_active")
        search = self.request.query_params.get("search", "").strip()

        if division_id:
            queryset = queryset.filter(division_id=division_id)
        if kpi_type:
            queryset = queryset.filter(kpi_type=kpi_type)
        if active is not None:
            if active.lower() in ["true", "1", "yes"]:
                queryset = queryset.filter(is_active=True)
            elif active.lower() in ["false", "0", "no"]:
                queryset = queryset.filter(is_active=False)
        if search:
            queryset = queryset.filter(name__icontains=search)

        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class DivisionKPIActualViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DivisionKPIActualSerializer

    def get_queryset(self):
        queryset = DivisionKPIActual.objects.select_related(
            "kpi",
            "updated_by",
        )
        kpi_id = self.request.query_params.get("kpi")
        if kpi_id:
            queryset = queryset.filter(kpi_id=kpi_id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(updated_by=self.request.user)


class DivisionDetailAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, division_id, *args, **kwargs):
        division = Divisions.objects.get(id=division_id)

        executive_review = (
            ExecutiveReview.objects.filter(division=division)
            .select_related("executive")
            .order_by("-updated_at", "-id")
            .first()
        )

        department_ids = division_Depts.objects.filter(
            division=division
        ).values_list("Department_id", flat=True)

        department_submissions = (
            DepartmentSubmission.objects.filter(department_id__in=department_ids)
            .select_related("department", "submitted_by")
            .order_by("department__name", "-updated_at")
        )

        latest_by_department = {}
        for submission in department_submissions:
            dept_id = submission.department_id
            if dept_id not in latest_by_department:
                latest_by_department[dept_id] = submission

        departments_payload = []
        for sub in latest_by_department.values():
            departments_payload.append(
                {
                    "id": sub.id,
                    "department": getattr(sub.department, "name", str(sub.department))
                    if sub.department else "",
                    "owner": _user_name(sub.submitted_by),
                    "score": float(sub.score or 0),
                    "status": sub.status,
                    "highlights": sub.comments or "",
                    "submittedAt": sub.submitted_at,
                }
            )

        kpis = (
            DivisionKPI.objects.filter(division=division, is_active=True)
            .prefetch_related("actual_updates")
            .order_by("name")
        )
        kpi_payload = [_build_kpi_card(kpi) for kpi in kpis]

        people_issues = (
            DivisionPeopleIssue.objects.filter(division=division)
            .select_related("owner")
            .prefetch_related("updates")
            .order_by("-created_at")
        )

        people_issues_payload = []
        for issue in people_issues:
            latest_update = issue.updates.last()
            people_issues_payload.append(
                {
                    "id": issue.id,
                    "issue": issue.title,
                    "category": issue.category,
                    "severity": issue.severity,
                    "affectedArea": issue.affected_area,
                    "impact": issue.impact,
                    "mitigation": latest_update.comment if latest_update else "",
                    "owner": _user_name(issue.owner),
                    "status": issue.status,
                    "dueDate": issue.due_date,
                    "latestUpdate": {
                        "comment": latest_update.comment,
                        "updatedBy": _user_name(latest_update.updated_by),
                        "updatedAt": latest_update.updated_at,
                    } if latest_update else None,
                }
            )

        initiatives = (
            DivisionInitiative.objects.filter(division=division)
            .select_related("owner", "strategic_objective")
            .prefetch_related("updates", "issues__updates")
            .order_by("name")
        )

        initiatives_payload = []
        for initiative in initiatives:
            latest_update = initiative.updates.last()
            initiative_issues = initiative.issues.all()

            risks = [item.risk_issue for item in initiative_issues]
            issue_updates = []
            for item in initiative_issues:
                latest_issue_update = item.updates.first()
                if latest_issue_update:
                    issue_updates.append(latest_issue_update.update_comment)

            initiatives_payload.append(
                {
                    "id": initiative.id,
                    "initiative": initiative.name,
                    "strategicObjective": (
                        getattr(initiative.strategic_objective, "name", "")
                        if initiative.strategic_objective else ""
                    ),
                    "type": initiative.initiative_type,
                    "owner": _user_name(initiative.owner),
                    "target": initiative.target,
                    "actual": latest_update.actual if latest_update else "",
                    "status": latest_update.status if latest_update else initiative.status,
                    "reportingPeriodUpdate": (
                        latest_update.status_update if latest_update else ""
                    ),
                    "risksIssues": " | ".join(risks),
                    "mitigation": " | ".join(issue_updates),
                    "updatedAt": latest_update.updated_at if latest_update else None,
                }
            )

        latest_initiative_update = (
            DivisionInitiativeUpdate.objects.filter(initiative__division=division)
            .order_by("-updated_at", "-id")
            .first()
        )
        latest_people_update = (
            DivisionPeopleIssueUpdate.objects.filter(people_issue__division=division)
            .order_by("-updated_at", "-id")
            .first()
        )

        commentary = {
            "summary": (
                f"{division.name} division has {len(departments_payload)} department submissions, "
                f"{len(kpi_payload)} active KPIs, {len(people_issues_payload)} people issues, "
                f"and {len(initiatives_payload)} tracked initiatives."
            ),
            "achievements": "",
            "risks": "",
            "supportNeeded": "",
        }

        response = {
            "division": {
                "id": division.id,
                "name": getattr(division, "name", str(division)),
                "periodId": None,
                "periodName": None,
                "head": _user_name(executive_review.executive) if executive_review else "",
                "role": "Executive Lead",
                "status": executive_review.status if executive_review else "pending",
                "score": (
                    float(executive_review.score or 0)
                    if executive_review and executive_review.score is not None
                    else 0
                ),
            },
            "departments": departments_payload,
            "kpis": kpi_payload,
            "commentary": commentary,
            "peopleIssues": people_issues_payload,
            "initiatives": initiatives_payload,
            "activityMeta": {
                "latestInitiativeUpdateAt": (
                    latest_initiative_update.updated_at if latest_initiative_update else None
                ),
                "latestPeopleIssueUpdateAt": (
                    latest_people_update.updated_at if latest_people_update else None
                ),
            },
        }

        return Response(response)