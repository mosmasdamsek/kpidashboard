from decimal import Decimal
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from ORGDATA.models import Divisions, Departments
from STRATEGYMANAGEMENT.models import Strategy, StrategicObjective
from REPORTINGAPP.models import (
    ReportingPeriod,
    DepartmentSubmission,
    ExecutiveReview,
    DivisionKPI,
    DivisionKPIActual,
    DivisionPeopleIssue,
    DivisionPeopleIssueUpdate,
    DivisionInitiative,
    DivisionInitiativeUpdate,
    DivisionInitiativeIssue,
    DivisionInitiativeIssueUpdate,
)

User = get_user_model()


class Command(BaseCommand):
    help = "Seed reporting data"

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding data...")

        user = User.objects.first()
        if not user:
            self.stdout.write(self.style.ERROR("Create a user first"))
            return

        strategy, _ = Strategy.objects.get_or_create(
            name="Unleash 2025",
            start_date="2020-04-01",
            end_date="2025-03-31",
        )

        objective, _ = StrategicObjective.objects.get_or_create(
            strategy=strategy,
            objective="Improve internal process automation",
            perspective="Financial",
        )

        division, _ = Divisions.objects.get_or_create(
            name="Corporate Services Division"
        )

        dept1, _ = Departments.objects.get_or_create(name="Human Resources")
        dept1.division = division
        dept1.save()

        dept2, _ = Departments.objects.get_or_create(name="Finance")
        dept2.division = division
        dept2.save()

        period, _ = ReportingPeriod.objects.get_or_create(
            name="Q1 2026",
            defaults={
                "start_date": "2026-01-01",
                "end_date": "2026-03-31",
                "is_active": True,
                "created_by": user,
            }
        )

        ExecutiveReview.objects.get_or_create(
            reporting_period=period,
            division=division,
            executive=user,
            defaults={
                "status": "completed",
                "score": Decimal("88.00"),
                "comments": "Overall performance is strong",
            }
        )

        DepartmentSubmission.objects.get_or_create(
            reporting_period=period,
            department=dept1,
            defaults={
                "submitted_by": user,
                "status": "reviewed",
                "score": Decimal("86.00"),
                "comments": "People operations stable, recruitment pressure remains.",
            }
        )

        DepartmentSubmission.objects.get_or_create(
            reporting_period=period,
            department=dept2,
            defaults={
                "submitted_by": user,
                "status": "submitted",
                "score": Decimal("90.00"),
                "comments": "Finance controls stable, ERP dependency remains.",
            }
        )

        kpi, _ = DivisionKPI.objects.get_or_create(
            division=division,
            name="Revenue",
            defaults={
                "strategic_objective": objective,
                "kpi_type": "financial",
                "target": Decimal("8000000"),
                "unit": "BWP",
                "created_by": user,
            }
        )

        DivisionKPIActual.objects.get_or_create(
            kpi=kpi,
            actual=Decimal("7450000"),
            comments="March update",
            defaults={"updated_by": user},
        )

        issue, _ = DivisionPeopleIssue.objects.get_or_create(
            division=division,
            title="Critical vacancy in Finance",
            defaults={
                "strategic_objective": objective,
                "category": "capacity",
                "severity": "high",
                "owner": user,
                "status": "open",
                "created_by": user,
            }
        )

        DivisionPeopleIssueUpdate.objects.get_or_create(
            people_issue=issue,
            comment="Recruitment in progress",
            defaults={"updated_by": user},
        )

        initiative, _ = DivisionInitiative.objects.get_or_create(
            division=division,
            name="ERP Rollout",
            defaults={
                "strategic_objective": objective,
                "initiative_type": "project",
                "target": "Deploy ERP",
                "status": "on_track",
                "owner": user,
                "created_by": user,
            }
        )

        DivisionInitiativeUpdate.objects.get_or_create(
            initiative=initiative,
            actual="UAT ongoing",
            status="on_track",
            status_update="Waiting vendor input",
            defaults={"updated_by": user},
        )

        issue2, _ = DivisionInitiativeIssue.objects.get_or_create(
            initiative=initiative,
            risk_issue="Vendor delay",
            defaults={
                "status": "open",
                "created_by": user,
            }
        )

        DivisionInitiativeIssueUpdate.objects.get_or_create(
            risk_issue=issue2,
            update_comment="Escalated",
            defaults={"updated_by": user},
        )

        self.stdout.write(self.style.SUCCESS("Seeding complete."))