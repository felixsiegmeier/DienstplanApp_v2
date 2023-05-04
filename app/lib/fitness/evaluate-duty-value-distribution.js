function evaluateDutyValueDistribution({roster, rosterKeys, weight, doctors, doctorKeys}){
	let fitness = 0
    
    // Anzahl der Ärzte wird berechnet
	const numDoctors = doctorKeys.length;
	// Summe aller Punkte aller Ärzte wird berechnet
	const numPoints = doctorKeys.reduce((sum, id) => {
		return sum + doctors[id].points
	}, 0);
	// Zielanzahl an Punkten pro Arzt wird berechnet
	const targetPointsPerDoctor = numPoints / numDoctors;

	// Die Summe der Abweichungen der Punkte jedes Arztes vom Zielwert wird berechnet
	const deviationSum = doctorKeys.reduce((sum, id) => {
		const deviation = doctors[id].points - targetPointsPerDoctor;
	    // Die Abweichung wird quadriert und zur Summe hinzugefügt
		return sum + (Math.abs(deviation)*Math.abs(deviation)*Math.abs(deviation));
	}, 0);

	// Die Abweichungssumme wird durch die Anzahl der Ärzte geteilt und zur Fitness hinzugefügt
	fitness += deviationSum/numDoctors
	//console.log("Fitness duty points distribution: "+(fitness*weight))

	// Die Fitness wird mit dem gegebenen Gewicht multipliziert und zurückgegeben
	return Math.round(fitness*weight)
}

module.exports.evaluateDutyValueDistribution = evaluateDutyValueDistribution