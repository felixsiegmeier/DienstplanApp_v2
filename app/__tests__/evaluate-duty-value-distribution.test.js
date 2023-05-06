const {evaluateDutyValueDistribution} = require("../lib/fitness/evaluate-duty-value-distribution")
const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(__dirname, 'test-data.json');
const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
const data = JSON.parse(jsonData)

describe("Tests für die Verteilung der Dienstpunkte", () => {
    test("Mit Test-Datensatz", () => {
        expect(evaluateDutyValueDistribution({roster: data, weight: 10})).toBe(715)
    })
})
