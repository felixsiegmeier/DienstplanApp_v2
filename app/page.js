import {generateDoctors} from "./lib/random-data/generate-doctors"
import {generateMonth} from "./lib/random-data/generate-month"
import {generateIMCRoster} from "./lib/random-data/generate-imc-roster"
import {initializePopulation} from "./lib/initialize-population/initialize-population"
//import {logDoctorsTable, logRosterTable, logSummaryTable} from "./test/test-outputs"

export default async function Home() {
  const config = {
    month: {month: 5, year: 2023},
    initializationSize: 500,
    populationSize: 100,
    dutyColumns: [
      {name: "Notaufnahme", autoAssignment: true}, 
      {name: "Hausdienst", autoAssignment: true}, 
      {name: "IMC", autoAssignment: false}
    ],
    groups: [
      {name: "Kardiologie", maximum: 2, exclusion: [5,6]},
      {name: "Gastroenterologie", maximum: 2, exclusion: [5,6]},
      {name: "Geriatrie", maximum: 2, exclusion: [5,6]},
      {name: "Rhythmologie", maximum: 2, exclusion: [5,6]},
      {name: "Surugiu", maximum: 1}
    ]
  }

  const doctors = generateDoctors(20, 30)
  let roster = await generateMonth(config)
  roster = generateIMCRoster(roster, doctors)
  const population = initializePopulation(roster, doctors, config)
console.log(JSON.stringify(population[0]))
  //logDoctorsTable(doctors)
  //logRosterTable(roster)
  //logRosterTable(population[0][1])
  //console.log(population[0][0])
  //console.log(population[99][0])
  return (
    <main className="">
     Test
    </main>
  )
} 