import React from "react";
import TableCell from "@mui/material/TableCell";
function TableBodyTitleCell({ children }) {
  const styling = {
    border: "1px solid grey",
  };
  return (
    <TableCell align="center" sx={{ ...styling }}>
      {children}
    </TableCell>
  );
}

export default TableBodyTitleCell;
