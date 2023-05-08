function logDoctorsTable(doctors){
    const data = {}
    Object.keys(doctors).forEach(key => {
        data[key] = {
            ...doctors[key], 
            blacklist: doctors[key].blacklist.toString(), 
            greenlist: doctors[key].greenlist.toString(),
            duties: doctors[key].duties.toString(),
            weekends: doctors[key].weekends.length,
            points: doctors[key].points
        }
    })
    console.table(data, Object.keys(doctors[Object.keys(doctors)[0]]).slice(1))
}

function logRosterTable(roster){
    const dutyColumns = Object.keys(roster["1"].dutyColumns);
    const dates = Object.keys(roster);
    const table = [];
  
    for (const date of dates) {
      const row = { Date: roster[date].date };
      for (const column of dutyColumns) {
        const doctor = roster[date].dutyColumns[column].duty;
        row[column] = doctor ? doctor.name : "";
      }
      table.push(row);
    }
  
    console.table(table);
  }

function logSummaryTable(roster, dutyColumns){
    // doctorName, dutys, weekends, points
    console.log("unfinished")
}

module.exports.logDoctorsTable = logDoctorsTable
module.exports.logRosterTable = logRosterTable
module.exports.logSummaryTable = logSummaryTable