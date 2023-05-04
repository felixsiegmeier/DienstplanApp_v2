// generates a roster for imc, just filling the slots randomly with doctors.
// the purpose of this is to have a doctor with a given "clinic" in each imc-slot because this is needed later

function generateIMCRoster(rosterRef, doctors){
	const roster = JSON.parse(JSON.stringify(rosterRef))
	const doctorKeys = Object.keys(doctors)
	Object.keys(roster).forEach(key => {
		const ran = Math.floor(Math.random()*doctorKeys.length)
		roster[key].dutyColumns.IMC.duty = doctors[doctorKeys[ran]]
	})
    return roster
}

module.exports.generateIMCRoster = generateIMCRoster