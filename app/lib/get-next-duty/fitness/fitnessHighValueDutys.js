export default function fitnessHighValueDutys({ roster, doctorId, avgHighValueDays }) {
    // 2 * (+1 bzw. -1 für jede Abweichung) (negativ ist besser)
    let dutyCount = 0;
    roster.days.forEach((day) => {
      const dutyColumns = Object.keys(day.dutyColumns);
      dutyColumns.forEach((dutyColumn) => {
        const duty = day.dutyColumns[dutyColumn];
        if (day.dutyColumns[dutyColumn].includes(doctorId) && day.value > 1) {
          dutyCount += 1;
        }
      });
    });
    const fitness = 2 * (dutyCount - avgHighValueDays);
    return fitness;
  }