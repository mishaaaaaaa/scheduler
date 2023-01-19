import React from "react";
import TableCell from "@mui/material/TableCell";
import { tableColors } from "../../styling/tableColors";
function TableBodyTitleCell({ children }) {
  const styling = {
    border: `1px solid ${tableColors.tableBorderColor}`,
  };
  return (
    <TableCell align="center" sx={{ ...styling }}>
      {children}
    </TableCell>
  );
}

export default TableBodyTitleCell;
