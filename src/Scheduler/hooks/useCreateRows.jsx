import {
  periodTimeInMinuets,
  amountOfPeriods,
  daysName,
} from "../consts/tableConsts";

export default function useCreateRows() {
  const periodTime = periodTimeInMinuets;
  const periodAmount = amountOfPeriods;

  const days = daysName;

  function createDayPeriods(periodTime, amount) {
    const periods = [];
    for (let i = 0; i < amount; i++) {
      periods.push({
        cellMinutesPeriod: {
          bt: periodTime * i,
          et: periodTime * i + 59,
        },
        isSelectedCellPeriod: false,
      });
    }
    return periods;
  }

  function createRows(days, dayPeriods) {
    return days.map((dayName, dayIndex) => {
      return {
        day: dayName,
        isSelectedRowPeriod: false,
        data: dayPeriods,
      };
    });
  }

  const dayPeriods = createDayPeriods(periodTime, periodAmount);
  const rows = createRows(days, dayPeriods);
  return rows;
}
