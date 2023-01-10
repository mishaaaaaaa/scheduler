import React from "react";
import TableCell from "@mui/material/TableCell";

function TableBodyCell({ borderColor }) {
  const bodyCellStyle = {
    padding: "30px 10px",
    border: `1px solid ${borderColor}`,
  };
  return <TableCell sx={bodyCellStyle}></TableCell>;
}

export default TableBodyCell;
