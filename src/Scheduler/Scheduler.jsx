import * as React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material/";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  TablePageWrapper,
  TableWrapper,
} from "./scheduler_components/wrappers";
import RowCheckbox from "./scheduler_components/table/RowCheckbox";
import { headPeriod } from "./consts/fakeData";
import TableHeadCell from "./scheduler_components/table/TableHeadCell";
import TableBodyCell from "./scheduler_components/table/TableBodyCell";
import days_json from "./consts/days.json";
import useHandlePeriod from "./hooks/useHandlePeriod";
import TableBodyTitleCell from "./scheduler_components/table/TableBodyTitleCell";
import TableButtonGroup from "./scheduler_components/TableButtonGroup";
import useCreateRows from "./hooks/useCreateRows";

export default function Scheduler() {
  const [daysActivity, setDaysActivity] = useState(() => {
    const days = localStorage.getItem("daysActivity");
    return days === undefined ? [] : JSON.parse(days);
  });
  const { getPeriodCells, postPeriodCells } = useHandlePeriod();
  const rows = useCreateRows();

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
    const pickedDaysActivityJSON = postPeriodCells(daysActivity);
    console.log(pickedDaysActivityJSON);
    // here will be some fetch logic to post picked variants to server
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
    if (typeof localStorage.getItem("daysActivity") === "undefined") {
      setDaysActivity(getPeriodCells(days_json, rows)); // eslint-disable-next-line
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("daysActivity", JSON.stringify(daysActivity));
  }, [daysActivity]);

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
                  <TableHeadCell></TableHeadCell>
                  <TableHeadCell></TableHeadCell>
                  {headPeriod.map((period, i) => (
                    <TableHeadCell
                      key={i}
                      innerText={period}
                      cellColSpan={3}
                      cellPadding={0}
                    />
                  ))}
                </TableRow>
                <TableRow>
                  <TableHeadCell></TableHeadCell>
                  <TableHeadCell cellPadding={0} innerText="All day" />
                  {headPeriod.map((period) => (
                    <TableHeadCell
                      key={period}
                      cellColSpan={3}
                      headCellBorder
                    />
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {daysActivity.map((day, dayIndex) => {
                  return (
                    <TableRow key={dayIndex}>
                      <TableBodyTitleCell>{day.day}</TableBodyTitleCell>
                      <TableBodyTitleCell>
                        <RowCheckbox
                          onRowSelect={handleRowChange}
                          dayIndex={dayIndex}
                        />
                      </TableBodyTitleCell>
                      {day.data.map((period, periodIndex) => (
                        <TableBodyCell
                          key={periodIndex}
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
          <TableButtonGroup
            clearTable={handleClearTable}
            saveChanges={handleSaveTableChanges}
          />
        </TableWrapper>
      )}
    </TablePageWrapper>
  );
}
