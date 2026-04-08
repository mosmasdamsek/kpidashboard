import React from "react";
import { Avatar, Box, CardContent, Stack, Typography } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import GlassCard from "../common/GlassCard";
import SectionHeader from "../common/SectionHeader";
import { line, panel2, softText, white } from "../../theme/dashboardTokens";

const ActivityFeed = ({ activities = [] }) => {
  return (
    <GlassCard>
      <CardContent sx={{ p: 3 }}>
        <SectionHeader
          title="Live Activity Feed"
          subtitle="Recent executive and division activity"
        />

        <Stack spacing={1.5} sx={{ mt: 2.5 }}>
          {activities.map((item) => (
            <Box
              key={item.actor + item.time}
              className="flex items-start gap-3 rounded-3xl px-3 py-3"
              sx={{ bgcolor: panel2, border: `1px solid ${line}` }}
            >
              <Avatar sx={{ width: 36, height: 36, bgcolor: item.color }}>
                {item.actor[0]}
              </Avatar>

              <Box className="min-w-0 flex-1">
                <Typography sx={{ fontSize: 12.8, lineHeight: 1.6 }}>
                  <Box component="span" sx={{ fontWeight: 800, color: white }}>
                    {item.actor}
                  </Box>
                  <Box component="span" sx={{ color: softText }}>
                    {" "}
                    {item.action}
                  </Box>
                </Typography>

                <Typography sx={{ fontSize: 11.5, color: softText, mt: 0.5 }}>
                  {item.time}
                </Typography>
              </Box>

              <MoreHoriz sx={{ color: softText }} />
            </Box>
          ))}
        </Stack>
      </CardContent>
    </GlassCard>
  );
};

export default ActivityFeed;