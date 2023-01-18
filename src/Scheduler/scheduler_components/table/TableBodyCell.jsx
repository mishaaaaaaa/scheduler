import React from "react";
import TableCell from "@mui/material/TableCell";
import { grey } from "@mui/material/colors";

const tableGray = grey[300];

function TableBodyCell({
  isSelected,
  onCellClick,
  dayIndex,
  cellIndex,
  onMousePressed,
  children,
}) {
  const bodyCellStyle = {
    padding: "30px 10px",
    border: `1px solid ${tableGray}`,
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
      align="center"
      sx={bodyCellStyle}
      onClick={() => onCellClick(dayIndex, cellIndex)}
      onMouseOver={(event) => {
        event.preventDefault();
        handleMousePressed(event.buttons);
      }}
    >
      {children}
    </TableCell>
  );
}

export default TableBodyCell;
