const {evaluateGroups} = require("../lib/fitness/evaluate-groups")
const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(__dirname, 'test-data.json');
const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
const data = JSON.parse(jsonData)

const groups= [
    {name: "Kardiologie", maximum: 2, exclusion: [5,6]},
    {name: "Gastroenterologie", maximum: 2, exclusion: [5,6]},
    {name: "Geriatrie", maximum: 2, exclusion: [5,6]},
    {name: "Rhythmologie", maximum: 2, exclusion: [5,6]},
    {name: "Surugiu", maximum: 1}
  ]

describe("Tests für die Verteilung der Kliniken", () => {
    test("Mit Test-Datensatz", () => {
        expect(evaluateGroups({roster: data, groups: groups, weight: 10})).toBe(10)
    })
})
