import * as React from "react";
import { useState, useEffect } from "react";
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
  CircularProgress,
  Checkbox,
} from "@mui/material/";
import { tableCellClasses } from "@mui/material/TableCell";
import { TablePageWrapper, TableWrapper } from "../custom/CustomComponents";
import { headPeriod, bodyFakeData } from "../consts/fakeData";
import TableHeadCell from "./TableHeadCell";
import TableBodyCell from "./TableBodyCell";
import { grey } from "@mui/material/colors";
import days_json from "../consts/days.json";
import useHandlePeriod from "../hooks/useHandlePeriod";

function createData(day, isSelectedRowPeriod, data) {
  return { day, isSelectedRowPeriod, data };
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

export default function Scheduler() {
  const [daysActivity, setDaysActivity] = useState([]);
  const { getPeriodCellsFromApi } = useHandlePeriod();
  const tableGray = grey[300];

  function handleCellClick(dayIndex, cellIndex) {
    const newDaysActivity = daysActivity.map((day, dayI) => {
      if (dayI === dayIndex) {
        return {
          day: day.day,
          isSelectedRowPeriod: day.isSelectedRowPeriod,
          data: day.data.map((period, periodI) => {
            if (periodI === cellIndex) {
              return {
                ...period,
                isSelectedCellPeriod: !period.isSelectedCellPeriod,
              };
            } else {
              return period;
            }
          }),
        };
      } else {
        return day;
      }
    });

    setDaysActivity(newDaysActivity);
  }

  function handleRowChange(dayIndex) {
    const newDaysActivity = daysActivity.map((day, dayI) => {
      if (dayI === dayIndex) {
        if (day.isSelectedRowPeriod) {
          return {
            day: day.day,
            isSelectedRowPeriod: false,
            data: day.data.map((period, periodI) => {
              return {
                ...period,
                isSelectedCellPeriod: false,
              };
            }),
          };
        } else {
          return {
            day: day.day,
            isSelectedRowPeriod: true,
            data: day.data.map((period, periodI) => {
              return {
                ...period,
                isSelectedCellPeriod: false,
              };
            }),
          };
        }
      } else return day;
    });

    // setDaysActivity(newDaysActivity);
    console.log(newDaysActivity);
  }

  useEffect(() => {
    setDaysActivity(getPeriodCellsFromApi(days_json, rows));
  }, []);

  return (
    <TablePageWrapper>
      {daysActivity.length == 0 ? (
        <CircularProgress size={"130px"} />
      ) : (
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
                {daysActivity.map((day, dayIndex) => {
                  return (
                    <TableRow key={dayIndex}>
                      <TableCell
                        sx={{ border: `1px solid ${tableGray}` }}
                        align="center"
                      >
                        {day.day}
                      </TableCell>
                      <TableCell sx={{ border: `1px solid ${tableGray}` }}>
                        <Checkbox
                          size="small"
                          style={{ padding: 5 }}
                          onChange={() => handleRowChange(dayIndex)}
                        />
                      </TableCell>
                      {day.data.map((period, periodIndex) => (
                        <TableBodyCell
                          key={periodIndex}
                          borderColor={tableGray}
                          isSelected={period.isSelectedCellPeriod}
                          dayIndex={dayIndex}
                          cellIndex={periodIndex}
                          onCellClick={handleCellClick}
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
      )}
    </TablePageWrapper>
  );
}
