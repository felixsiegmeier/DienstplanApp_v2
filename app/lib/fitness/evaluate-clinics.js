function evaluateClinics({roster, rosterKeys, weight}){
	let fitness = 0
	const clinics = new Set()

	rosterKeys.forEach(date => {
		clinics.add(roster[date].emdep.clinic)
		clinics.add(roster[date].house.clinic)
		clinics.add(roster[date].imc.clinic)
		if (clinics.size === 1){fitness += weight}
		clinics.clear()
	})

	//console.log("Fitness clinics: "+fitness)
	 return Math.round(fitness)
}

module.exports.evaluateClinics = evaluateClinics