from django.contrib import admin
from .models import (
    ReportingPeriod,
    DepartmentSubmission,
    SupervisorReview,
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
from ORGDATA.models import Departments,Divisions

admin.site.register(Departments)
admin.site.register(Divisions)
admin.site.register(ReportingPeriod)
admin.site.register(DepartmentSubmission)
admin.site.register(SupervisorReview)
admin.site.register(ExecutiveReview)
admin.site.register(DivisionKPI)
admin.site.register(DivisionKPIActual)
admin.site.register(DivisionPeopleIssue)
admin.site.register(DivisionPeopleIssueUpdate)
admin.site.register(DivisionInitiative)
admin.site.register(DivisionInitiativeUpdate)
admin.site.register(DivisionInitiativeIssue)
admin.site.register(DivisionInitiativeIssueUpdate)