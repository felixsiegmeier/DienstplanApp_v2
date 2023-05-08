function evaluateGroups({roster, groups, weight}){
	let fitness = 0

	Object.keys(roster).forEach(day => {
		// erstellt ein Objekt mit allen Gruppen als counter
		const groupsCounter = {Ohne: 0}
		Object.keys(groups).forEach(group => {
			groupsCounter[group.name] = 0
		})

		// zählt die Gruppen
		Object.keys(roster[day].dutyColumns).forEach(dutyColumn => {
			if(roster[day].dutyColumns[dutyColumn]?.duty?.groups){
				Object.keys(roster[day].dutyColumns[dutyColumn].duty.groups).forEach(group => {
					groupsCounter[group] += 1
				})
			}
		})

		// prüft, ob der Wochentag der Gruppen-Limitation unterliegt. Wenn ja prüft, ob die maximale Anzahl überschritten ist
		Object.keys(groups).forEach(group => {
			if(!group?.exclusion?.includes(roster[day].date) && groupsCounter[group.name] > group.maximum){
				fitness += 1
			}
		})
	})

	//console.log("Fitness clinics: "+fitness)
	 return Math.round(fitness*weight)
}

module.exports.evaluateGroups = evaluateGroups