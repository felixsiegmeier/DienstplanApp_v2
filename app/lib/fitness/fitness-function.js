import {countDuties} from './count-duties'
import {logDoctorsTable} from "../../test/test-outputs"
import {evaluateProximity} from "./evaluate-proximity"
import {evaluateSpacing} from "./evaluate-spacing"
import {evaluateDutyDistribution} from "./evaluate-duty-distribution"
import {evaluateDutyValueDistribution} from "./evaluate-duty-value-distribution"
import {evaluateClinics} from "./evaluate-clinics"


function fitnessFunction(rosterRef, mutated){
	const roster = JSON.parse(JSON.stringify(rosterRef))
	const rosterKeys = Object.keys(roster)
	let fitness = Math.random() * 500 //0
	//const doctors = countDuties(roster)
	//logDoctorsTable(doctors)
	

	if(mutated){
		fitness += evaluateProximity({roster, weight: 100})
	}
	const spacingFitness = evaluateSpacing({roster, weight: .2})
	const dutyDistributionFitness = 0 //evaluateDutyDistribution({roster, rosterKeys, weight: 2, doctors, doctorKeys})
	const DutyValueDistributionFitness = 0 //evaluateDutyValueDistribution({roster, rosterKeys, weight: 10, doctors, doctorKeys})
	const ClinicsFitness = 0 //evaluateClinics({roster, rosterKeys, weight: 100, doctors, doctorKeys})

	fitness += spacingFitness + dutyDistributionFitness + DutyValueDistributionFitness + ClinicsFitness
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