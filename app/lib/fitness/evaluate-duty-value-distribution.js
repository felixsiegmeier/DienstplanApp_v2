const { countDuties } = require("./count-duties");

function evaluateDutyValueDistribution({roster, weight}){
	let fitness = 0

	const doctors = countDuties(roster)
    
	let points = 0

	for(doctor in doctors){
		points += doctors[doctor].points
	}

	const targetPoints = points/Object.keys(doctors).length

	for(doctor in doctors){
		fitness += Math.abs(targetPoints - doctors[doctor].points)
	}

	return Math.round(fitness*weight)
}

module.exports.evaluateDutyValueDistribution = evaluateDutyValueDistribution