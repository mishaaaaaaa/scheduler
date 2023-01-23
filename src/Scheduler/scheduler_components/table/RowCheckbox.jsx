import React from "react";
import { Checkbox } from "@mui/material";
function RowCheckbox({ onRowSelect, dayIndex, daysActivity }) {
  const isRowSelected = daysActivity[dayIndex].isSelectedRowPeriod;

  return (
    <Checkbox
      size="small"
      style={{ padding: 5 }}
      checked={isRowSelected}
      onChange={() => onRowSelect(!isRowSelected, dayIndex)}
    />
  );
}

export default RowCheckbox;
