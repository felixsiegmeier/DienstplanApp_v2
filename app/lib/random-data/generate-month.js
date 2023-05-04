async function generateMonth(settings) {
	const month = settings.month.month;
	const year = settings.month.year;
	const dutyColumns = {};
	settings.dutyColumns.forEach(col => {
		dutyColumns[col.name] = {}
	  	dutyColumns[col.name]["duty"] = false;
	  	dutyColumns[col.name]["autoAssignment"] = col.autoAssignment;
	});
	const roster = {};
	const response = await fetch(`https://feiertage-api.de/api/?jahr=${year}&nur_land=MV`);
	const holidays = await response.json();
	for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
	  const date = new Date(year, month - 1, i);
	  const weekday = date.getDay() === 0 ? 7 : date.getDay();
	  const holiday = Object.values(holidays).some(h => h.datum === `${year}-${month.toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`);
	  roster[i] = {
		date: i,
		weekday: weekday,
		holiday: holiday,
		dutyColumns: dutyColumns
	  };
	}
	return roster;
  }

module.exports.generateMonth = generateMonth