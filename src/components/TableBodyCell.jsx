import React from "react";
import TableCell from "@mui/material/TableCell";

function TableBodyCell({
  borderColor,
  isSelected,
  onCellClick,
  dayIndex,
  cellIndex,
}) {
  const bodyCellStyle = {
    padding: "30px 10px",
    border: `1px solid ${borderColor}`,
    bgcolor: isSelected ? "grey" : "none",
    "&:hover": {
      cursor: "pointer",
      bgcolor: "lightgrey",
    },
  };
  return (
    <TableCell
      sx={bodyCellStyle}
      onClick={() => onCellClick(dayIndex, cellIndex)}
    ></TableCell>
  );
}

export default TableBodyCell;
