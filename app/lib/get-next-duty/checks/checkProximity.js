export default function checkProximity({ doctor, day, roster }) {
    const previousDay = new Date(day.date);
    previousDay.setDate(day.date.getDate() - 1);
    const nextDay = new Date(day.date);
    nextDay.setDate(day.date.getDate() + 1);
    const dates = [day.date, previousDay, nextDay];
  
    const proximalDutiesDoctorIds = [];
  
    dates.forEach((date) => {
      const checkDay = roster.days.find(
        (cDay) => cDay.date.getTime() === date.getTime()
      );
      if (!checkDay) {
        return;
      }
      Object.keys(checkDay.dutyColumns).forEach((dutyColumn) => {
        proximalDutiesDoctorIds.push(...checkDay.dutyColumns[dutyColumn]);
      });
    });
    return proximalDutiesDoctorIds.includes(doctor._id);
  };