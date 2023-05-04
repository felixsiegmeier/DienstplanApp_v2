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
    const data = {}
    Object.keys(roster).forEach(key => {
        data[key] = {
            ...roster[key],
            emdep: roster[key].emdep.name?roster[key].emdep.name:false,
            house: roster[key].house.name?roster[key].house.name:false,
            imc: roster[key].imc.name?roster[key].imc.name:false,
        }
    })
    console.table(data, Object.keys(roster[Object.keys(roster)[0]]).slice(1))
}

function logSummaryTable(roster, dutyColumns){
    // doctorName, dutys, weekends, points
    console.log("unfinished")
}

module.exports.logDoctorsTable = logDoctorsTable
module.exports.logRosterTable = logRosterTable
module.exports.logSummaryTable = logSummaryTable