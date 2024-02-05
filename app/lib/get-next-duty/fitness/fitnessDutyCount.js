export default function fitnessDutyCount({ roster, doctorId, attendance, avgDutys }) {
    // +1 bzw. -1 für jede Abweichung (negativ ist besser)
    let dutyCount = 0;
    roster.days.forEach((day) => {
      const dutyColumns = Object.keys(day.dutyColumns);
      dutyColumns.forEach((dutyColumn) => {
        const duty = day.dutyColumns[dutyColumn];
        if (day.dutyColumns[dutyColumn].includes(doctorId)) {
          dutyCount += 1;
        }
      });
    });
    const correctedAvgDutys = avgDutys * (attendance * 0.6);
    const fitness = dutyCount - correctedAvgDutys;
    return fitness;
  }