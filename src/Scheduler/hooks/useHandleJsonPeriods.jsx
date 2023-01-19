export default function useHandleJsonPeriods() {
  function getPeriodCells(json, tableRows) {
    function jsonToArray(json) {
      let daysArr = [];

      for (let i in json) {
        daysArr.push({ day: i, period: json[i] });
      }
      return daysArr;
    }

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

          indexOfMarkedPeriods.push({
            markedPeriodIndexs: startEndPeriodsIndex,
          });
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
    const daysFromJson = jsonToArray(json);

    const indexOfMarkedPeriods = getIndexOfMarkedPeriods(
      daysFromJson,
      tableRows
    );

    const markCellPeriod = markCellWithPeriod(indexOfMarkedPeriods, tableRows);
    return markCellPeriod;
  }

  function postPeriodCells(daysPeriod) {
    function extractDaysPeriods(daysPeriod) {
      const daysArray = [];
      for (let day of daysPeriod) {
        let dayName = day.day;
        let dayData = day.data;
        let periods = [];
        let start = null;
        let finish = null;

        let open = false;
        for (let slot of dayData) {
          if (open) {
            if (slot.isSelectedCellPeriod) {
              finish = slot.cellMinutesPeriod.et;
              if (dayData.indexOf(slot) === dayData.length - 1) {
                periods.push({
                  bt: start,
                  et: finish,
                });
              }
            } else {
              open = false;
              periods.push({
                bt: start,
                et: finish,
              });
            }
          } else {
            if (slot.isSelectedCellPeriod) {
              start = slot.cellMinutesPeriod.bt;
              finish = slot.cellMinutesPeriod.et;
              open = true;
            }
          }
        }
        daysArray.push([dayName, periods]);
      }
      return daysArray;
    }

    function refactorPeriodsToJson(daysPeriod) {
      const daysPeriodsToJson = Object.fromEntries(daysPeriod);
      return JSON.stringify(daysPeriodsToJson);
    }
    const daysArray = extractDaysPeriods(daysPeriod);
    const daysPeriodsJson = refactorPeriodsToJson(daysArray);

    return daysPeriodsJson;
  }

  return { getPeriodCells, postPeriodCells };
}
