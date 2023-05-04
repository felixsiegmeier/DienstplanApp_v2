const { evaluateDutyDistribution } = require("../lib/fitness/evaluate-duty-distribution")
const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(__dirname, 'test-data.json');
const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
const data = JSON.parse(jsonData)

describe("Tests für die Verteilung der Dienste", () => {
    test("Mit Test-Datensatz", () => {
        expect(evaluateDutyDistribution({roster: data, weight: 10})).toBe(516)
    })
})
