import React from "react";
import { Table, TableContainer, Paper } from "@mui/material/";
import { tableCellClasses } from "@mui/material/TableCell";
function SchedulerTable({ children }) {
  return (
    <TableContainer component={Paper}>
      <Table
        size="large"
        aria-label="a dense table"
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
          },
        }}
      >
        {children}
      </Table>
    </TableContainer>
  );
}

export default SchedulerTable;
