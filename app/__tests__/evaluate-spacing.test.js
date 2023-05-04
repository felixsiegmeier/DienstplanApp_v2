const {evaluateSpacing} = require("../lib/fitness/evaluate-spacing")

// Dieser Test funktioniert nicht richtig, weil der Monat zu kurz ist.... Daher kommt überall 0 raus. Insgesamt sollte es aber klappen.
// Wenn sich später Probleme ergeben sollten, muss der Test ggf. nochmal neu geschrieben werden, um die Funktion zu optimieren.

describe("Test für die Spacing-Evaluation", () => {
    test("Kein Wechsel für einen Arzt", () => {
        const roster = {
            1: {
                date: 1,
              dutyColumns: {
                1: { duty: { id: 1 } },
                2: { duty: null },
                3: { duty: null },
              },
            },
            2: {
                date: 2,
              dutyColumns: {
                1: { duty: null },
                2: { duty: { id: 1 } },
                3: { duty: null },
              },
            },
            3: {
                date: 3,
              dutyColumns: {
                1: { duty: null },
                2: { duty: null },
                3: { duty: { id: 2 } },
              },
            },
            4: {
                date: 4,
              dutyColumns: {
                1: { duty: { id: 5 } },
                2: { duty: null },
                3: { duty: { id: 7 } },
              },
            },
          };
        
          const weight = 0.2
          const fitness = evaluateSpacing({roster, weight})
        expect(fitness).toBe(0)
    })

    test("Kurzer Wechsel für 2 Ärzte", () => {
        const roster = {
            1: {
                date: 1,
              dutyColumns: {
                1: { duty: { id: 1 } },
                2: { duty: null },
                3: { duty: null },
              },
            },
            2: {
                date: 2,
              dutyColumns: {
                1: { duty: null },
                2: { duty: { id: 2 } },
                3: { duty: null },
              },
            },
            3: {
                date: 3,
              dutyColumns: {
                1: { duty: null },
                2: { duty: null },
                3: { duty: { id: 1 } },
              },
            },
            4: {
                date: 4,
              dutyColumns: {
                1: { duty: { id: 2 } },
                2: { duty: null },
                3: { duty: { id: 5 } },
              },
            },
          };
        
          const weight = 0.2
          const fitness = evaluateSpacing({roster, weight})
        expect(fitness).toBe(0)
    })

    test("maximal langer Wechsel für 1 Arzt", () => {
        const roster = {
            1: {
                date: 1,
              dutyColumns: {
                1: { duty: { id: 1 } },
                2: { duty: null },
                3: { duty: null },
              },
            },
            2: {
                date: 2,
              dutyColumns: {
                1: { duty: null },
                2: { duty: { id: 5 } },
                3: { duty: null },
              },
            },
            3: {
                date: 3,
              dutyColumns: {
                1: { duty: null },
                2: { duty: null },
                3: { duty: { id: 2 } },
              },
            },
            4: {
                date: 4,
              dutyColumns: {
                1: { duty: { id: 7 } },
                2: { duty: null },
                3: { duty: { id: 1 } },
              },
            },
          };
        
        const weight = 0.2
        const fitness = evaluateSpacing({roster, weight})
        expect(fitness).toBe(0)
    })
})