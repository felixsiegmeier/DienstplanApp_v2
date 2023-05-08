const {fitnessFunction} = require("../lib/fitness/fitness-function")
const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(__dirname, 'test-data.json');
const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
const data = JSON.parse(jsonData)

const config = {groups: [
    {name: "Kardiologie", maximum: 2, exclusion: [5,6]},
    {name: "Gastroenterologie", maximum: 2, exclusion: [5,6]},
    {name: "Geriatrie", maximum: 2, exclusion: [5,6]},
    {name: "Rhythmologie", maximum: 2, exclusion: [5,6]},
    {name: "Surugiu", maximum: 1}
  ]}

describe("Tests für die gesamte Fitness", () => {
    test("Mit Test-Datensatz", () => {
        expect(fitnessFunction({rosterRef: data, mutated: true, config: config})).toBe(1669)
    })
})
