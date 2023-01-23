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
import TableHeadDaysCell from "./scheduler_components/table/TableHeadDaysCell";
import fakeFetchDays from "./consts/fakeFetchDays.json";
import TableBodyTitleCell from "./scheduler_components/table/TableBodyTitleCell";
import TableButtonGroup from "./scheduler_components/TableButtonGroup";
import useCreateRows from "./hooks/useCreateRows";
import useHandleJsonPeriods from "./hooks/useHandleJsonPeriods";
import SchedulerTable from "./scheduler_components/SchedulerTable";
import Loader from "./scheduler_components/Loader";

export default function Scheduler() {
  const [daysActivity, setDaysActivity] = useState([]);
  const rows = useCreateRows();
  const { getPeriodCells, postPeriodCells } = useHandleJsonPeriods();
  const [loading, setLoading] = useState(false);

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

  function handleAllDaysSelect(isSelected) {
    const newDaysActivity = daysActivity.map((day) => {
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
    // TODO: here must be some fetch logic to post picked variants to server
  }

  useEffect(() => {
    // fetch call simulation
    setLoading(true);
    setTimeout(() => {
      setDaysActivity(getPeriodCells(fakeFetchDays, rows));
      setLoading(false);
    }, 1100);

    // eslint-disable-next-line
  }, []);

  return (
    <TablePageWrapper>
      {loading ? (
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
                <TableHeadDaysCell
                  cellPadding={0}
                  innerText="All day"
                  onAllDaysSelect={handleAllDaysSelect}
                />
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
                        daysActivity={daysActivity}
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
