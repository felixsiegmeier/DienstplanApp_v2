// Gibt ein Objekt aller doctors zurück, welches die Punkte, Dienste und Wochenenden bereits gezählt enthält
/* 
{
    id: 'eed9542e56',
    name: 'Schwarz',
    blacklist: [
        1,  4,  5,  6,  9,
        11, 14, 16, 19, 26
    ],
    greenlist: [ 20, 23, 28 ],
    groups: [ 'Rhythmologie' ],
    imc: false,
    dutyColumns: [ 'Hausdienst' ],
    duties: [],
    weekends: [],
    points: 0
}
*/

function countDuties(roster){

    const doctors = {};

	for (const day of Object.values(roster)) {
	  for (const dutyColumn of Object.values(day.dutyColumns)) {
		if (dutyColumn.duty) {

            if(!doctors[dutyColumn.duty.id]){
                doctors[dutyColumn.duty.id] = dutyColumn.duty;
            };

            doctors[dutyColumn.duty.id].duties.push(day.date);
            const points = getDutyPoints(roster, day.date);
            doctors[dutyColumn.duty.id].points += points;
            (points > 1) && doctors[dutyColumn.duty.id].weekends.push(day.date);
		};
	  };
	};
    return doctors
}

function getDutyPoints(roster, date){
    let points = 1;
    if (roster[date].weekday === 5 || roster[date].weekday === 6 || roster[date].weekday === 7) { 
        points += 1;
    };
    
    if (roster[date].weekday === 6) {
        points += 1;
    };
    
    if (roster[date].holiday && !(roster[date].weekday === 7)) {
        points += 1;
    };
    
    if (roster[parseInt(date) + 1] && roster[parseInt(date) + 1].holiday && !(roster[date].weekday === 5)) {
        points += 1;
    };
    
    if (points > 3) {
        points = 3;
    };
    
    return points;
};

module.exports.countDuties = countDuties;