import { fitnessFunction } from "../fitness/fitness-function";

function initializePopulation(rosterRef, doctorsRef, config) {
  const populationSize = config.initializationSize;
  const selectionSize = config.populationSize;
  const rosterBeforeWishes = JSON.parse(JSON.stringify(rosterRef));
  const doctorsBeforeWishes = JSON.parse(JSON.stringify(doctorsRef));
  let population = [];

  assignWishes({
    roster: rosterBeforeWishes,
    doctors: doctorsBeforeWishes,
    config: config,
  });

  for (let i = 0; i < populationSize; i++) {
    const roster = JSON.parse(JSON.stringify(rosterBeforeWishes));
    const doctors = JSON.parse(JSON.stringify(doctorsBeforeWishes));
    const filledRoster = fillRoster(roster, doctors, config);

    population.push([fitnessFunction({rosterRef: filledRoster, mutated: false, config: config}), filledRoster]);

    // das hält die Population klein und sortiert nach jedem über die Ziellänge des Arrays hinausgehenden Eintrag neu und
    // löscht den mit der schlechtesten Fitness raus
    if (population.length > selectionSize) {
      population.sort((a, b) => a[0] - b[0]);
      population = population.slice(0, selectionSize);
    }
  }

  if (population.length > 1) {
    population.sort((a, b) => a[0] - b[0]);
  }

  if (selectionSize < populationSize) {
    return population.slice(0, selectionSize);
  }

  return population;
}

function assignWishes({ roster, doctors, config }) {
  Object.keys(doctors).forEach((doc) => {
    doctors[doc].greenlist.forEach((wish) => {
      const dutyColumns = config.dutyColumns
        .filter((dutyColumn) => dutyColumn.autoAssignment)
        .map((dutyColumn) => dutyColumn.name);
      let dutyAssigned = false;
      while (!dutyAssigned) {
        const randomDutyColumnIndex = Math.floor(
          Math.random() * dutyColumns.length
        );
        const dutyColumn = dutyColumns[randomDutyColumnIndex];
        const day = roster[wish];
        dutyAssigned = assignDuty({
          roster: roster,
          date: wish,
          dutyColumn,
          doctor: doctors[doc],
          config,
        });
        dutyColumns.splice(randomDutyColumnIndex, 1);
        if (dutyColumns.length === 0) {
          dutyAssigned = true;
        }
      }
    });
  });
}

function fillRoster(rosterRef, doctorsRef, config) {
  const roster = JSON.parse(JSON.stringify(rosterRef));
  const doctors = JSON.parse(JSON.stringify(doctorsRef));
  const EMPTY = {
    id: "0000000000",
    name: "EMPTY",
    blacklist: [],
    greenlist: [],
    groups: [String(Math.floor(Math.random() * 10000))],
    dutyColumns: [...Object.keys(config.dutyColumns)],
  };
  // gibt eine Sortierte Liste (siehe entspr. Funktion) der Daten aus.
  // Diese wird noch leicht gemischt (siehe Funktion) um eine Population zu erzeugen = random factor
  const rosterKeys = shuffleArrayWithNeighbor(
    sortRosterKeys(roster, doctors, config)
  );
  rosterKeys.forEach((date) => {
    // erstelle eine Liste aller unbesetzten Dienste dieses Tages und mische sie
    const unAssignedDutyColumns = shuffleArray(
      Object.keys(roster[date].dutyColumns).filter(
        (dutyColumn) =>
          roster[date].dutyColumns[dutyColumn].autoAssignment &&
          !roster[date].dutyColumns[dutyColumn].duty
      )
    );

    // besetze jeden dieser Dienste
    unAssignedDutyColumns.forEach((dutyColumn) => {
      // erstelle ein Array aller Doctor-IDs, sortiert nach der Summe aus Punkten und Dienstanzahl
      // auch Diese wird noch leicht gemischt (siehe Funktion) um eine Population zu erzeugen = random factor
      const doctorKeys = shuffleArrayWithNeighbor(sortDoctorsByScore(doctors));

      // erzeugt einen Vergleichsoperator für eine while-Schleife
      let dutyAssigned = false;

      while (!dutyAssigned) {
        // wenn die doctorKeysLocal leer ist dann setzte Empty ein
        if (doctorKeys.length === 0) {
          roster[date].dutyColumns[dutyColumn]["duty"] = EMPTY;
          dutyAssigned = true;
          break;
        }

        // oder wenn nicht leer
        // wählt den ersten Doktor aus = den mit der geringsten Punktzahl
        const doctor = doctors[doctorKeys[0]];
        // entferne den Doctor aus der doctorKeys
        doctorKeys.splice(0, 1);

        // versuche, den doctor zuzuweisen
        dutyAssigned = assignDuty({ roster, date, dutyColumn, doctor, config });
      }
    });
  });
  return roster;
}

function assignDuty({ roster, date, dutyColumn, doctor, config }) {
  if (
    doctorCanFullfillDutyColumn(doctor, dutyColumn) &&
    dutyIsUnassigned(roster, date, dutyColumn) &&
    groupIsValide({ day: roster[date], doctor, config }) && 
    noDutyInProximity(roster, date, doctor) &&
    dutyNotBlacklisted(doctor, date)
  ) {
    roster[date].dutyColumns[dutyColumn]["duty"] = doctor;
    return true;
  }
  return false;
}

function doctorCanFullfillDutyColumn(doctor, dutyColumn) {
  return doctor.dutyColumns.includes(dutyColumn);
}

function dutyIsUnassigned(roster, date, dutyColumn) {
  return !roster[date].dutyColumns[dutyColumn]["duty"];
}

function groupIsValide({ day, doctor, config }) {
  // Schleife über alle Gruppen des Arztes
  for (let i = 0; i < doctor.groups.length; i++) {
    const groupName = doctor.groups[i];
    // Finde die entsprechende Gruppe in der Konfiguration
    const groupConfig = config.groups.find((group) => group.name === groupName);
    if (!groupConfig) {
      return true;
    }
    // Überprüfe, ob die Gruppe das Maximum erreicht oder überschritten hat
    const groupCount = Object.keys(day.dutyColumns).reduce((count, group) => {
      return (
        count +
        (day.dutyColumns[group].duty === doctor && group === groupName ? 1 : 0)
      );
    }, 0);
    if (groupCount >= groupConfig.maximum) {
      // Überprüfe, ob der Wochentag in der Ausschlussliste der Gruppe ist
      if (groupConfig.exclusion.includes(day.weekday)) {
        continue;
      } else {
        return false;
      }
    }
  }
  return true;
}

function noDutyInProximity(roster, dateString, doctor){
  const date = parseInt(dateString)
  for(const dutyColumn of Object.values(roster[date].dutyColumns)){
    if(dutyColumn.duty.id && (dutyColumn.duty.id === doctor.id)){return false}
  }
  if(roster[date-1]){
    for(const dutyColumn of Object.values(roster[date-1].dutyColumns)){
      if (dutyColumn.duty.id && (dutyColumn.duty.id === doctor.id)){return false}
    }
  }
  if(roster[date+1]){
    for(const dutyColumn of Object.values(roster[date+1].dutyColumns)){
      if (dutyColumn.duty.id && (dutyColumn.duty.id === doctor.id)){return false}
    }
  }
  return true;
};

function dutyNotBlacklisted(doctor, date){
  return !doctor.blacklist.includes(date);
};

function sortDoctorsByScore(doctors) {
  // Konvertiere das Objekt in ein Array von [id, arzt] Paaren
  const doctorEntries = Object.entries(doctors);

  // Sortiere die Einträge nach der Summe aus points und duties.length
  doctorEntries.sort(([, doctorA], [, doctorB]) => {
    const scoreA = doctorA.points + doctorA.duties.length;
    const scoreB = doctorB.points + doctorB.duties.length;
    return scoreA - scoreB; // Sortiere aufsteigend nach der Score-Summe
  });

  // Extrahiere die sortierten IDs und gib sie als Array zurück
  const sortedIds = doctorEntries.map(([id]) => id);
  return sortedIds;
}

function sortRosterKeys(roster, doctors, config) {
  // gibt die Daten (Zahl 1-31) in einem Array aus
  // es erfolgt eine Sortierung nach Feiertag > Wochenende > normaler Tag
  // jede dieser Gruppen ist in sich noch nach der Anzahl der verfügbaren Ärzte sortiert
  const rosterKeys = Object.keys(roster).map((date) => {
    let viableDoctors = 0;
    Object.values(doctors).forEach((doctor) => {
      if (!doctor.blacklist.includes(Number(date))) {
        const dutyColumns = doctor.dutyColumns || [];
        const autoColumns = config.dutyColumns
          .filter((col) => col.autoAssignment)
          .map((col) => col.name);
        const intersect = dutyColumns.filter((dc) => autoColumns.includes(dc));
        viableDoctors += intersect.length;
      }
    });
    return [date, viableDoctors];
  });

  const holidayKeys = rosterKeys.filter(([date]) => roster[date].holiday);
  const weekendKeys = rosterKeys.filter(
    ([date]) => [6, 7].includes(roster[date].weekday) && !roster[date].holiday
  );
  const otherKeys = rosterKeys.filter(
    ([date]) =>
      !holidayKeys
        .concat(weekendKeys)
        .map(([k]) => k)
        .includes(date)
  );

  const sortByViableDoctors = (a, b) => a[1] - b[1];
  const sortedHolidayKeys = holidayKeys
    .sort(sortByViableDoctors)
    .map(([date]) => date);
  const sortedWeekendKeys = weekendKeys
    .sort(sortByViableDoctors)
    .map(([date]) => date);
  const sortedOtherKeys = otherKeys
    .sort(sortByViableDoctors)
    .map(([date]) => date);

  return [...sortedHolidayKeys, ...sortedWeekendKeys, ...sortedOtherKeys];
}

function shuffleArrayWithNeighbor(array) {
  for (let i = 0; i < array.length - 1; i++) {
    // Mit der Wahrscheinlichkeit von 30% die aktuelle Stelle mit der nächsten Stelle tauschen
    if (Math.random() < 0.3) {
      const temp = array[i];
      array[i] = array[i + 1];
      array[i + 1] = temp;
    }
  }
  return array;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

module.exports.initializePopulation = initializePopulation;
