/**
 * Ermittelt verfügbare Ärzte für einen bestimmten Tag, eine bestimmte Schicht und Konfiguration im Roster.
 * Berücksichtigt verschiedene Checks wie Blacklist, Urlaub, Nähe zu bereits eingeteilten Diensten, Gruppenzugehörigkeit und Duty-Spalten.
 */
import checkBlacklist from "./checks/checkBlacklist";
import checkDutyColumn from "./checks/checkDutyColumn";
import checkGroups from "./checks/checkGroups";
import checkProximity from "./checks/checkProximity";
import checkVacation from "./checks/checkVacation";

export default function getDutyDoctors({ roster, day, dutyColumn, config, vacations, allDoctors }) {
  // Extrahiere die automatisch zuzuweisenden Duty-Spalten aus der Konfiguration
  const dutyColumns = config.dutyColumns
    .map((dutyCol) => {
      if (dutyCol.autoAssignment) return dutyCol.name;
    })
    .filter((dutyCol) => dutyCol != undefined);

  // Array für die verfügbaren Ärzte
  const doctors = [];

  // Iteriere über alle Ärzte
  allDoctors.forEach((doctor) => {
    // Führe verschiedene Checks durch, um die Verfügbarkeit zu prüfen
    if (checkBlacklist(doctor, day)) {
      return; // Wenn Blacklist-Check nicht bestanden, springe zur nächsten Iteration
    }
    if (checkVacation({ doctor, day, vacations })) {
      return; // Wenn Urlaubs-Check nicht bestanden, springe zur nächsten Iteration
    }
    if (checkProximity({ doctor, day, roster })) {
      return; // Wenn Nähe-Check nicht bestanden, springe zur nächsten Iteration
    }
    if (checkGroups({ doctor, day, config, roster })) {
      return; // Wenn Gruppen-Check nicht bestanden, springe zur nächsten Iteration
    }
    if (checkDutyColumn(doctor, dutyColumn)) {
      return; // Wenn Duty-Spalten-Check nicht bestanden, springe zur nächsten Iteration
    }
    // Füge die ID des Arztes dem Array hinzu, wenn alle Checks bestanden wurden
    doctors.push(doctor._id);
  });

  // Gib das Array mit den verfügbaren Ärzte-IDs zurück
  return doctors;
}
