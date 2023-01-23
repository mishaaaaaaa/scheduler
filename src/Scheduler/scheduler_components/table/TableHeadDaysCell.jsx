import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import { tableColors } from "../../styling/tableColors";

export default function TableHeadCell({
  cellColSpan,
  cellPadding,
  headCellBorder,
  innerText,
  onAllDaysSelect,
}) {
  const [isSelected, setIsSelected] = useState(false);
  const styling = {
    width: 50,
    align: "left",
    padding: cellPadding,
    borderLeft: headCellBorder
      ? `1px solid ${tableColors.tableBorderColor}`
      : "none",
    color: isSelected
      ? `${tableColors.textColorHover} `
      : `${tableColors.textColor} `,
    bgcolor: isSelected ? `${tableColors.cellOnclickBgcolor} ` : "none",
    "&:hover": {
      cursor: "pointer",
      bgcolor: `${tableColors.cellHoverBgcolor} `,
      color: `${tableColors.textColorHover} `,
    },
    userSelect: "none",
  };

  const handleCheckboxChange = () => {
    setIsSelected((state) => !state);
    onAllDaysSelect(!isSelected);
  };

  return (
    <TableCell
      sx={{ ...styling }}
      colSpan={cellColSpan}
      onClick={handleCheckboxChange}
      align="center"
    >
      {innerText}
    </TableCell>
  );
}
