// Diese Funktion berechnet die Fitness der Dienstpläne für die Ärzte, indem sie die Abstände zwischen aufeinanderfolgenden Diensten 
// jedes Arztes in einem Dienstplan vergleicht.

function evaluateSpacing({roster, weight}){
	let fitness = 0
	const duties = {}

	Object.values(roster).forEach(day => {
		Object.values(day.dutyColumns).forEach(dutyColumn => {
			if(dutyColumn.duty){
				duties[dutyColumn.duty.id] = [...(duties[dutyColumn.duty.id] ?? []), day.date]
			}
		})
	})

	Object.values(duties).forEach(doctor => {
		const maxDistance = (Object.keys(roster).length-1)/(doctor.length-1)
		let distanceSum = 0
		for(let i = 0; i < doctor.length-1; i++){
			distanceSum += Math.pow(maxDistance - Math.abs(doctor[i]-doctor[i+1]), 2)
		}
		if (doctor.length > 1){fitness += distanceSum/(doctor.length-1)}
	})
	return Math.round(Math.sqrt(fitness)*weight)
}

function sumDistancesAverage(arr) {
	let sum = 0;
	for (let i = 1; i < arr.length; i++) {
	  sum += Math.abs(arr[i] - arr[i-1]);
	}
	return sum;
  }

module.exports.evaluateSpacing = evaluateSpacing