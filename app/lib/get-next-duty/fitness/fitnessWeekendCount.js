export default function fitnessWeekendCount({ roster, doctorId, duty }) {
    // +3n^2 für jedes Wochenende wenn duty am Wochenende ist, sonst +0
    const weekendDays = [5, 6, 0]; // Freitag, Samstag, Sonntag (0-basiert)
    if (!weekendDays.includes(duty.date.getDay())) return 0;
    const weekendDutys = [duty.date];
    roster.days.forEach((day) => {
      const dutyColumns = Object.keys(day.dutyColumns);
      dutyColumns.forEach((dutyColumn) => {
        if (
          weekendDays.includes(day.date.getDay()) &&
          day.dutyColumns[dutyColumn].includes(doctorId)
        ) {
          weekendDutys.push(day.date);
        }
      });
    });
  
    weekendDutys.sort((a, b) => {
      const timestamp1 = a.getTime();
      const timestamp2 = b.getTime();
      return timestamp1 - timestamp2;
    });
  
    const fitness = 3 * countWeekends(weekendDutys);
    return fitness ** 2;
  }

  function countWeekends(dates) {
    const uniqueMonths = new Set(dates.map((date) => date.getMonth()));
    let count = 0;
  
    uniqueMonths.forEach((month) => {
      const monthDates = dates.filter((date) => date.getMonth() === month);
      const weekendsInMonth = groupDatesByWeekend(monthDates);
      count += weekendsInMonth.size;
    });
  
    return count;
  }


function groupDatesByWeekend(dates) {
  const weekendDays = [5, 6, 0]; // Freitag, Samstag, Sonntag (0-basiert)
  const weekends = new Map();

  dates.forEach((date) => {
    const dayOfWeek = date.getDay();
    if (weekendDays.includes(dayOfWeek)) {
      const key = date.toISOString().slice(0, 10); // Datum als Schlüssel
      if (!weekends.has(key)) {
        weekends.set(key, []);
      }
      weekends.get(key).push(date);
    }
  });

  return weekends;
}