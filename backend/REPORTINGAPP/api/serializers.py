from rest_framework import serializers

from REPORTINGAPP.models import (
    DivisionPeopleIssue,
    DivisionPeopleIssueUpdate,
    DivisionInitiative,
    DivisionInitiativeUpdate,
    DivisionInitiativeIssue,
    DivisionInitiativeIssueUpdate,
    DivisionKPI,
    DivisionKPIActual,
)


class DivisionPeopleIssueUpdateSerializer(serializers.ModelSerializer):
    updated_by_name = serializers.SerializerMethodField()

    class Meta:
        model = DivisionPeopleIssueUpdate
        fields = [
            "id",
            "people_issue",
            "comment",
            "updated_by",
            "updated_by_name",
            "updated_at",
        ]
        read_only_fields = ["id", "updated_by", "updated_by_name", "updated_at"]

    def get_updated_by_name(self, obj):
        if not obj.updated_by:
            return ""
        return obj.updated_by.get_full_name() or obj.updated_by.username


class DivisionPeopleIssueSerializer(serializers.ModelSerializer):
    owner_name = serializers.SerializerMethodField()
    division_name = serializers.SerializerMethodField()
    latest_update = serializers.SerializerMethodField()
    updates = DivisionPeopleIssueUpdateSerializer(many=True, read_only=True)

    class Meta:
        model = DivisionPeopleIssue
        fields = [
            "id",
            "division",
            "division_name",
            "strategic_objective",
            "title",
            "category",
            "severity",
            "affected_area",
            "impact",
            "owner",
            "owner_name",
            "status",
            "due_date",
            "created_by",
            "created_at",
            "updated_at",
            "latest_update",
            "updates",
        ]
        read_only_fields = [
            "id",
            "created_by",
            "created_at",
            "updated_at",
            "division_name",
            "owner_name",
            "latest_update",
            "updates",
        ]

    def get_owner_name(self, obj):
        if not obj.owner:
            return ""
        return obj.owner.get_full_name() or obj.owner.username

    def get_division_name(self, obj):
        return getattr(obj.division, "name", str(obj.division))

    def get_latest_update(self, obj):
        latest = obj.updates.last()
        if not latest:
            return None
        return {
            "id": latest.id,
            "comment": latest.comment,
            "updated_by": latest.updated_by_id,
            "updated_by_name": (
                latest.updated_by.get_full_name() or latest.updated_by.username
                if latest.updated_by else ""
            ),
            "updated_at": latest.updated_at,
        }


class DivisionInitiativeIssueUpdateSerializer(serializers.ModelSerializer):
    updated_by_name = serializers.SerializerMethodField()

    class Meta:
        model = DivisionInitiativeIssueUpdate
        fields = [
            "id",
            "risk_issue",
            "update_comment",
            "updated_by",
            "updated_by_name",
            "updated_at",
        ]
        read_only_fields = ["id", "updated_by", "updated_by_name", "updated_at"]

    def get_updated_by_name(self, obj):
        if not obj.updated_by:
            return ""
        return obj.updated_by.get_full_name() or obj.updated_by.username


class DivisionInitiativeIssueSerializer(serializers.ModelSerializer):
    created_by_name = serializers.SerializerMethodField()
    updates = DivisionInitiativeIssueUpdateSerializer(
        many=True,
        read_only=True,
        source="issues_updates",
    )

    class Meta:
        model = DivisionInitiativeIssue
        fields = [
            "id",
            "initiative",
            "risk_issue",
            "status",
            "created_by",
            "created_by_name",
            "created_at",
            "updated_at",
            "updates",
        ]
        read_only_fields = [
            "id",
            "created_by",
            "created_by_name",
            "created_at",
            "updated_at",
            "updates",
        ]

    def get_created_by_name(self, obj):
        if not obj.created_by:
            return ""
        return obj.created_by.get_full_name() or obj.created_by.username


class DivisionInitiativeUpdateSerializer(serializers.ModelSerializer):
    updated_by_name = serializers.SerializerMethodField()

    class Meta:
        model = DivisionInitiativeUpdate
        fields = [
            "id",
            "initiative",
            "actual",
            "status",
            "status_update",
            "updated_by",
            "updated_by_name",
            "updated_at",
        ]
        read_only_fields = ["id", "updated_by", "updated_by_name", "updated_at"]

    def get_updated_by_name(self, obj):
        if not obj.updated_by:
            return ""
        return obj.updated_by.get_full_name() or obj.updated_by.username


class DivisionInitiativeSerializer(serializers.ModelSerializer):
    owner_name = serializers.SerializerMethodField()
    division_name = serializers.SerializerMethodField()
    latest_update = serializers.SerializerMethodField()
    updates = DivisionInitiativeUpdateSerializer(many=True, read_only=True)
    issues = DivisionInitiativeIssueSerializer(many=True, read_only=True)

    class Meta:
        model = DivisionInitiative
        fields = [
            "id",
            "division",
            "division_name",
            "strategic_objective",
            "name",
            "initiative_type",
            "target",
            "status",
            "due_date",
            "owner",
            "owner_name",
            "created_by",
            "created_at",
            "updated_at",
            "latest_update",
            "updates",
            "issues",
        ]
        read_only_fields = [
            "id",
            "created_by",
            "created_at",
            "updated_at",
            "division_name",
            "owner_name",
            "latest_update",
            "updates",
            "issues",
        ]

    def get_owner_name(self, obj):
        if not obj.owner:
            return ""
        return obj.owner.get_full_name() or obj.owner.username

    def get_division_name(self, obj):
        return getattr(obj.division, "name", str(obj.division))

    def get_latest_update(self, obj):
        latest = obj.updates.last()
        if not latest:
            return None
        return {
            "id": latest.id,
            "actual": latest.actual,
            "status": latest.status,
            "status_update": latest.status_update,
            "updated_by": latest.updated_by_id,
            "updated_by_name": (
                latest.updated_by.get_full_name() or latest.updated_by.username
                if latest.updated_by else ""
            ),
            "updated_at": latest.updated_at,
        }


class DivisionKPIActualSerializer(serializers.ModelSerializer):
    updated_by_name = serializers.SerializerMethodField()

    class Meta:
        model = DivisionKPIActual
        fields = [
            "id",
            "kpi",
            "actual",
            "updated_by",
            "updated_by_name",
            "updated_at",
            "comments",
        ]
        read_only_fields = ["id", "updated_by", "updated_by_name", "updated_at"]

    def get_updated_by_name(self, obj):
        if not obj.updated_by:
            return ""
        return obj.updated_by.get_full_name() or obj.updated_by.username


class DivisionKPISerializer(serializers.ModelSerializer):
    division_name = serializers.SerializerMethodField()
    latest_actual = serializers.SerializerMethodField()
    actual_updates = DivisionKPIActualSerializer(many=True, read_only=True)

    class Meta:
        model = DivisionKPI
        fields = [
            "id",
            "division",
            "division_name",
            "name",
            "strategic_objective",
            "kpi_type",
            "target",
            "unit",
            "is_active",
            "created_by",
            "created_at",
            "latest_actual",
            "actual_updates",
        ]
        read_only_fields = [
            "id",
            "created_by",
            "created_at",
            "division_name",
            "latest_actual",
            "actual_updates",
        ]

    def get_division_name(self, obj):
        return getattr(obj.division, "name", str(obj.division))

    def get_latest_actual(self, obj):
        latest = obj.actual_updates.last()
        if not latest:
            return None
        return {
            "id": latest.id,
            "actual": latest.actual,
            "updated_by": latest.updated_by_id,
            "updated_by_name": (
                latest.updated_by.get_full_name() or latest.updated_by.username
                if latest.updated_by else ""
            ),
            "updated_at": latest.updated_at,
            "comments": latest.comments,
        }