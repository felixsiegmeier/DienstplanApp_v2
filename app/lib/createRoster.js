export default async function createRoster({ name, month, year, config }) {
  const roster = {
    name: name,
    year: year,
    month: month,
    userGroupId: config._id,
    doctors: {},
    roster: {},
    visible: false,
    wishesAllowed: true
  };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const response = await fetch(
    `https://feiertage-api.de/api/?jahr=${year}&nur_land=MV`
  );
  const holidays = await response.json();

  for (let day = 1; day <= daysInMonth; day++) {
    roster.roster[day] = {
      date: new Date(year, month, day),
      isHoliday: Object.values(holidays).some(
        (h) =>
          h.datum ===
          `${year}-${(month + 1).toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`
      ),
      dutyColumns: {},
    };

    for (const dutyColumn of config.dutyColumns) {
      roster.roster[day].dutyColumns[dutyColumn.name] = [];
    }
  }

  return roster;
}
