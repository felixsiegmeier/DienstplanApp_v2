import assignDuty from "./assignDuty";
import getNextDuty from "./get-next-duty/getNextDuty";
import getWorstDuties from "./get-next-duty/getWorstDuties";

export default async function fillRoster({ roster, config, vacations }) {
  const filledRoster = await backtrackAlgorithmWrapper({ roster, config, vacations });
  return true;
}

function backtrackAlgorithmWrapper({
  roster,
  config,
  vacations,
  repeatCount = 100,
}) {
  const presetDuties = getPresetDuties(roster)
  for (let i = 0; i < repeatCount +1; i++) {
    if (backtrackAlgorithm({ roster, config, vacations })) {
      if(i === repeatCount) return roster
      const worstDuties = getWorstDuties({ roster, count: 10, presetDuties });
      if (worstDuties.length > 0) {
        worstDuties.forEach((duty) => {
          roster.days.find(
            (day) => day.date.getTime() === duty.date.getTime()
          ).dutyColumns[duty.dutyColumn] = [];
        });
      }
    }
  }
}

function backtrackAlgorithm({ roster, config, vacations }) {
  // erhalte den Dienst, der am schlechtesten zu besetzen ist
  const nextDuty = getNextDuty({ roster, config, vacations });

  // Überprüfe, ob alle Dienste besetzt sind (Ende des Backtrack-Algorithmus)
  if (!nextDuty) {
    // Wenn alle Dienste besetzt sind, gib `true` zurück
    return true;
  }

  const { doctors, dutyColumn, date } = nextDuty;

  // Referenz auf die Duty-Liste für das aktuelle Datum und die Schicht
  const dutyRef = roster.days.find(
    (day) => day.date.getTime() === date.getTime()
  ).dutyColumns[dutyColumn];

  // Leere die Duty-Liste für den aktuellen Dienst
  dutyRef.length = 0;

  // Iteriere über alle Ärzte für den nächsten Dienst
  for (const doctor_id of doctors) {
    // Weise den Dienst dem Arzt zu
    assignDuty({ roster, dutyColumn, date, doctor_id });

    // Starte den Backtrack-Algorithmus rekursiv
    if (backtrackAlgorithm({ roster, config, vacations })) {
      // Wenn der rekursive Aufruf erfolgreich ist, gib `true` zurück
      return true;
    }

    // Deaktiviere die Zuweisung und setze den Backtrack fort
    assignDuty({ roster, dutyColumn, date, doctor_id: false });
  }

  // Überprüfe, ob die Duty-Liste nach allen Versuchen leer ist
  if (dutyRef.length < 1) {
    // Wenn die Duty-Liste leer ist, gib `false` zurück
    return false;
  }
}

function getPresetDuties(roster){
  const presetDuties = []
  roster.days.forEach(day => {
    Object.entries(day.dutyColumns).forEach(([dutyColumn, duty]) => {
      if(duty.length > 0){
        presetDuties.push({date: day.date, dutyColumn: dutyColumn})
      }
    })
  })
  return presetDuties
}