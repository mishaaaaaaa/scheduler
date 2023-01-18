import React from "react";
import TableCell from "@mui/material/TableCell";

import { grey } from "@mui/material/colors";

const tableGray = grey[300];
export default function TableHeadCell({
  cellColSpan,
  cellPadding,
  headCellBorder,
  innerText,
}) {
  const styling = {
    width: 50,
    align: "left",
    padding: cellPadding,
    borderLeft: headCellBorder ? `1px solid ${tableGray}` : "none",
  };

  return (
    <TableCell sx={{ ...styling }} colSpan={cellColSpan}>
      {innerText}
    </TableCell>
  );
}
