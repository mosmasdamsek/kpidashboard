from django.utils import timezone
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

from RISK_REGISTER.models import (
    RiskRegister,
    RiskItem,
    RiskMitigationAction,
    RiskReview,
)
from .serializers import (
    RiskRegisterSerializer,
    RiskItemSerializer,
    RiskMitigationActionSerializer,
    RiskReviewSerializer,
)


def _base_risk_queryset():
    return RiskItem.objects.select_related(
        "register",
        "register__Department",
        "register__reporting_period",
        "register__owner",
        "register__submitted_by",
        "register__approved_by",
        "category",
        "strategic_objective",
        "responsible",
        "responsible_user",
        "risk_owner",
        "risk_owner_user",
        "escalation_level",
        "created_by",
        "updated_by",
    ).prefetch_related(
        "mitigation_actions",
        "reviews",
    )


def _base_register_queryset():
    return RiskRegister.objects.select_related(
        "Department",
        "reporting_period",
        "owner",
        "submitted_by",
        "approved_by",
    ).prefetch_related(
        "risks",
        "risks__mitigation_actions",
    )


@api_view(["GET"])
def dashboard_summary(request):
    risks = _base_risk_queryset()
    actions = RiskMitigationAction.objects.select_related("risk").all()

    today = timezone.localdate()

    total_risks = risks.count()
    critical_risks = 0
    high_risks = 0
    open_issues = 0
    upcoming_reviews = 0

    for risk in risks:
        if risk.risk_rating == "Critical":
            critical_risks += 1
        if risk.risk_rating in ["High", "Maximum"]:
            high_risks += 1
        if risk.is_issue and risk.response_status not in ["completed", "closed"]:
            open_issues += 1
        if risk.next_review_date:
            delta = (risk.next_review_date - today).days
            if 0 <= delta <= 30:
                upcoming_reviews += 1

    overdue_actions = sum(1 for action in actions if action.is_overdue)

    return Response({
        "total_risks": total_risks,
        "critical_risks": critical_risks,
        "high_risks": high_risks,
        "overdue_actions": overdue_actions,
        "open_issues": open_issues,
        "upcoming_reviews": upcoming_reviews,
    })


@api_view(["GET"])
def dashboard_by_category(request):
    risks = _base_risk_queryset()
    grouped = {}

    for risk in risks:
        key = risk.category.name if risk.category else "Uncategorized"
        grouped[key] = grouped.get(key, 0) + 1

    return Response([{"name": k, "value": v} for k, v in grouped.items()])


@api_view(["GET"])
def dashboard_by_division(request):
    risks = _base_risk_queryset()
    grouped = {}

    for risk in risks:
        department = getattr(risk.register, "Department", None)
        key = department.name if department else "Unassigned"
        grouped[key] = grouped.get(key, 0) + 1

    return Response([{"name": k, "value": v} for k, v in grouped.items()])


@api_view(["GET"])
def dashboard_trend(request):
    risks = _base_risk_queryset()
    grouped = {}

    for risk in risks:
        period = (
            risk.register.reporting_period.name
            if risk.register and risk.register.reporting_period
            else "Unknown"
        )
        grouped[period] = grouped.get(period, 0) + 1

    return Response([{"period": k, "value": v} for k, v in grouped.items()])


@api_view(["GET"])
def dashboard_heatmap(request):
    risks = _base_risk_queryset()
    grouped = {}

    for risk in risks:
        likelihood = risk.residual_likelihood or risk.inherent_likelihood or 0
        impact = risk.residual_impact or risk.inherent_impact or 0

        if not likelihood or not impact:
            continue

        key = f"{likelihood}-{impact}"
        grouped[key] = grouped.get(key, 0) + 1

    results = []
    for key, count in grouped.items():
        likelihood, impact = key.split("-")
        results.append({
            "likelihood": int(likelihood),
            "impact": int(impact),
            "count": count,
        })

    return Response(results)


@api_view(["GET"])
def dashboard_critical_risks(request):
    risks = [risk for risk in _base_risk_queryset() if risk.risk_rating == "Critical"]
    return Response(RiskItemSerializer(risks, many=True).data)


@api_view(["GET"])
def dashboard_overdue_actions(request):
    actions = RiskMitigationAction.objects.select_related(
        "risk",
        "owner_title",
        "owner_user",
        "created_by",
    ).all()

    overdue = [action for action in actions if action.is_overdue]
    return Response(RiskMitigationActionSerializer(overdue, many=True).data)


class RiskRegisterListAPIView(generics.ListAPIView):
    queryset = _base_register_queryset()
    serializer_class = RiskRegisterSerializer


class RiskItemListAPIView(generics.ListAPIView):
    queryset = _base_risk_queryset()
    serializer_class = RiskItemSerializer


class RiskItemDetailAPIView(generics.RetrieveAPIView):
    queryset = _base_risk_queryset()
    serializer_class = RiskItemSerializer


class RiskMitigationActionListAPIView(generics.ListAPIView):
    queryset = RiskMitigationAction.objects.select_related(
        "risk",
        "owner_title",
        "owner_user",
        "created_by",
    )
    serializer_class = RiskMitigationActionSerializer


class RiskReviewListAPIView(generics.ListAPIView):
    queryset = RiskReview.objects.select_related(
        "risk",
        "reviewed_by",
    )
    serializer_class = RiskReviewSerializer