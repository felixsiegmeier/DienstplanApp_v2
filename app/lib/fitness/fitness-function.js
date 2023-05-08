const {logRosterTable} = require("../../test/test-outputs");
const {evaluateProximity} = require("./evaluate-proximity");
const {evaluateSpacing} = require("./evaluate-spacing");
const {evaluateDutyDistribution} = require("./evaluate-duty-distribution");
const {evaluateDutyValueDistribution} = require("./evaluate-duty-value-distribution");
const {evaluateGroups} = require("./evaluate-groups");

function fitnessFunction({rosterRef, mutated, config}){
	const roster = JSON.parse(JSON.stringify(rosterRef))
	const rosterKeys = Object.keys(roster)
	let fitness = 0
	// logRosterTable(roster)

	if(mutated){
		fitness += evaluateProximity({roster, weight: 100})
	}
	const spacingFitness = evaluateSpacing({roster, weight: .2})
	const dutyDistributionFitness = evaluateDutyDistribution({roster, weight: 2})
	const DutyValueDistributionFitness = evaluateDutyValueDistribution({roster, weight: 10})
	const GroupsFitness = evaluateGroups({roster, groups: config.groups, weight: 10})

	fitness += spacingFitness + dutyDistributionFitness + DutyValueDistributionFitness + GroupsFitness
	/*
	console.table({
		Spacing: spacingFitness,
		DutyDist: dutyDistributionFitness,
		PointsDist: DutyValueDistributionFitness,
		Clinics: ClinicsFitness,
		Fitness: fitness
	})
	*/
	return fitness
}


module.exports.fitnessFunction = fitnessFunction