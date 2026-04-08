import React, { useMemo, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";

import RiskDashboardHero from "../../components/riskregister/dashboard/RiskDashboardHero";
import RiskDashboardFilters from "../../components/riskregister/dashboard/RiskDashboardFilters";
import RiskKpiCards from "../../components/riskregister/dashboard/RiskKpiCards";
import RiskOverviewCharts from "../../components/riskregister/dashboard/RiskOverviewCharts";
import RiskHeatmapCard from "../../components/riskregister/dashboard/RiskHeatmapCard";
import CriticalRisksTableCard from "../../components/riskregister/dashboard/CriticalRisksTableCard";
import OverdueActionsTableCard from "../../components/riskregister/dashboard/OverdueActionsTableCard";

import { mockRiskItems, mockActionItems, currentReportingPeriod } from "../../data/riskregister/mockRiskDashboard";
import {
  filterRiskItems,
  filterActionItems,
  buildSummaryFromRisks,
  buildCategoryChart,
  buildDivisionChart,
  buildTrendChart,
  buildHeatmap,
  buildCriticalRisks,
  buildOverdueActions,
} from "../../utils/riskregister/mockRiskSelectors";

const RiskDashboardPage = () => {
  const [filters, setFilters] = useState({
    reporting_period: "current",
    department: "all",
    category: "all",
    owner: "all",
  });

  const derivedData = useMemo(() => {
    const filteredRisks = filterRiskItems(
      mockRiskItems,
      filters,
      currentReportingPeriod
    );

    const filteredActions = filterActionItems(
      mockActionItems,
      filters,
      currentReportingPeriod
    );

    return {
      summary: buildSummaryFromRisks(filteredRisks, filteredActions),
      byCategory: buildCategoryChart(filteredRisks),
      byDivision: buildDivisionChart(filteredRisks),
      trend: buildTrendChart(filteredRisks),
      heatmap: buildHeatmap(filteredRisks),
      criticalRisks: buildCriticalRisks(filteredRisks),
      overdueActions: buildOverdueActions(filteredActions),
    };
  }, [filters]);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Stack spacing={3}>
        <RiskDashboardHero filters={filters} />
        <RiskDashboardFilters filters={filters} onChange={setFilters} />

        <RiskKpiCards filters={filters} mockData={derivedData.summary} />

        <RiskOverviewCharts
          filters={filters}
          mockCategoryData={derivedData.byCategory}
          mockDivisionData={derivedData.byDivision}
          mockTrendData={derivedData.trend}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} lg={5}>
            <RiskHeatmapCard filters={filters} mockData={derivedData.heatmap} />
          </Grid>

          <Grid item xs={12} lg={7}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CriticalRisksTableCard
                  filters={filters}
                  mockData={derivedData.criticalRisks}
                />
              </Grid>
              <Grid item xs={12}>
                <OverdueActionsTableCard
                  filters={filters}
                  mockData={derivedData.overdueActions}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default RiskDashboardPage;


// import React, { useMemo, useState } from "react";

// import { Box, Grid, Stack } from "@mui/material";

// import RiskDashboardHero from "../../components/riskregister/dashboard/RiskDashboardHero";
// import RiskKpiCards from "../../components/riskregister/dashboard/RiskKpiCards";
// import RiskOverviewCharts from "../../components/riskregister/dashboard/RiskOverviewCharts";
// import RiskHeatmapCard from "../../components/riskregister/dashboard/RiskHeatmapCard";
// import CriticalRisksTableCard from "../../components/riskregister/dashboard/CriticalRisksTableCard";
// import OverdueActionsTableCard from "../../components/riskregister/dashboard/OverdueActionsTableCard";

// const RiskDashboardPage = () => {
//   const [filters] = useState({
//     reporting_period: "current",
//     department: "",
//     category: "",
//     owner: "",
//   });

//   const queryParams = useMemo(() => {
//     const cleaned = {};
//     Object.entries(filters).forEach(([key, value]) => {
//       if (value !== "" && value !== null && value !== undefined) {
//         cleaned[key] = value;
//       }
//     });
//     return cleaned;
//   }, [filters]);

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 } }}>
//       <Stack spacing={3}>
//         <RiskDashboardHero filters={filters} />
//         <RiskKpiCards filters={queryParams} />
//         <RiskOverviewCharts filters={queryParams} />

//         <Grid container spacing={3}>
//           <Grid item xs={12} lg={5}>
//             <RiskHeatmapCard filters={queryParams} />
//           </Grid>

//           <Grid item xs={12} lg={7}>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <CriticalRisksTableCard filters={queryParams} />
//               </Grid>
//               <Grid item xs={12}>
//                 <OverdueActionsTableCard filters={queryParams} />
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Stack>
//     </Box>
//   );
// };

// export default RiskDashboardPage;