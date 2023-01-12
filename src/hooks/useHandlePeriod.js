export default function useHandlePeriod() {
  function getPeriodCellsFromApi(json, tableRows) {
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
  return { getPeriodCellsFromApi };
}
