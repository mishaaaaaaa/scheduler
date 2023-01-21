import * as React from "react";
import { useState, useEffect } from "react";
import { TableBody, TableHead, TableRow } from "@mui/material/";
import {
  TablePageWrapper,
  TableWrapper,
} from "./scheduler_components/wrappers";
import RowCheckbox from "./scheduler_components/table/RowCheckbox";
import { tableHeadCellsPeriods } from "./consts/tableConsts";
import TableHeadCell from "./scheduler_components/table/TableHeadCell";
import TableBodyCell from "./scheduler_components/table/TableBodyCell";
import fakeFetchDays from "./consts/fakeFetchDays.json";
import useHandleJsonPeriods from "./hooks/useHandleJsonPeriods";
import TableBodyTitleCell from "./scheduler_components/table/TableBodyTitleCell";
import TableButtonGroup from "./scheduler_components/TableButtonGroup";
import useCreateRows from "./hooks/useCreateRows";
import SchedulerTable from "./scheduler_components/SchedulerTable";
import Loader from "./scheduler_components/Loader";

export default function Scheduler() {
  // const [daysActivity, setDaysActivity] = useState(() => {
  //   const days = localStorage.getItem("daysActivity");
  //   return days === undefined ? [] : JSON.parse(days);
  // });

  const [daysActivity, setDaysActivity] = useState([]);
  const rows = useCreateRows();
  const { getPeriodCells, postPeriodCells } = useHandleJsonPeriods();

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

  function handleClearTable() {
    const newDaysActivity = daysActivity.map((day) => {
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
    //TODO: here must be some fetch logic to post picked variants to server
  }

  useEffect(() => {
    // if (typeof localStorage.getItem("daysActivity") === "undefined") {

    //  } // eslint-disable-next-line
    setDaysActivity(getPeriodCells(fakeFetchDays, rows));
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("daysActivity", JSON.stringify(daysActivity));
  // }, [daysActivity]);

  return (
    <TablePageWrapper>
      {daysActivity.length === 0 ? (
        <Loader />
      ) : (
        <TableWrapper>
          <h2>Set Schedule</h2>
          <SchedulerTable>
            <TableHead>
              <TableRow>
                <TableHeadCell></TableHeadCell>
                <TableHeadCell></TableHeadCell>
                {tableHeadCellsPeriods.map((period, i) => (
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
                {tableHeadCellsPeriods.map((period) => (
                  <TableHeadCell key={period} cellColSpan={3} headCellBorder />
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
          </SchedulerTable>
          <TableButtonGroup
            clearTable={handleClearTable}
            saveChanges={handleSaveTableChanges}
          />
        </TableWrapper>
      )}
    </TablePageWrapper>
  );
}
