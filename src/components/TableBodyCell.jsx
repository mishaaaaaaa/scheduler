import React from "react";
import TableCell from "@mui/material/TableCell";

function TableBodyCell({
  borderColor,
  isSelected,
  onCellClick,
  dayIndex,
  cellIndex,
  onMousePressed,
}) {
  const bodyCellStyle = {
    padding: "30px 10px",
    border: `1px solid ${borderColor}`,
    bgcolor: isSelected ? "grey" : "none",
    "&:hover": {
      cursor: "pointer",
      bgcolor: "lightgrey",
    },
    userSelect: "none",
  };

  function handleMousePressed(btnCode) {
    if (btnCode === 1) {
      onMousePressed(dayIndex, cellIndex);
    }
  }

  return (
    <TableCell
      sx={bodyCellStyle}
      onClick={() => onCellClick(dayIndex, cellIndex)}
      onMouseOver={(event) => {
        event.preventDefault();
        handleMousePressed(event.buttons);
      }}
    ></TableCell>
  );
}

export default TableBodyCell;
