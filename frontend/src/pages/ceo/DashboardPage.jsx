import React, { useMemo } from "react";
import { Box, Button, CardContent, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import TopHeader from "../../components/dashboard/TopHeader";
import HeroBanner from "../../components/dashboard/HeroBanner";
import StatsGrid from "../../components/dashboard/StatsGrid";
import DivisionsOverview from "../../components/dashboard/DivisionsOverview";
import TrendsPanel from "../../components/dashboard/TrendsPanel";
import RankingsPanel from "../../components/dashboard/RankingsPanel";
import MatrixPanel from "../../components/dashboard/MatrixPanel";
import InsightsPanel from "../../components/dashboard/InsightsPanel";
import RevenuePanel from "../../components/dashboard/RevenuePanel";
import GoalsPanel from "../../components/dashboard/GoalsPanel";
import HighlightsPanel from "../../components/dashboard/HighlightsPanel";
import ActivityFeed from "../../components/dashboard/ActivityFeed";
import DivisionModal from "../../components/dashboard/DivisionModal";
import GlassCard from "../../components/common/GlassCard";
import SectionHeader from "../../components/common/SectionHeader";

import { bg, softText, white } from "../../theme/dashboardTokens";
import { useGetExecutiveDashboardQuery } from "../../services/dashboardApi";

import {
  selectDashboardPeriod,
  selectDashboardSearchQuery,
  selectSelectedDivision,
  makeSelectFilteredDivisions,
  makeSelectFilteredRankings,
  makeSelectFilteredInsights,
  makeSelectFilteredHighlights,
  makeSelectFilteredActivities,
  makeSelectFilteredGoals,
  makeSelectFilteredRevenueSegments,
  makeSelectFilteredMatrixData,
  makeSelectDashboardSummary,
} from "../../features/executiveDashboard/executiveDashboardSelectors";

import {
  clearSelectedDivision,
  setSelectedDivision,
} from "../../features/executiveDashboard/executiveDashboardSlice"

import {
  Apartment,
  Insights,
  EmojiEvents,
  CalendarMonth,
} from "@mui/icons-material";

import { USE_MOCK } from "../../config/appConfig";
import { executiveDashboardMock } from "../../data/executiveDashboardMock";

import StartPresentationDialog from "../../components/dashboard/StartPresentationDialog";
import ExcoPresentationDialog from "../../components/dashboard/ExcoPresentationDialog";

const statIconMap = {
  apartment: <Apartment />,
  insights: <Insights />,
  emoji_events: <EmojiEvents />,
  calendar_month: <CalendarMonth />,
};

const DashboardPage = () => {
  const dispatch = useDispatch();

  const selectedDivision = useSelector(selectSelectedDivision);
  const period = useSelector(selectDashboardPeriod);
  const searchQuery = useSelector(selectDashboardSearchQuery);

  const [openLaunchPresentation, setOpenLaunchPresentation] = React.useState(false);
  const [openPresentationMode, setOpenPresentationMode] = React.useState(false);

  const {data: apiData,isLoading, error, } = useGetExecutiveDashboardQuery(
    { period, search: searchQuery },
    { skip: USE_MOCK } // 🔥 THIS IS THE KEY
  );

  const data = USE_MOCK ? executiveDashboardMock : apiData;

  const normalizedData = USE_MOCK
  ? {
      divisions: data.divisions,
      trend_data: data.trendData,
      rankings: data.rankings,
      matrix_data: data.matrixData,
      insight_cards: data.insightCards,
      revenue_segments: data.revenueSegments,
      goals: data.goals,
      highlights: data.highlights,
      activities: data.activities,
      top_stats: data.topStats.map((item) => ({
        ...item,
        icon_key: "insights", // fallback for now
      })),
    }
  : data;

  const divisions = normalizedData?.divisions || [];
  const trendData = normalizedData?.trend_data || [];
  const rankings = normalizedData?.rankings || [];
  const matrixData = normalizedData?.matrix_data || [];
  const insightCards = normalizedData?.insight_cards || [];
  const revenueSegments = normalizedData?.revenue_segments || [];
  const goals = normalizedData?.goals || [];
  const highlights = normalizedData?.highlights || [];
  const activities = normalizedData?.activities || [];
  const topStats = (normalizedData?.top_stats || []).map((item) => ({
    ...item,
    icon: statIconMap[item.icon_key] || <Insights />,
  }));

  const selectFilteredDivisions = useMemo(makeSelectFilteredDivisions, []);
  const selectFilteredRankings = useMemo(makeSelectFilteredRankings, []);
  const selectFilteredInsights = useMemo(makeSelectFilteredInsights, []);
  const selectFilteredHighlights = useMemo(makeSelectFilteredHighlights, []);
  const selectFilteredActivities = useMemo(makeSelectFilteredActivities, []);
  const selectFilteredGoals = useMemo(makeSelectFilteredGoals, []);
  const selectFilteredRevenueSegments = useMemo(makeSelectFilteredRevenueSegments, []);
  const selectFilteredMatrixData = useMemo(makeSelectFilteredMatrixData, []);
  const selectDashboardSummary = useMemo(makeSelectDashboardSummary, []);

  const filteredDivisions = useSelector((state) =>
    selectFilteredDivisions(state, divisions)
  );

  const filteredRankings = useSelector((state) =>
    selectFilteredRankings(state, rankings)
  );

  const filteredInsights = useSelector((state) =>
    selectFilteredInsights(state, insightCards)
  );

  const filteredHighlights = useSelector((state) =>
    selectFilteredHighlights(state, highlights)
  );

  const filteredActivities = useSelector((state) =>
    selectFilteredActivities(state, activities)
  );

  const filteredGoals = useSelector((state) =>
    selectFilteredGoals(state, goals)
  );

  const filteredRevenueSegments = useSelector((state) =>
    selectFilteredRevenueSegments(state, revenueSegments)
  );

  const filteredMatrixData = useSelector((state) =>
    selectFilteredMatrixData(state, matrixData)
  );

  const dashboardSummary = useSelector((state) =>
    selectDashboardSummary(state, divisions)
  );

  if (!USE_MOCK && isLoading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: bg }}>
        <TopHeader />
        <Box sx={{ px: { xs: 2, md: 3, xl: 4 }, py: 5 }}>
          <Typography sx={{ color: white, fontSize: 18, fontWeight: 700 }}>
            Loading dashboard...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!USE_MOCK && error) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: bg }}>
        <TopHeader />
        <Box sx={{ px: { xs: 2, md: 3, xl: 4 }, py: 5 }}>
          <Typography sx={{ color: white, fontSize: 18, fontWeight: 700 }}>
            Failed to load dashboard data.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: bg }}>
      <TopHeader />

      <Box sx={{ px: { xs: 2, md: 3, xl: 4 }, py: 3.25 }}>
        <Stack spacing={3}>
          <HeroBanner 
            summary={dashboardSummary} 
            onStartPresentation={() => setOpenLaunchPresentation(true)}
          />
          <StatsGrid items={topStats} />

          <GlassCard>
            <CardContent sx={{ p: 3 }}>
              <SectionHeader
                title="Divisional Overview"
                subtitle={`${filteredDivisions.length} divisions · Average score ${dashboardSummary.avgScore}% · Ranked by latest performance`}
                action={
                  <Button
                    sx={{
                      textTransform: "none",
                      color: softText,
                      fontWeight: 700,
                    }}
                  >
                    Manage View
                  </Button>
                }
              />

              <DivisionsOverview
                divisions={filteredDivisions}
                onOpenDivision={(division) =>
                  dispatch(setSelectedDivision(division))
                }
              />
            </CardContent>
          </GlassCard>

          <Box className="grid grid-cols-1 gap-4 xl:grid-cols-[1.25fr_0.75fr]">
            <TrendsPanel data={trendData} period={period} />
            <RankingsPanel items={filteredRankings} />
          </Box>

          <Box className="grid grid-cols-1 gap-4 xl:grid-cols-[0.8fr_1.2fr]">
            <MatrixPanel items={filteredMatrixData} />
            <InsightsPanel items={filteredInsights} />
          </Box>

          <Box className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <RevenuePanel segments={filteredRevenueSegments} />
            <GoalsPanel goals={filteredGoals} />
            <HighlightsPanel highlights={filteredHighlights} />
          </Box>

          <ActivityFeed activities={filteredActivities} />
        </Stack>
      </Box>

      <DivisionModal
        division={selectedDivision}
        open={Boolean(selectedDivision)}
        onClose={() => dispatch(clearSelectedDivision())}
      />

      <StartPresentationDialog
        open={openLaunchPresentation}
        onClose={() => setOpenLaunchPresentation(false)}
        onStart={() => {
          setOpenLaunchPresentation(false);
          setOpenPresentationMode(true);
        }}
      />

      <ExcoPresentationDialog
        open={openPresentationMode}
        onClose={() => setOpenPresentationMode(false)}
      />
    </Box>
  );
};

export default DashboardPage;