export default function useHandlePeriod() {
  function getPeriodCells(json, tableRows) {
    function jsonToArray(json) {
      //преобразовуем полученный json в массив
      let daysArr = [];

      for (let i in json) {
        daysArr.push({ day: i, period: json[i] });
      }
      return daysArr;
    }

    function getIndexOfMarkedPeriods(daysJson, rows) {
      //по каждому дню получаем массив индексов периодов с активность
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

    //возвращаем массив дней; каждый день имеет массив, состоящий из 24 периодов; каждый период - это обьект, который в зависимоти оттого выбран ли он имеет соответсвующее поле isSelectedCellPeriod;
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
    console.log(daysPeriod);
    // const findStartEndValue = daysPeriod.map((day) => {
    //   if(day.isSelectedRowPeriod){
    //     return {
    //       day:day.day,
    //       period:{
    //         bt:0,
    //         et: 1439
    //       }

    //     }
    //   } return {
    //     day: day.day,
    //     periods: day.data.map((periodCell, periodCellIndex) => {
    //       if (periodCell.isSelectedCellPeriod) {
    //         if(periodCellIndex === 0 && day.data[periodCellIndex + 1].isSelectedCellPeriod === false){
    //             return {
    //               bt: periodCell.cellMinutesPeriod.bt,
    //               et: periodCell.cellMinutesPeriod.et
    //             }
    //         } else if(periodCellIndex === 0 && day.data[periodCellIndex + 1].isSelectedCellPeriod === true){
    //             return {
    //               bt: periodCell.cellMinutesPeriod.bt,
    //             }

    //         }else if(day.data[periodCellIndex - 1].isSelectedCellPeriod === false &&day.data[periodCellIndex - 1].isSelectedCellPeriod === false){}
    //         else if(day.data[periodCellIndex - 1].isSelectedCellPeriod === false){
    //           return {
    //             bt: periodCell.cellMinutesPeriod.bt,
    //           }
    //         } else if(day.data[periodCellIndex - 1].isSelectedCellPeriod === false){

    //         }
    //       } else return null
    //     }),
    //   };
    // });
    // return findStartEndValue;
  }

  return { getPeriodCells, postPeriodCells };
}
