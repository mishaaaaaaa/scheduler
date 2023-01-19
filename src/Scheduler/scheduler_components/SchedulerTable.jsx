import React from "react";
import { TableWrapper } from "./wrappers";
import { Table, TableContainer, Paper } from "@mui/material/";
function SchedulerTable({ children }) {
  return (
    <TableWrapper>
      <h1>Set Schedule</h1>
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
    </TableWrapper>
  );
}

export default SchedulerTable;
