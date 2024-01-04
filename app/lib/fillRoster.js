
function getNextDuty(roster){
    const duty = {
        doctors: [],
        dutyColumn: null,
        date: null,
    }
    roster.days.forEach(day => {
        day.dutyColumns.forEach(dutyColumn => {
            const doctors = getDutyDoctors({rosterDoctors: roster.doctors, day, dutyColumn})
        if(doctors && doctors.length < duty.doctors.length){
            duty.doctors = doctors;
            duty.dutyColumn = dutyColumn;
            duty.date = day.date;
        }
        })
    })
    if(duty.doctors.length > 0)return sortedDuty(duty);
    return null;
}

function getDutyDoctors({rosterDoctors, day, dutyColumn}){
    if(day[dutyColumn].length > 0) return null;

    // Hier muss ich weiter programmieren => Es soll ein unsortiertes Array von Arzt-IDs ausgespuckt werden, die den Dienst machen können.
    // => Das sortieren passiert dann erst am Ende
}

function sortedDuty(duty){
    // sortiert die Ärzte in duty.doctors anhand ihrer Fitness
    return duty
}

export default function fillRoster(roster){
    console.log(roster)
/*
function backtrackAlgorithm(roster){
    // erhalte den Dienst, der am schlechtesten zu besetzen ist
    const nextDuty = getNextDuty(roster)
    
    // Ende wenn voll
    if(!nextDuty) return roster

    const {doctors, dutyColumn, date} = nextDuty

    for(const doctor_id of doctors){
        const rosterCopy = JSON.parse(JSON.stringify(roster)); // Kopie des Dienstplans erstellen
        assignDuty({roster: rosterCopy, dutyColumn, date, doctor_id});
        backtrackAlgorithm(rosterCopy);
        assignDuty({roster, dutyColumn, date, doctor_id: false});
    }
}

 */
}