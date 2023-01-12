import React from "react";
import TableCell from "@mui/material/TableCell";

function TableBodyCell({ borderColor, isSelected }) {
  const bodyCellStyle = {
    padding: "30px 10px",
    border: `1px solid ${borderColor}`,
    bgcolor: isSelected ? "grey" : "none",
  };
  return (
    <TableCell sx={bodyCellStyle}>
      <div>{isSelected}</div>
    </TableCell>
  );
}

export default TableBodyCell;
