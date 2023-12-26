import Roster from "../models/Roster";
import RosterDay from "../models/RosterDay";

export default async function createRoster({ name, month, year, config }) {
  console.log("creating roster")
  const roster = new Roster({
    name: name,
    year: year,
    month: month,
    userGroupId: config._id,
  });

  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getDate();
  const response = await fetch(
    `https://feiertage-api.de/api/?jahr=${year}&nur_land=MV`
  );
  const holidays = await response.json();

  for (let day = 1; day <= daysInMonth; day++) {
    const rosterDayData = {
      date: new Date(Date.UTC(year, month, day)),
      holiday: Object.values(holidays).some(
        (h) =>
          h.datum ===
          `${year}-${(month + 1).toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`
      ),
      dutyColumns: {},
    };

    for (const dutyColumn of config.dutyColumns) {
      rosterDayData.dutyColumns[dutyColumn.name] = [];
    }

    roster.days.push(new RosterDay(rosterDayData));
  }

  // Berechne das Attribut "value" für jeden Tag
  roster.days.forEach((rosterDay, index) => {
    let value = 1;

    // Überprüfe, ob der aktuelle Tag ein Samstag, Sonntag oder Feiertag ist
    if (rosterDay.holiday || rosterDay.date.getDay() === 0 || rosterDay.date.getDay() === 6) {
      value++;
    }

    // Überprüfe, ob der nachfolgende Tag ein Samstag, Sonntag oder Feiertag ist
    if (index < roster.days.length - 1) {
      const nextDay = roster.days[index + 1];
      if (nextDay.holiday || nextDay.date.getDay() === 0 || nextDay.date.getDay() === 6) {
        value++;
      }
    }

    // Begrenze den Wert auf mindestens 1 und maximal 3
    rosterDay.value = Math.max(1, Math.min(3, value));
  });

  return roster;
}