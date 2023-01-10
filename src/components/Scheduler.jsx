import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
} from "@mui/material/";
import { tableCellClasses } from "@mui/material/TableCell";
import { TableWrapper } from "../custom/CustomComponents";
import { headPeriod, bodyFakeData } from "../consts/fakeData";
import TableHeadCell from "./TableHeadCell";
import TableBodyCell from "./TableBodyCell";
import { grey } from "@mui/material/colors";

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
  const tableGray = grey[300];
  return (
    <>
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
            <TableHead>
              <TableRow>
                <TableCell width="50" align="left" colSpan={1}></TableCell>
                <TableCell width="35" align="left" colSpan={1}></TableCell>
                {headPeriod.map((period, i) => (
                  <TableHeadCell key={i} period={period} />
                ))}
              </TableRow>
              <TableRow>
                <TableCell width="50" colSpan={1}></TableCell>
                <TableCell width="35" sx={{ padding: 0 }} colSpan={1}>
                  All Day
                </TableCell>
                {headPeriod.map((period, i) => (
                  <TableHeadCell
                    key={i}
                    styling={{ borderLeft: 1, borderColor: `${tableGray}` }}
                  />
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell
                      sx={{ border: `1px solid ${tableGray}` }}
                      align="center"
                    >
                      {row.day}
                    </TableCell>
                    <TableCell sx={{ border: `1px solid ${tableGray}` }} />
                    {row.data.map((cell, cellIndex) => (
                      <TableBodyCell key={cellIndex} borderColor={tableGray} />
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack
          spacing={2}
          direction="row"
          sx={{ position: "absolute", right: 0 }}
          mt={3}
        >
          <Button variant="contained" color="success" size="large">
            Clear
          </Button>
          <Button variant="contained" size="large">
            Save Changes
          </Button>
        </Stack>
      </TableWrapper>
    </>
  );
}
