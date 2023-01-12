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

function getIndexOfMarkedPeriods(daysJson, rows) {
  function range(min, max) {
    let len = max - min + 1;
    let arr = new Array(len);
    for (let i = 0; i < len; i++) {
      arr[i] = min + i;
    }
    return arr;
  }

  const indexOfMarkedPeriods = [];

  for (let i = 0; i < daysJson.length; i++) {
    const daysPeriodJson = daysJson[i];
    const daysPeriodRows = rows[i];
    if (daysPeriodJson.period.length > 0) {
      const startEndPeriodsIndex = daysPeriodJson.period.map((el) => {
        let indexOfStartPeriod = daysPeriodRows.data.findIndex((cell) => {
          return cell.cellMinutesPeriod.bt === el.bt;
        });
        let indexOfEndPeriod = daysPeriodRows.data.findIndex((cell) => {
          return cell.cellMinutesPeriod.et === el.et;
        });
        return range(indexOfStartPeriod, indexOfEndPeriod);
      });

      indexOfMarkedPeriods.push({ markedPeriodIndexs: startEndPeriodsIndex });
    } else {
      indexOfMarkedPeriods.push({ markedPeriodIndexs: [-1] });
    }
  }

  return indexOfMarkedPeriods.map((day) => {
    return {
      markedPeriodIndexs: day.markedPeriodIndexs.flat(),
    };
  });
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

const indexOfMarkedPeriods = getIndexOfMarkedPeriods(daysFromJson, rows);

function markCellWithPeriod(week, rows) {
  return rows.map((day, dayIndex) => {
    return {
      day: day.day,
      isSelectedRowPeriod: day.isSelectedRowPeriod,
      data: day.data.map((dayPeriod, dayPeriodIndex) => {
        if (
          week[dayIndex].markedPeriodIndexs.some(
            (periodI) => periodI === dayPeriodIndex
          )
        ) {
          return {
            ...dayPeriod,
            isSelectedCellPeriod: true,
          };
        } else return dayPeriod;
      }),
    };
  });
}

const markCellPeriod = markCellWithPeriod(indexOfMarkedPeriods, rows);

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
              {markCellPeriod.map((day, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell
                      sx={{ border: `1px solid ${tableGray}` }}
                      align="center"
                    >
                      {day.day}
                    </TableCell>
                    <TableCell sx={{ border: `1px solid ${tableGray}` }} />
                    {day.data.map((period, periodIndex) => (
                      <TableBodyCell
                        key={periodIndex}
                        borderColor={tableGray}
                        isSelected={period.isSelectedCellPeriod}
                      />
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
