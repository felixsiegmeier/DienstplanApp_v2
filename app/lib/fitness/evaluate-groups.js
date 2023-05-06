function evaluateGroups({roster, groups, weight}){
	let fitness = 0

	for(day in roster){
		// erstellt ein Objekt mit allen Gruppen als counter
		const groupsCounter = {Ohne: 0}
		for(group of groups){
			groupsCounter[group.name] = 0
		}

		// zählt die Gruppen
		for(dutyColumn in roster[day].dutyColumns){
			if(roster[day].dutyColumns[dutyColumn]?.duty?.groups){
				for(group of roster[day].dutyColumns[dutyColumn].duty.groups){
					groupsCounter[group] += 1
				}
			}
		}

		// prüft, ob der Wochentag der Gruppen-Limitation unterliegt. Wenn ja prüft, ob die maximale Anzahl überschritten ist
		for(group of groups){
			if(!group?.exclusion?.includes(roster[day].date) && groupsCounter[group.name] > group.maximum){
				fitness += 1
			}
		}
	}

	//console.log("Fitness clinics: "+fitness)
	 return Math.round(fitness*weight)
}

module.exports.evaluateGroups = evaluateGroups