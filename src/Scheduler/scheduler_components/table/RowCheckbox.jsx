import React, { useState } from "react";
import { Checkbox } from "@mui/material";
function RowCheckbox({ onRowSelect, dayIndex, daysActivity }) {
  const isRowSelected = daysActivity[dayIndex].isSelectedRowPeriod;
  const [checked, setChecked] = useState(isRowSelected);

  const handleCheckboxChange = (event) => {
    setChecked(!isRowSelected);
    onRowSelect(!checked, dayIndex);
  };

  return (
    <Checkbox
      size="small"
      style={{ padding: 5 }}
      checked={isRowSelected}
      onChange={handleCheckboxChange}
    />
  );
}

export default RowCheckbox;
