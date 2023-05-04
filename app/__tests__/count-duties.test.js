const { countDuties } = require("../lib/fitness/count-duties")

describe('countDuties', () => {
  test('2 doctors with 1 and 2 duties at normal days', () => {
    const roster = {
      '11': {
        date: 11,
        weekday: 2,
        dutyColumns: {
          'column1': {
            duty: {
              id: 'doctor1',
              name: 'Dr. John Doe',
              duties: [],
              points: 0,
              weekends: [],
            }
          },
          'column2': {
            duty: {
              id: 'doctor2',
              name: 'Dr. Jane Smith',
              duties: [],
              points: 0,
              weekends: [],
            }
          }
        }
      },
      '12': {
        date:12,
        weekday: 3,
        dutyColumns: {
          'column1': {
            duty: {
              id: 'doctor1',
              name: 'Dr. John Doe',
              duties: [],
              points: 0,
              weekends: [],
            }
          },
          'column2': false
        }
      }
    };

    const result = countDuties(roster);

    expect(result).toEqual({
      'doctor1': {
        id: 'doctor1',
        name: 'Dr. John Doe',
        duties: [11, 12],
        points: 2,
        weekends: []
      },
      'doctor2': {
        id: 'doctor2',
        name: 'Dr. Jane Smith',
        duties: [11],
        points: 1,
        weekends: []
      }
    });
  });

  test('1 doctor with 2 duties at Friday and Sunday', () => {
    const roster = {
      '11': {
        date: 11,
        weekday: 5,
        dutyColumns: {
          'column1': {
            duty: {
              id: 'doctor1',
              name: 'Dr. John Doe',
              duties: [],
              points: 0,
              weekends: [],
            }
          }
        }
      },
      '13': {
        date: 13,
        weekday: 7,
        dutyColumns: {
          'column1': {
            duty: {
              id: 'doctor1',
              name: 'Dr. John Doe',
              duties: [],
              points: 0,
              weekends: [],
            }
          },
          'column2': false
        }
      }
    };

    const result = countDuties(roster);

    expect(result).toEqual({
      'doctor1': {
        id: 'doctor1',
        name: 'Dr. John Doe',
        duties: [11, 13],
        points: 4,
        weekends: [11, 13]
      }
    });
  });

  test('1 doctor with 1 duty at "free standing" holiday', () => {
    const roster = {
      '11': {
        date: 11,
        weekday: 2,
        holiday: true,
        dutyColumns: {
          'column1': {
            duty: {
              id: 'doctor1',
              name: 'Dr. John Doe',
              duties: [],
              points: 0,
              weekends: [],
            }
          }
        }
      },
      '12': {
        date: 12,
        weekday: 3,
        holiday: false,
        dutyColumns: {
          'column1': false,
          'column2': false
        }
      }
    };

    const result = countDuties(roster);

    expect(result).toEqual({
      'doctor1': {
        id: 'doctor1',
        name: 'Dr. John Doe',
        duties: [11],
        points: 2,
        weekends: [11]
      }
    });
  });

  test('1 doctor with 1 duty at holiday at friday', () => {
    const roster = {
      '11': {
        date: 11,
        weekday: 5,
        holiday: true,
        dutyColumns: {
          'column1': {
            duty: {
              id: 'doctor1',
              name: 'Dr. John Doe',
              duties: [],
              points: 0,
              weekends: [],
            }
          }
        }
      },
      '12': {
        date: 12,
        weekday: 6,
        holiday: false,
        dutyColumns: {
          'column1': false,
          'column2': false
        }
      }
    };

    const result = countDuties(roster);

    expect(result).toEqual({
      'doctor1': {
        id: 'doctor1',
        name: 'Dr. John Doe',
        duties: [11],
        points: 3,
        weekends: [11]
      }
    });
  });

  test('1 doctor with 1 duty at holiday before holiday', () => {
    const roster = {
      '11': {
        date: 11,
        weekday: 2,
        holiday: true,
        dutyColumns: {
          'column1': {
            duty: {
              id: 'doctor1',
              name: 'Dr. John Doe',
              duties: [],
              points: 0,
              weekends: [],
            }
          }
        }
      },
      '12': {
        date: 12,
        weekday: 3,
        holiday: true,
        dutyColumns: {
          'column1': false,
          'column2': false
        }
      }
    };

    const result = countDuties(roster);

    expect(result).toEqual({
      'doctor1': {
        id: 'doctor1',
        name: 'Dr. John Doe',
        duties: [11],
        points: 3,
        weekends: [11]
      }
    });
  });

  test('1 doctor with 1 duty at normal day before holiday', () => {
    const roster = {
      '11': {
        date: 11,
        weekday: 2,
        holiday: false,
        dutyColumns: {
          'column1': {
            duty: {
              id: 'doctor1',
              name: 'Dr. John Doe',
              duties: [],
              points: 0,
              weekends: [],
            }
          }
        }
      },
      '12': {
        date: 12,
        weekday: 3,
        holiday: true,
        dutyColumns: {
          'column1': false,
          'column2': false
        }
      }
    };

    const result = countDuties(roster);

    expect(result).toEqual({
      'doctor1': {
        id: 'doctor1',
        name: 'Dr. John Doe',
        duties: [11],
        points: 2,
        weekends: [11]
      }
    });
  });
});
