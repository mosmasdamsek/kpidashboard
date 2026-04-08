import React from "react";
import { Box } from "@mui/material";
import DivisionCard from "./DivisionCard";

const DivisionsOverview = ({ divisions = [], onOpenDivision }) => {
  return (
    <Box className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
      {divisions.map((division) => (
        <DivisionCard
          key={division.id || division.name}
          division={division}
          onOpen={onOpenDivision}
        />
      ))}
    </Box>
  );
};

export default DivisionsOverview;