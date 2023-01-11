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
import days_json from "../consts/days.json";

function createData(day, isSelectedRowPeriod, data) {
  return { day, isSelectedRowPeriod, data };
}

function jsonToArray(json) {
  let daysArr = [];

  for (let i in json) {
    daysArr.push({ day: i, period: json[i] });
  }
  return daysArr;
}

const daysFromJson = jsonToArray(days_json);

function markCellOnPeriod(daysJson, rows) {
  let res = [];
  for (let i = 0; i < daysJson.length; i++) {
    const daysPeriodJson = daysJson[i];
    const daysPeriodRows = rows[i];
    if (daysPeriodJson.period.length > 0) {
      const startEndPeriodsIndex = daysPeriodJson.period.map((el) => {
        let indexOfStartPeiod = daysPeriodRows.data.findIndex((cell) => {
          return cell.cellMinutesPeriod.bt === el.bt;
        });
        let indexOfEndPeiod = daysPeriodRows.data.findIndex((cell) => {
          return cell.cellMinutesPeriod.et === el.et;
        });
        return {
          indexOfStartPeiod,
          indexOfEndPeiod,
        };
      });

      res.push({ periodPairs: startEndPeriodsIndex, weekIndex: i });
    } else {
      res.push({ peroidPairs: 0, dayIndex: i });
    }
  }
  return res;
}

const rows = [
  createData("mo", false, bodyFakeData),
  createData("tu", false, bodyFakeData),
  createData("we", false, bodyFakeData),
  createData("th", false, bodyFakeData),
  createData("fr", false, bodyFakeData),
  createData("sa", false, bodyFakeData),
  createData("su", false, bodyFakeData),
];

const test = markCellOnPeriod(daysFromJson, rows);

function markCellWithPeriod(week, rows) {
  const markedCells = week.map((day, dayIndex) => {
    let dayPeriod;
    const periodPairs = day.periodPairs;
    if (periodPairs !== 0) {
    }
  });
}

console.log(test);

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
