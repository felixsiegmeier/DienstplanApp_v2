export default function fitnessWeekendSpacing({ roster, doctorId, duty }) {
    // +50 für jedes aufeinander folgende Wochenende wenn duty am Wochenende ist, +100 für 3er-Ketten, sonst +0
    const rosterDay = roster.days.find(
      (day) => day.date.getTime() === duty.date.getTime()
    );
    if (rosterDay.value === 1) return 0;
  
    let count = 0;
  
    const dutys = [duty.date];
    roster.days.forEach((day) => {
      const dutyColumns = Object.keys(day.dutyColumns);
      dutyColumns.forEach((dutyColumn) => {
        if (day.dutyColumns[dutyColumn].includes(doctorId) && day.value > 1) {
          dutys.push(day.date);
        }
      });
    });
  
    dutys.sort((a, b) => {
      const timestamp1 = a.getTime();
      const timestamp2 = b.getTime();
      return timestamp1 - timestamp2;
    });
  
    for (let i = 0; i < dutys.length - 1; i++) {
      if (
        dutys[i + 1].getTime() - dutys[i].getTime() > 4 * 24 * 60 * 60 * 1000 &&
        dutys[i + 1].getTime() - dutys[i].getTime() < 12 * 24 * 60 * 60 * 1000
      ) {
        count += 50;
        if (
          dutys[i + 2] &&
          dutys[i + 2].getTime() - dutys[i + 1].getTime() >
            4 * 24 * 60 * 60 * 1000 &&
          dutys[i + 2].getTime() - dutys[i + 1].getTime() <
            12 * 24 * 60 * 60 * 1000
        ) {
          count += 100;
        }
      }
    }
    const fitness = count;
    return fitness;
  }