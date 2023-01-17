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
} from "@mui/material/";
import { tableCellClasses } from "@mui/material/TableCell";
import { TablePageWrapper, TableWrapper } from "../custom/CustomComponents";
import RowCheckbox from "./RowCheckbox";
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
  const { getPeriodCells, postPeriodCells } = useHandlePeriod();
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

  function handleRowChange(isSelected, dayIndex) {
    const newDaysActivity = daysActivity.map((day, dayI) => {
      if (dayI === dayIndex) {
        return {
          day: day.day,
          isSelectedRowPeriod: isSelected,
          data: day.data.map((period) => {
            return {
              ...period,
              isSelectedCellPeriod: isSelected,
            };
          }),
        };
      }
      return day;
    });
    setDaysActivity(newDaysActivity);
  }

  function handleClearTable() {
    const newDaysActivity = daysActivity.map((day, dayI) => {
      return {
        day: day.day,
        isSelectedRowPeriod: false,
        data: day.data.map((period) => {
          return {
            ...period,
            isSelectedCellPeriod: false,
          };
        }),
      };
    });
    setDaysActivity(newDaysActivity);
  }

  function handleSaveTableChanges() {
    const test = postPeriodCells(daysActivity);
    console.log(test);
    //JSON returns here
  }

  function handleMousePressedSelection(dayIndex, cellIndex) {
    const newDaysActivity = daysActivity.map((day, dayI) => {
      if (dayI === dayIndex) {
        return {
          day: day.day,
          isSelectedRowPeriod: day.isSelectedRowPeriod,
          data: day.data.map((period, periodI) => {
            if (periodI >= cellIndex) {
              return {
                ...period,
                isSelectedCellPeriod: true,
              };
            } else return period;
          }),
        };
      } else return day;
    });

    setDaysActivity(newDaysActivity);
  }

  useEffect(() => {
    setDaysActivity(getPeriodCells(days_json, rows)); // eslint-disable-next-line
  }, []);

  return (
    <TablePageWrapper>
      {daysActivity.length === 0 ? (
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
                        <RowCheckbox
                          onRowSelect={handleRowChange}
                          dayIndex={dayIndex}
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
                          onMousePressed={handleMousePressedSelection}
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
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={handleClearTable}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={handleSaveTableChanges}
            >
              Save Changes
            </Button>
          </Stack>
        </TableWrapper>
      )}
    </TablePageWrapper>
  );
}
