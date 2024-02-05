export default function fitnessDutySpacing({ roster, duty, doctorId, avgDutySpacing }) {
    // wenn Abstand zu einem anderen Dienst < avg dann +1 für jeden Tag Abweichung und zusätzlich +5 bei kurzem Wechsel
    let fitness = 0;
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const dutyTimestamp = duty.date.getTime();
    roster.days.forEach((day) => {
      const dayTimestamp = day.date.getTime();
      const spacing = Math.abs(dayTimestamp - dutyTimestamp) / millisecondsPerDay;
      if (spacing > avgDutySpacing) return;
      const dutyColumns = Object.keys(day.dutyColumns);
      dutyColumns.forEach((dutyColumn) => {
        if (day.dutyColumns[dutyColumn].includes(doctorId)) {
          fitness = fitness + (avgDutySpacing - spacing);
          if (spacing === 2) {
            fitness += 5;
          }
        }
      });
    });
    return fitness;
  }