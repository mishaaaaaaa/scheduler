import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableWrapper } from "../custom/CustomComponents";
import { headPeriod, bodyFakeData } from "../consts/fakeData";
import TableHeadCell from "./TableHeadCell";
import TableBodyCell from "./TableBodyCell";

function createData(day, isSelected, data) {
  return { day, isSelected, data };
}

const rows = [
  createData("MO", false, bodyFakeData),
  createData("TU", false, bodyFakeData),
  createData("WE", false, bodyFakeData),
  createData("TH", false, bodyFakeData),
  createData("FR", false, bodyFakeData),
  createData("SA", false, bodyFakeData),
  createData("SU", false, bodyFakeData),
];

export default function DenseTable() {
  return (
    <TableWrapper>
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
          <TableHead sx={{ border: "2px solid red" }}>
            <TableRow>
              <TableCell width="100" align="left" colSpan={1}></TableCell>
              <TableCell width="100" align="left" colSpan={1}></TableCell>
              {headPeriod.map((period, i) => (
                <TableHeadCell key={i} period={period} />
              ))}
            </TableRow>
            <TableRow>
              <TableCell width="100" colSpan={1}></TableCell>
              <TableCell width="100" sx={{ padding: 0 }} colSpan={1}>
                All Day
              </TableCell>
              {headPeriod.map((period, i) => (
                <TableHeadCell key={i} styling={{ borderLeft: 1 }} />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              return (
                <TableRow key={i}>
                  <TableCell sx={{ border: "1px solid green" }} />
                  <TableCell sx={{ border: "1px solid green" }} />
                  {row.data.map((cell, cellIndex) => (
                    <TableBodyCell key={cellIndex} />
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </TableWrapper>
  );
}
