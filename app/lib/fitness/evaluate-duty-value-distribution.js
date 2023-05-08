const { countDuties } = require("./count-duties");

function evaluateDutyValueDistribution({roster, weight}){
	let fitness = 0

	const doctors = countDuties(roster)
    
	let points = 0

	Object.keys(doctors).forEach(doctor => {
		points += doctors[doctor].points
	})

	const targetPoints = points/Object.keys(doctors).length

	Object.keys(doctors).forEach(doctor => {
		fitness += Math.abs(targetPoints - doctors[doctor].points)
	})

	return Math.round(fitness*weight)
}

module.exports.evaluateDutyValueDistribution = evaluateDutyValueDistribution