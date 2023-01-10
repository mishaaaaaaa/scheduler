import React from "react";
import TableCell from "@mui/material/TableCell";
export default function TableHeadCell({ period, styling }) {
  return (
    <TableCell
      width="100"
      align="left"
      sx={{ padding: 0, ...styling }}
      colSpan={3}
    >
      {period}
    </TableCell>
  );
}

//сделать поверх хеда еще один хед сел и каждые три обьеденить в одну
//на верхнем хеде убрать бордеры и добавить надписи
