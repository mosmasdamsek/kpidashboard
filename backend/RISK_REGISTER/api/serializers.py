from rest_framework import serializers

from RISK_REGISTER.models import (
    ReportingPeriod,
    RiskCategory,
    RiskRegister,
    RiskItem,
    RiskMitigationAction,
    RiskReview,
    RiskActionLog,
)


class SimpleUserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    full_name = serializers.SerializerMethodField()
    email = serializers.EmailField(allow_null=True)

    def get_full_name(self, obj):
        full_name = ""
        if hasattr(obj, "get_full_name"):
            full_name = obj.get_full_name() or ""
        return full_name or getattr(obj, "username", "")


class SimpleDepartmentSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()


class SimpleJobTitleSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()

    def get_title(self, obj):
        return (
            getattr(obj, "title", None)
            or getattr(obj, "position_name", None)
            or str(obj)
        )

    def get_name(self, obj):
        return (
            getattr(obj, "title", None)
            or getattr(obj, "position_name", None)
            or str(obj)
        )


class SimpleGovBodySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()


class SimpleStrategicObjectiveSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.SerializerMethodField()

    def get_name(self, obj):
        return getattr(obj, "name", None) or getattr(obj, "title", None) or str(obj)


class ReportingPeriodSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportingPeriod
        fields = "__all__"


class RiskCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = RiskCategory
        fields = "__all__"


class RiskMitigationActionSerializer(serializers.ModelSerializer):
    owner_title = SimpleJobTitleSerializer(read_only=True)
    owner_user = SimpleUserSerializer(read_only=True)
    created_by = SimpleUserSerializer(read_only=True)
    is_overdue = serializers.ReadOnlyField()

    class Meta:
        model = RiskMitigationAction
        fields = "__all__"


class RiskReviewSerializer(serializers.ModelSerializer):
    reviewed_by = SimpleUserSerializer(read_only=True)

    class Meta:
        model = RiskReview
        fields = "__all__"


class RiskActionLogSerializer(serializers.ModelSerializer):
    user = SimpleUserSerializer(read_only=True)

    class Meta:
        model = RiskActionLog
        fields = "__all__"


class RiskRegisterSerializer(serializers.ModelSerializer):
    # expose both for current frontend compatibility + future cleanup
    Department = SimpleDepartmentSerializer(source="Department", read_only=True)
    department = SimpleDepartmentSerializer(source="Department", read_only=True)

    reporting_period = ReportingPeriodSerializer(read_only=True)
    owner = SimpleUserSerializer(read_only=True)
    submitted_by = SimpleUserSerializer(read_only=True)
    approved_by = SimpleUserSerializer(read_only=True)

    risk_count = serializers.SerializerMethodField()
    critical_risks = serializers.SerializerMethodField()
    overdue_actions = serializers.SerializerMethodField()

    class Meta:
        model = RiskRegister
        fields = [
            "id",
            "Department",
            "department",
            "reporting_period",
            "owner",
            "is_active",
            "workflow_status",
            "notes",
            "submitted_at",
            "submitted_by",
            "approved_at",
            "approved_by",
            "created_at",
            "updated_at",
            "risk_count",
            "critical_risks",
            "overdue_actions",
        ]

    def get_risk_count(self, obj):
        return obj.risks.count()

    def get_critical_risks(self, obj):
        return sum(1 for risk in obj.risks.all() if risk.risk_rating == "Critical")

    def get_overdue_actions(self, obj):
        count = 0
        for risk in obj.risks.all():
            count += sum(1 for action in risk.mitigation_actions.all() if action.is_overdue)
        return count


class RiskItemSerializer(serializers.ModelSerializer):
    register = RiskRegisterSerializer(read_only=True)
    category = RiskCategorySerializer(read_only=True)
    strategic_objective = SimpleStrategicObjectiveSerializer(read_only=True)

    responsible = SimpleJobTitleSerializer(read_only=True)
    responsible_user = SimpleUserSerializer(read_only=True)

    risk_owner = SimpleJobTitleSerializer(read_only=True)
    risk_owner_user = SimpleUserSerializer(read_only=True)

    escalation_level = SimpleGovBodySerializer(read_only=True)

    created_by = SimpleUserSerializer(read_only=True)
    updated_by = SimpleUserSerializer(read_only=True)

    mitigation_actions = RiskMitigationActionSerializer(many=True, read_only=True)
    reviews = RiskReviewSerializer(many=True, read_only=True)

    inherent_risk_score = serializers.ReadOnlyField()
    residual_risk_score = serializers.ReadOnlyField()
    current_score = serializers.ReadOnlyField()
    risk_rating = serializers.ReadOnlyField()
    is_issue = serializers.ReadOnlyField()
    is_overdue = serializers.ReadOnlyField()
    days_remaining = serializers.ReadOnlyField()
    requires_escalation = serializers.ReadOnlyField()
    control_gap = serializers.ReadOnlyField()

    class Meta:
        model = RiskItem
        fields = "__all__"