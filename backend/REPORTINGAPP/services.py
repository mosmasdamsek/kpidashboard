from django.utils import timezone
from ORGDATA.models import Divisions


def build_executive_dashboard(user, period="last_30_days", search=""):
    search = (search or "").strip().lower()

    division_qs = Divisions.objects.all()

    if search:
        division_qs = division_qs.filter(name__icontains=search)

    divisions = []
    for idx, division in enumerate(division_qs, start=1):
        division_name = getattr(division, "name", str(division))

        divisions.append(
            {
                "id": getattr(division, "id", idx),
                "name": division_name,
                "owner": "Division Head",
                "role": "Executive Lead",
                "score": 80 + (idx % 10),
                "wow": f"+{(idx % 6) + 1}.2%",
                "tone": "#14dba8",
                "metrics": [
                    {
                        "name": "Performance",
                        "value": f"{80 + (idx % 10)}%",
                        "change": "+2.4%",
                        "trend": [60, 64, 68, 72, 75, 78, 82],
                        "target": "85%",
                        "progress": 82,
                        "changeDir": "up",
                    },
                    {
                        "name": "Efficiency",
                        "value": "74%",
                        "change": "+1.8%",
                        "trend": [55, 59, 61, 66, 69, 72, 74],
                        "target": "80%",
                        "progress": 74,
                        "changeDir": "up",
                    },
                ],
                "scoreTrend": [72, 74, 76, 78, 80, 81, 82, 83, 84, 85, 86, 87],
                "summary": {
                    "wow": f"+{(idx % 6) + 1}.2%",
                    "bestKpi": "Performance",
                    "bestKpiChange": "+2.4%",
                    "needsFocus": "Efficiency",
                    "needsFocusChange": "+1.8%",
                },
            }
        )

    avg_score = round(
        sum(item["score"] for item in divisions) / len(divisions), 0
    ) if divisions else 0

    top_performer = max(divisions, key=lambda x: x["score"])["name"] if divisions else "N/A"

    return {
        "summary": {
            "organization_name": "Internal Portal",
            "period": period,
            "generated_at": timezone.now().isoformat(),
            "division_count": len(divisions),
            "average_score": avg_score,
            "top_performer": top_performer,
        },
        "top_stats": [
            {
                "title": "Visible Divisions",
                "value": len(divisions),
                "delta": "All divisions in view" if not search else "Filtered by search",
                "icon_key": "apartment",
            },
            {
                "title": "Average Score",
                "value": f"{int(avg_score)}%",
                "delta": "Across current view",
                "icon_key": "insights",
            },
            {
                "title": "Top Performer",
                "value": top_performer,
                "delta": "Highest scoring division",
                "icon_key": "emoji_events",
            },
            {
                "title": "Reporting Window",
                "value": period.replace("_", " ").title(),
                "delta": "Selected from header",
                "icon_key": "calendar_month",
            },
        ],
        "divisions": divisions,
        "trend_data": [
            {"week": "W1", "sales": 78, "marketing": 74, "product": 80},
            {"week": "W2", "sales": 81, "marketing": 76, "product": 82},
            {"week": "W3", "sales": 84, "marketing": 79, "product": 83},
            {"week": "W4", "sales": 85, "marketing": 80, "product": 84},
            {"week": "W5", "sales": 87, "marketing": 82, "product": 86},
            {"week": "W6", "sales": 88, "marketing": 83, "product": 87},
        ],
        "rankings": [],
        "matrix_data": [],
        "insight_cards": [],
        "revenue_segments": [],
        "goals": [],
        "highlights": [],
        "activities": [],
    }