from django.db import models
from django.conf import settings
from ORGDATA.models import Departments,Divisions
from STRATEGYMANAGEMENT.models import StrategicObjective


class ReportingPeriod(models.Model):

    name = models.CharField(max_length=120)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="created_reporting_periods",
    )

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class DepartmentSubmission(models.Model):
    STATUS_CHOICES = [
        ("draft", "Draft"),
        ("submitted", "Submitted"),
        ("reviewed", "Reviewed"),
        ("flagged", "Flagged"),
    ]

    reporting_period = models.ForeignKey(
        ReportingPeriod,
        on_delete=models.CASCADE,
        related_name="department_submissions",
    )
    department = models.ForeignKey(
        Departments,
        on_delete=models.CASCADE,
        related_name="reporting_submissions",
        null=True,
        blank=True,
    )
    submitted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="department_submissions",
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="draft")
    score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    comments = models.TextField(blank=True)
    submitted_at = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        unique_together = ("reporting_period", "department")

    def __str__(self):
        return f"{self.department} - {self.reporting_period}"


class SupervisorReview(models.Model):
    REVIEW_STATUS = [
        ("pending", "Pending"),
        ("completed", "Completed"),
        ("flagged", "Flagged"),
    ]

    reporting_period = models.ForeignKey(
        ReportingPeriod,
        on_delete=models.CASCADE,
        related_name="period_reviews",
    )
    employee = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="employee_reviews",
        null=True,
        blank=True,
    )
    supervisor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="supervisor_reviews",
    )

    status = models.CharField(max_length=20, choices=REVIEW_STATUS, default="pending")
    score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    due_date = models.DateField(null=True, blank=True)
    comments = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        unique_together = ("reporting_period", "employee")

    def __str__(self):
        return f"{self.employee} - {self.reporting_period}"
    
class ExecutiveReview(models.Model):
    REVIEW_STATUS = [
        ("pending", "Pending"),
        ("completed", "Completed"),
        ("flagged", "Flagged"),
    ]

    reporting_period = models.ForeignKey(
        ReportingPeriod,
        on_delete=models.CASCADE,
        related_name="reporting_period_reviews",
        null=True,
        blank=True,
    )
    division = models.ForeignKey(
        Divisions,
        on_delete=models.CASCADE,
        related_name="division_reviews",
        null=True,
        blank=True,
    )
    executive = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="executive_reviews",
    )

    status = models.CharField(max_length=20, choices=REVIEW_STATUS, default="pending")
    score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    due_date = models.DateField(null=True, blank=True)
    comments = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        unique_together = ("reporting_period", "division", "executive")

    def __str__(self):
        return f"{self.executive} - {self.reporting_period}"

# Replace this string FK with your actual strategy model path if different

class DivisionKPI(models.Model):
    KPI_TYPE_CHOICES = [
        ("financial", "Financial"),
        ("non_financial", "Non Financial"),
        ("operational", "Operational"),
    ]

    division = models.ForeignKey(
        Divisions,
        on_delete=models.CASCADE,
        related_name="division_kpis",
    )
    name = models.CharField(max_length=150)
    strategic_objective = models.ForeignKey(
        StrategicObjective,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="division_kpis",
    )
    kpi_type = models.CharField(max_length=30, choices=KPI_TYPE_CHOICES)
    target = models.DecimalField(max_digits=18, decimal_places=2, null=True, blank=True)
    unit = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="created_division_kpis",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["division__name", "name"]
        unique_together = ("division", "name")

    def __str__(self):
        return f"{self.division} - {self.name}"

class DivisionKPIActual(models.Model):
    kpi = models.ForeignKey(
        DivisionKPI,
        on_delete=models.CASCADE,
        related_name="actual_updates",
    )
    actual = models.DecimalField(max_digits=18, decimal_places=2)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="division_kpi_updates",
    )
    updated_at = models.DateTimeField(auto_now_add=True)
    comments = models.TextField(blank=True)

    class Meta:
        ordering = ["updated_at", "id"]

    def __str__(self):
        return f"{self.kpi.name} @ {self.updated_at:%Y-%m-%d %H:%M}"


class DivisionPeopleIssue(models.Model):
    SEVERITY_CHOICES = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
        ("critical", "Critical"),
    ]

    STATUS_CHOICES = [
        ("open", "Open"),
        ("in_progress", "In Progress"),
        ("resolved", "Resolved"),
        ("closed", "Closed"),
    ]

    CATEGORY_CHOICES = [
        ("capacity", "Capacity"),
        ("attrition", "Attrition"),
        ("morale", "Morale"),
        ("skills", "Skills"),
        ("leadership", "Leadership"),
        ("attendance", "Attendance"),
        ("other", "Other"),
    ]

    division = models.ForeignKey(
        Divisions,
        on_delete=models.CASCADE,
        related_name="people_issues",
    )
    strategic_objective = models.ForeignKey(
        StrategicObjective,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="people_issues",
    )

    title = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="other")
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES, default="medium")
    affected_area = models.CharField(max_length=255, blank=True)
    impact = models.TextField(blank=True)

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="owned_people_issues",
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="open")
    due_date = models.DateField(null=True, blank=True)

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="created_people_issues",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.division} - {self.title}"

class DivisionPeopleIssueUpdate(models.Model):
    people_issue = models.ForeignKey(
        DivisionPeopleIssue,
        on_delete=models.CASCADE,
        related_name="updates",
    )
    comment = models.TextField()
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="people_issue_updates",
    )
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["updated_at", "id"]

    def __str__(self):
        return f"{self.people_issue.title} @ {self.updated_at:%Y-%m-%d %H:%M}"


class DivisionInitiative(models.Model):
    TYPE_CHOICES = [
        ("project", "Project"),
        ("initiative", "Initiative"),
        ("program", "Program"),
        ("other", "Other"),
    ]

    STATUS_CHOICES = [
        ("not_started", "Not Started"),
        ("on_track", "On Track"),
        ("at_risk", "At Risk"),
        ("delayed", "Delayed"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    division = models.ForeignKey(
        Divisions,
        on_delete=models.CASCADE,
        related_name="initiatives",
    )
    strategic_objective = models.ForeignKey(
        StrategicObjective,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="division_initiatives",
    )

    name = models.CharField(max_length=255)
    initiative_type = models.CharField(max_length=30, choices=TYPE_CHOICES, default="initiative")
    target = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="not_started")
    due_date = models.DateField(null=True, blank=True)

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="owned_division_initiatives",
    )

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="created_division_initiatives",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        unique_together = ("division", "name")

    def __str__(self):
        return f"{self.division} - {self.name}"

class DivisionInitiativeUpdate(models.Model):
    STATUS_CHOICES = DivisionInitiative.STATUS_CHOICES

    initiative = models.ForeignKey(
        DivisionInitiative,
        on_delete=models.CASCADE,
        related_name="updates",
    )
    actual = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    status_update = models.TextField(blank=True)

    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="initiative_updates",
    )
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["updated_at", "id"]

    def __str__(self):
        return f"{self.initiative.name} @ {self.updated_at:%Y-%m-%d %H:%M}"


class DivisionInitiativeIssue(models.Model):
    STATUS_CHOICES = [
        ("open", "Open"),
        ("in_progress", "In Progress"),
        ("resolved", "Resolved"),
        ("closed", "Closed"),
    ]

    initiative = models.ForeignKey(
        DivisionInitiative,
        on_delete=models.CASCADE,
        related_name="issues",
    )
    risk_issue = models.TextField()
    mitigation = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="open")

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="created_initiative_issues",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.initiative.name} issue"
    
class DivisionInitiativeIssueUpdate(models.Model):
    risk_issue=models.ForeignKey(DivisionInitiativeIssue,on_delete=models.CASCADE,related_name="updates")
    update_comment = models.TextField()
    updated_at=models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="initiative_issue_updates",
    )
    
    class Meta:
        ordering=["-updated_at"]
    
    def __str__(self):
        return f"{self.risk_issue.risk_issue} issue"