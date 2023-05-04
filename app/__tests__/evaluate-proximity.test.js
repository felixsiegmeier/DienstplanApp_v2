const { evaluateProximity } = require("../lib/fitness/evaluate-proximity")

describe("Test für die Proximity-Evaluation", () => {
    test("gleicher Tag", () => {
        const roster = {
            1: {
              dutyColumns: {
                1: { duty: { id: 1 } },
                2: { duty: null },
                3: { duty: null },
              },
            },
            2: {
              dutyColumns: {
                1: { duty: null },
                2: { duty: { id: 5 } },
                3: { duty: null },
              },
            },
            3: {
              dutyColumns: {
                1: { duty: null },
                2: { duty: null },
                3: { duty: { id: 2 } },
              },
            },
            4: {
              dutyColumns: {
                1: { duty: { id: 1 } },
                2: { duty: null },
                3: { duty: { id: 1 } },
              },
            },
          };
        
        const weight = 10
        const fitness = evaluateProximity({roster, weight})
        expect(fitness).toBe(weight)
    })

    test("1x nächster Tag", () => {
        const roster = {
            1: {
              dutyColumns: {
                1: { duty: { id: 1 } },
                2: { duty: null },
                3: { duty: null },
              },
            },
            2: {
              dutyColumns: {
                1: { duty: null },
                2: { duty: { id: 5 } },
                3: { duty: null },
              },
            },
            3: {
              dutyColumns: {
                1: { duty: null },
                2: { duty: null },
                3: { duty: { id: 1 } },
              },
            },
            4: {
              dutyColumns: {
                1: { duty: { id: 7 } },
                2: { duty: null },
                3: { duty: { id: 1 } },
              },
            },
          };
        
        const weight = 10
        const fitness = evaluateProximity({roster, weight})
        expect(fitness).toBe(weight)
    })

    test("2x nächster Tag", () => {
        const roster = {
            1: {
              dutyColumns: {
                1: { duty: { id: 5 } },
                2: { duty: null },
                3: { duty: null },
              },
            },
            2: {
              dutyColumns: {
                1: { duty: null },
                2: { duty: { id: 5 } },
                3: { duty: null },
              },
            },
            3: {
              dutyColumns: {
                1: { duty: null },
                2: { duty: null },
                3: { duty: { id: 1 } },
              },
            },
            4: {
              dutyColumns: {
                1: { duty: { id: 7 } },
                2: { duty: null },
                3: { duty: { id: 1 } },
              },
            },
          };
        
        const weight = 10
        const fitness = evaluateProximity({roster, weight})
        expect(fitness).toBe(2*weight)
    })
})