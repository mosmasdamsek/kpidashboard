import React from "react";
import { Box } from "@mui/material";
import StatCard from "./StatCard";

const StatsGrid = ({ items = [] }) => {
  return (
    <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {items.map((item) => (
        <StatCard key={item.title} item={item} />
      ))}
    </Box>
  );
};

export default StatsGrid;