const { countDuties } = require("./count-duties");

function evaluateDutyDistribution({roster, weight}) {
	// Initialisierung des Fitnesswertes auf 0
	let fitness = 0;
	const doctors = countDuties(roster)

	// Initialisierte ein Objekt mit allen Wochenenden des Monats
	const weekends = mapWeekends(roster);

	// Anzahl der Ärzte und Anzahl der Dienste sowie Wochenenden werden ermittelt
	const numberOfDutyColumns = Object.values(Object.values(roster)[0].dutyColumns).length
	const numDuties = Object.keys(roster).length * numberOfDutyColumns
	const numWeekends = Object.keys(weekends).length * numberOfDutyColumns
	// wenn ich hier nur die Anzahl der Wochenenden zähle dann macht es später keinen Unterscheid, ob jemand 3x an Ostern gearbeitet hat oder 1x am 1. Mai
	// da beides jeweils nur als 1 Wochenende gezählt wird. Das ist etwas suboptimal
	// Anmerkung 2: Allerdings sind dafür die Dienstpunkte da, um das zu balancen

	// Die gewünschte Anzahl von Diensten und Wochenenden pro Arzt wird berechnet
	// die 3 wird verwendet, da ein WE im durchschnitt 3 Tage hat (einzelne Feiertage werden somit über- und mehrer wie Ostern unterschätzt)
	const targetDutiesPerDoctor = numDuties / Object.keys(doctors).length;
	const targetWeekendsPerDoctor = numWeekends * 3 / Object.keys(doctors).length;

	// Summe der Abweichungen jedes Arztes von der gewünschten Anzahl von Diensten und Wochenenden
	let deviationSum = 0;
	let deviationWe = 0;
	let rowFactor = 0;

	// ########################## Hier weiter ##########################
	// iteriert über jedem Doctor und vergleicht mit den target-Werten
	for(const doctorId in doctors){
		const doctor = doctors[doctorId];

		// Dienstanzahl
		const dutyCount = doctor.duties.length;
		deviationSum += Math.pow(Math.abs(targetDutiesPerDoctor-dutyCount), 2);
		//console.log(`${targetDutiesPerDoctor} & ${dutyCount} & ${deviationSum}`);

		// Wochenendanzahl und Folgewochenenden
		let weekendCount = 0;
		let doctorWeekends = [];
		let weekendRows = 0;
		Object.values(weekends).forEach((weekend, index) => {
			if(weekend.some(day => doctor.duties.indexOf(day) >= 0)){
				weekendCount += 1;
				doctorWeekends.push(index)
			}
		})
		for(const weekend of doctorWeekends){
			if (doctorWeekends.includes(weekend+1)){
				weekendRows += 1
			}
		}
		rowFactor += Math.pow(2, weekendRows+1)
		deviationWe += Math.pow(Math.abs(targetWeekendsPerDoctor-weekendCount), 3)
		//console.log(`${targetWeekendsPerDoctor} & ${weekendCount} & ${deviationWe}`)
		// console.log(`${rowFactor} & ${doctor.weekends}`)
		
	 }
	console.log(`${deviationSum} & ${deviationWe} & ${Math.sqrt(rowFactor)}`)
	fitness += (deviationSum / Object.keys(doctors).length + deviationWe / Object.keys(doctors).length + Math.sqrt(rowFactor)/Object.keys(doctors).length);

	return Math.round(fitness * weight);
}

function mapWeekends(roster){
	const weekendDays = [5,6,7]
	const weekends = {}
	let weekendCounter = 0
	let lastDayWasWeekend = false

	Object.values(roster).forEach(date => {
		if(weekendDays.includes(date.weekday) || date.holiday || (roster[parseInt(date.date)+1] && (roster[parseInt(date.date)+1].holiday))){
			if(!lastDayWasWeekend){weekendCounter += 1}
			lastDayWasWeekend = true

			if(weekends[weekendCounter]){weekends[weekendCounter].push(parseInt(date.date))}
			if(!weekends[weekendCounter]){weekends[weekendCounter] = [parseInt(date.date)]}

			return
		}
		lastDayWasWeekend = false
	})
	return weekends
}

module.exports.evaluateDutyDistribution = evaluateDutyDistribution
