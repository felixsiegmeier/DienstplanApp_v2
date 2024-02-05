export default function getWorstDuties({ roster, count }) {
  const worstDuties = [];
  const badDuties = [];
  const doctorIds = roster.doctors.map((doc) => doc._id);

  class Doctor {
    constructor(id) {
      this._id = id;
      this.duties = [];
      this.points = 0;
    }
  }

  const doctorData = doctorIds.map((id) => new Doctor(id));
  roster.days.forEach((day) => {
    const dutyColumns = Object.keys(day.dutyColumns);
    dutyColumns.forEach((dutyColumn) => {
      day.dutyColumns[dutyColumn].forEach((doctorId) => {
        const index = doctorData.findIndex((doc) => doc._id === doctorId);
        doctorData[index].duties.push({ dutyColumn, date: day.date });
        doctorData[index].points += day.value;
      });
    });
  });

  // Prüfe, ob zwei Daten in 2 Tagen oder weniger liegen
  const checkShortSwitch = (a, b) => {
    const distance =
      Math.abs(a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24);
    return distance < 3;
  };

  // nimmt ein Array von Daten
  // Erstelle ein Array aller enthaltenen "schlechten" Wochenenden = kurze Wechsel & mehr als 3 im Monat
  const checkWeekends = (duties) => {
    const weekendDays = [5, 6, 0]; // Freitag, Samstag, Sonntag (0-basiert)
    const weekendDuties = duties.filter((duty) =>
      weekendDays.includes(duty.date.getDay()),
    );
    if (weekendDuties.length < 2) return [];
    if (weekendDuties.length > 3) return weekendDuties;
    const badWeekends = [];
    for (let i = 0; i < weekendDuties.length - 1; i++) {
      const distance =
        Math.abs(
          weekendDuties[i].date.getTime() - weekendDuties[i + 1].date.getTime(),
        ) /
        (1000 * 60 * 60 * 24);
      if (distance > 4 && distance < 9)
        badWeekends.push(weekendDuties[i], weekendDuties[i + 1]);
    }
    if (badWeekends.length < 2) return [];
    return badWeekends;
  };

  doctorData.forEach((doc) => {
    if (doc.duties.length > 6)
      badDuties.push(doc.duties[Math.floor(Math.random() * doc.duties.length)]);
    if (doc.points > 9)
      badDuties.push(doc.duties[Math.floor(Math.random() * doc.duties.length)]);

    const badWeekends = checkWeekends(doc.duties);
    const shortSwitchDays = [];

    for (let i = 0; i < doc.duties.length - 1; i++) {
      const shortSwitch = checkShortSwitch(
        doc.duties[i].date,
        doc.duties[i + 1].date,
      );
      if (shortSwitch) shortSwitchDays.push(doc.duties[i], doc.duties[i + 1]);
    }

    badDuties.push(...badWeekends, ...shortSwitchDays);
  });

  return badDuties;
}

// testing stuff
