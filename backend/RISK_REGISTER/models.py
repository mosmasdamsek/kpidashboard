from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator

from ORGDATA.models import Departments, job_Title, GovBodies
from STRATEGYMANAGEMENT.models import StrategicObjective

# Create your models here.

class RiskCategory(models.Model):
    """Risk universe / classification"""
    name = models.CharField(max_length=100, unique=True)
    definition = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Risk Categories"
        ordering = ["name"]

    def __str__(self):
        return self.name


class ReportingPeriod(models.Model):
    name = models.CharField(max_length=100, unique=True)   # e.g. 2026-2027 Q1
    financial_year = models.CharField(max_length=20)       # e.g. 2026-2027
    quarter = models.CharField(max_length=2)               # e.g. Q1
    start_date = models.DateField()
    end_date = models.DateField()
    is_active = models.BooleanField(default=False)

    class Meta:
        ordering = ["-start_date", "name"]

    def __str__(self):
        return self.name


class RiskRegister(models.Model):
    """
    Container for a department's risk register for a reporting period.
    One register per department per reporting period.
    """

    WORKFLOW_STATUS_CHOICES = [
        ("draft", "Draft"),
        ("submitted", "Submitted"),
        ("reviewed", "Reviewed"),
        ("approved", "Approved"),
        ("closed", "Closed"),
    ]

    Department = models.ForeignKey(
        Departments,
        on_delete=models.PROTECT,
        related_name="risk_registers",
        null=True, 
        blank=True
    )
    reporting_period = models.ForeignKey(
        ReportingPeriod,
        on_delete=models.PROTECT,
        related_name="risk_registers",
        null=True, 
        blank=True
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="owned_risk_registers",
        null=True, 
        blank=True
    )

    is_active = models.BooleanField(default=True)
    workflow_status = models.CharField(
        max_length=20,
        choices=WORKFLOW_STATUS_CHOICES,
        default="draft",
    )
    notes = models.TextField(blank=True)

    submitted_at = models.DateTimeField(null=True, blank=True)
    submitted_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="submitted_risk_registers",
    )
    approved_at = models.DateTimeField(null=True, blank=True)
    approved_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="approved_risk_registers",
    )

    created_at = models.DateTimeField(auto_now_add=True,null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ["Department", "reporting_period"]
        ordering = ["Department__name", "-created_at"]
        indexes = [
            models.Index(fields=["workflow_status"]),
            models.Index(fields=["is_active"]),
        ]

    def __str__(self):
        return f"{self.Department} - {self.reporting_period}"


class RiskItem(models.Model):
    """
    Main risk / issue item.
    Supports:
    - dashboard summaries
    - overdue mitigation tracking
    - issue vs risk reporting
    - review history
    - escalation
    """

    ENTRY_TYPE_CHOICES = [
        ("risk", "Risk"),
        ("issue", "Issue"),
    ]

    IMPACT_CHOICES = [
        (1, "Negligible (1) - Minimal impact"),
        (2, "Significant (2) - Minor impact"),
        (3, "Major (3) - Notable impact"),
        (4, "Critical (4) - Severe impact"),
        (5, "Catastrophic (5) - Threatens business"),
    ]

    LIKELIHOOD_CHOICES = [
        (1, "Unlikely (0-20%)"),
        (2, "Occasionally (21-40%)"),
        (3, "Likely (41-60%)"),
        (4, "Highly Likely (61-80%)"),
        (5, "Almost Certain (81-100%)"),
        (6, "Occurred (Happening now)"),
    ]

    CONTROL_EFFECTIVENESS_CHOICES = [
        (0, "None (0-19%) - No controls"),
        (1, "Weak (20-39%) - Major deficiencies"),
        (2, "Satisfactory (40-59%) - Needs improvement"),
        (3, "Good (60-89%) - Majority controlled"),
        (4, "Very Good (90-100%) - Effectively controlled"),
    ]

    TREND_CHOICES = [
        ("up", "Upward"),
        ("down", "Downward"),
        ("steady", "Steady/Stable"),
    ]

    ONSET_CHOICES = [
        ("instant", "Instant"),
        ("rapid", "Rapid (hours)"),
        ("moderate", "Moderate (days)"),
        ("slow", "Slow (weeks+)"),
    ]

    RESPONSE_STRATEGY_CHOICES = [
        ("avoid", "Terminate/Avoid"),
        ("transfer", "Transfer/Share"),
        ("mitigate", "Treat/Mitigate"),
        ("accept", "Tolerate/Accept"),
    ]

    RESPONSE_STATUS_CHOICES = [
        ("open", "Open (not started)"),
        ("progress", "Open (in progress)"),
        ("overdue", "Past due date"),
        ("completed", "Completed"),
        ("closed", "Closed"),
    ]

    register = models.ForeignKey(
        RiskRegister,
        on_delete=models.PROTECT,
        related_name="risks",
    )
    risk_number = models.CharField(
        max_length=20,
        blank=True,
        help_text='Auto-generated if blank, e.g. "FI001"',
    )

    entry_type = models.CharField(
        max_length=10,
        choices=ENTRY_TYPE_CHOICES,
        default="risk",
    )

    category = models.ForeignKey(
        RiskCategory,
        on_delete=models.PROTECT,
        related_name="risks",
    )

    strategic_objective = models.ForeignKey(
        StrategicObjective,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="risks",
    )

    description = models.TextField()
    contributing_factors = models.TextField(
        blank=True,
        help_text="Drivers / indicators / causes of the risk",
    )
    consequences = models.TextField(
        blank=True,
        help_text="Potential or actual consequences if the risk materializes",
    )

    speed_of_onset = models.CharField(
        max_length=20,
        choices=ONSET_CHOICES,
        blank=True,
    )

    inherent_impact = models.PositiveSmallIntegerField(
        choices=IMPACT_CHOICES,
        validators=[MinValueValidator(1), MaxValueValidator(5)],
    )
    inherent_likelihood = models.PositiveSmallIntegerField(
        choices=LIKELIHOOD_CHOICES,
        validators=[MinValueValidator(1), MaxValueValidator(6)],
    )

    existing_controls = models.TextField(blank=True)

    control_effectiveness = models.PositiveSmallIntegerField(
        choices=CONTROL_EFFECTIVENESS_CHOICES,
        null=True,
        blank=True,
    )

    responsible = models.ForeignKey(
        job_Title,
        on_delete=models.PROTECT,
        related_name="responsible_risks",
        null=True,
        blank=True,
        help_text="Operational role responsible for implementing responses/actions",
    )
    responsible_user = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="responsible_user_risks",
        null=True,
        blank=True,
    )

    residual_impact = models.PositiveSmallIntegerField(
        choices=IMPACT_CHOICES,
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        null=True,
        blank=True,
    )
    residual_likelihood = models.PositiveSmallIntegerField(
        choices=LIKELIHOOD_CHOICES,
        validators=[MinValueValidator(1), MaxValueValidator(6)],
        null=True,
        blank=True,
    )

    response_strategy = models.CharField(
        max_length=20,
        choices=RESPONSE_STRATEGY_CHOICES,
        blank=True,
    )

    escalation_level = models.ForeignKey(
        GovBodies,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="escalated_risks",
    )

    risk_owner = models.ForeignKey(
        job_Title,
        on_delete=models.PROTECT,
        related_name="owned_risks",
        null=True,
        blank=True,
    )
    risk_owner_user = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="owned_user_risks",
        null=True,
        blank=True,
    )

    due_date = models.DateField(
        null=True,
        blank=True,
        help_text="Use when an exact due date is known",
    )
    due_period = models.CharField(
        max_length=50,
        blank=True,
        help_text='Use for quarter-style values like "Q2 2025/26"',
    )

    risk_trend = models.CharField(
        max_length=10,
        choices=TREND_CHOICES,
        blank=True,
    )

    response_status = models.CharField(
        max_length=12,
        choices=RESPONSE_STATUS_CHOICES,
        default="open",
    )

    notes = models.TextField(blank=True)

    last_review_date = models.DateField(null=True, blank=True)
    next_review_date = models.DateField(null=True, blank=True)

    created_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="created_risk_items",
        null=True,
        blank=True,
    )
    updated_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="updated_risk_items",
        null=True,
        blank=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["register", "risk_number"]
        unique_together = ["register", "risk_number"]
        indexes = [
            models.Index(fields=["entry_type"]),
            models.Index(fields=["response_status"]),
            models.Index(fields=["category"]),
            models.Index(fields=["risk_owner"]),
            models.Index(fields=["risk_owner_user"]),
            models.Index(fields=["responsible"]),
            models.Index(fields=["responsible_user"]),
            models.Index(fields=["due_date"]),
            models.Index(fields=["last_review_date"]),
            models.Index(fields=["next_review_date"]),
        ]

    def __str__(self):
        return f"{self.risk_number}: {self.description[:50]}"

    @property
    def inherent_risk_score(self):
        if self.inherent_impact is None or self.inherent_likelihood is None:
            return None
        return self.inherent_impact * self.inherent_likelihood

    @property
    def residual_risk_score(self):
        if self.residual_impact is None or self.residual_likelihood is None:
            return None
        return self.residual_impact * self.residual_likelihood

    @property
    def current_score(self):
        return self.residual_risk_score or self.inherent_risk_score

    @property
    def risk_rating(self):
        score = self.current_score
        if score is None:
            return "Not Rated"
        if score >= 21:
            return "Critical"
        if score >= 15:
            return "Maximum"
        if score >= 10:
            return "High"
        if score >= 4:
            return "Medium"
        return "Low"

    @property
    def is_issue(self):
        return self.entry_type == "issue" or self.inherent_likelihood == 6

    @property
    def is_overdue(self):
        if self.response_status in ["completed", "closed"]:
            return False
        if not self.due_date:
            return False
        return self.due_date < timezone.localdate()

    @property
    def days_remaining(self):
        if not self.due_date:
            return None
        return (self.due_date - timezone.localdate()).days

    @property
    def requires_escalation(self):
        return self.risk_rating in ["Critical", "Maximum"] or self.is_overdue

    @property
    def control_gap(self):
        if self.inherent_risk_score is None or self.residual_risk_score is None:
            return None
        return self.inherent_risk_score - self.residual_risk_score

    def save(self, *args, **kwargs):
        if not self.risk_number:
            prefix = (self.register.Department.name[:2] or "RK").upper()

            # department-wide continuous numbering
            last_risk = (
                RiskItem.objects.filter(register__Department=self.register.Department)
                .order_by("risk_number")
                .last()
            )

            if last_risk and last_risk.risk_number.startswith(prefix):
                try:
                    last_num = int(last_risk.risk_number[len(prefix):])
                    self.risk_number = f"{prefix}{last_num + 1:03d}"
                except ValueError:
                    self.risk_number = f"{prefix}001"
            else:
                self.risk_number = f"{prefix}001"

        if self.response_status not in ["completed", "closed"] and self.due_date:
            if self.due_date < timezone.localdate():
                self.response_status = "overdue"

        if self.inherent_likelihood == 6 and self.entry_type != "issue":
            self.entry_type = "issue"

        super().save(*args, **kwargs)


class RiskMitigationAction(models.Model):
    """
    Structured mitigation / treatment action for a risk.
    """

    ACTION_STATUS_CHOICES = [
        ("not_started", "Not Started"),
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
        ("deferred", "Deferred"),
        ("cancelled", "Cancelled"),
    ]

    risk = models.ForeignKey(
        RiskItem,
        on_delete=models.CASCADE,
        related_name="mitigation_actions",
    )

    action_description = models.TextField()
    owner_title = models.ForeignKey(
        job_Title,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="owned_mitigation_actions",
    )
    owner_user = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="owned_mitigation_actions",
    )

    target_date = models.DateField(null=True, blank=True)
    target_period = models.CharField(
        max_length=50,
        blank=True,
        help_text='Alternative to target_date, e.g. "Q3 2025/26"',
    )

    status = models.CharField(
        max_length=20,
        choices=ACTION_STATUS_CHOICES,
        default="not_started",
    )

    progress_notes = models.TextField(blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    created_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="created_mitigation_actions",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["target_date", "id"]
        indexes = [
            models.Index(fields=["status"]),
            models.Index(fields=["target_date"]),
        ]

    def __str__(self):
        return f"{self.risk.risk_number} - {self.action_description[:50]}"

    @property
    def is_overdue(self):
        if self.status == "completed":
            return False
        if not self.target_date:
            return False
        return self.target_date < timezone.localdate()


class RiskActionLog(models.Model):
    """Tracks important changes/actions on risks"""

    ACTION_TYPES = [
        ("create", "Creation"),
        ("update", "Update"),
        ("status", "Status Change"),
        ("comment", "Comment"),
        ("review", "Review"),
        ("delete", "Deletion"),
    ]

    risk = models.ForeignKey(
        RiskItem,
        on_delete=models.PROTECT,
        related_name="action_logs",
    )
    user = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
    )
    action_type = models.CharField(max_length=20, choices=ACTION_TYPES)
    changed_fields = models.JSONField(default=list, blank=True)
    previous_values = models.JSONField(default=dict, blank=True)
    new_values = models.JSONField(default=dict, blank=True)
    comments = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-timestamp"]
        verbose_name = "Action Log"
        verbose_name_plural = "Action Logs"

    def __str__(self):
        return f"{self.get_action_type_display()} by {self.user} at {self.timestamp}"


class RiskReview(models.Model):
    """
    Periodic review records.
    Keeps historical review snapshots while syncing latest review dates to parent risk.
    """

    risk = models.ForeignKey(
        RiskItem,
        on_delete=models.CASCADE,
        related_name="reviews",
    )
    reviewed_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="risk_reviews",
    )
    review_date = models.DateField(default=timezone.localdate)
    comments = models.TextField(blank=True)

    updated_inherent_impact = models.PositiveSmallIntegerField(
        choices=RiskItem.IMPACT_CHOICES,
        null=True,
        blank=True,
    )
    updated_inherent_likelihood = models.PositiveSmallIntegerField(
        choices=RiskItem.LIKELIHOOD_CHOICES,
        null=True,
        blank=True,
    )
    updated_residual_impact = models.PositiveSmallIntegerField(
        choices=RiskItem.IMPACT_CHOICES,
        null=True,
        blank=True,
    )
    updated_residual_likelihood = models.PositiveSmallIntegerField(
        choices=RiskItem.LIKELIHOOD_CHOICES,
        null=True,
        blank=True,
    )

    next_review_date = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ["-review_date"]

    def __str__(self):
        return f"Review for {self.risk.risk_number} on {self.review_date}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        fields_to_update = []

        if self.risk.last_review_date is None or self.review_date >= self.risk.last_review_date:
            self.risk.last_review_date = self.review_date
            fields_to_update.append("last_review_date")

            if self.next_review_date:
                self.risk.next_review_date = self.next_review_date
                fields_to_update.append("next_review_date")

        elif self.next_review_date and (
            self.risk.next_review_date is None or self.next_review_date > self.risk.next_review_date
        ):
            self.risk.next_review_date = self.next_review_date
            fields_to_update.append("next_review_date")

        if fields_to_update:
            fields_to_update.append("updated_at")
            self.risk.save(update_fields=fields_to_update)

