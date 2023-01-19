import React from "react";
import TableCell from "@mui/material/TableCell";
import { tableColors } from "../../styling/tableColors";

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
    borderLeft: headCellBorder
      ? `1px solid ${tableColors.tableBorderColor}`
      : "none",
  };

  return (
    <TableCell sx={{ ...styling }} colSpan={cellColSpan}>
      {innerText}
    </TableCell>
  );
}
