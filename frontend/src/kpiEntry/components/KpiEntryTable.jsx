import React from "react";
import { Stack } from "@mui/material";
import KpiEntryRow from "./KpiEntryRow";

const KpiEntryTable = ({ rows, onChange }) => {
  return (
    <Stack spacing={2}>
      {rows.map((row) => (
        <KpiEntryRow key={row.id} row={row} onChange={onChange} />
      ))}
    </Stack>
  );
};

export default KpiEntryTable;