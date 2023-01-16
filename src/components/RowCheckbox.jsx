import React, { useState } from "react";
import { Checkbox } from "@mui/material";
function RowCheckbox({ onRowSelect, dayIndex }) {
  const [checked, setChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
    onRowSelect(!checked, dayIndex);
  };

  return (
    <Checkbox
      size="small"
      style={{ padding: 5 }}
      checked={checked}
      onChange={handleCheckboxChange}
    />
  );
}

export default RowCheckbox;
