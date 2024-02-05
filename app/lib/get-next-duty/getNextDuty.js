/**
 * Ermittelt den nächsten Dienst, der am schlechtesten zu besetzen ist, basierend auf verschiedenen Kriterien.
 */
import getDutyDoctors from "./getDutyDoctors";
import sortedDuty from "./sortDuty";

export default function getNextDuty({ roster, config, vacations }) {
  // Initialisiert ein leeres Duty-Objekt für den nächsten Dienst
  const duty = {
    doctors: [],
    availabilityRatio: 1,
    dutyColumn: null,
    date: null,
  };

  // Extrahiere die automatisch zuzuweisenden Duty-Spalten aus der Konfiguration
  const dutyColumns = config.dutyColumns
    .map((dutyColumn) => {
      if (dutyColumn.autoAssignment) return dutyColumn.name;
    })
    .filter((dutyColumn) => dutyColumn != undefined);

  // Filtere verfügbare Ärzte für die automatisch zuzuweisenden Duty-Spalten
  const availableDoctors = roster.doctors.filter(
    (doctor) =>
      doctor.dutyColumns.some((dutyColumn) =>
        dutyColumns.includes(dutyColumn)
      ) &&
      !doctor.only12 &&
      !doctor.isManager
  );

  // Berechne Durchschnittswerte und Faktoren für die Dienstplananalyse
  const allDutysCount = dutyColumns.length * roster.days.length;
  const avgDutys = allDutysCount / availableDoctors.length;
  const avgHighValueDays =
    (roster.days.filter((day) => day.value > 1).length * dutyColumns.length) /
    availableDoctors.length;
  const avgDutySpacing = (roster.days.length / avgDutys) * 0.8;

  // Iteriere über alle Tage im Roster
  roster.days.forEach((day) => {
    // Iteriere über alle automatisch zuzuweisenden Duty-Spalten
    dutyColumns.forEach((dutyColumn) => {
      // Filtere alle Ärzte, die für die automatisch zuzuweisenden Duty-Spalten in Frage kommen
      const allDoctors = roster.doctors.filter(
        (doctor) =>
          doctor.dutyColumns.some((dutyCol) => dutyColumns.includes(dutyCol)) &&
          !doctor.only12 &&
          !doctor.isManager
      );

      // Bestimme die Anzahl aller verfügbaren Ärzte
      const allDoctorsCount = allDoctors.length;

      // Extrahiere die IDs aller Ärzte
      const allDoctorsIds = allDoctors.map((doctor) => doctor._id);

      // Überprüfe, ob bereits Ärzte für den aktuellen Dienst eingeteilt sind
      if (
        day.dutyColumns[dutyColumn].length > 0 &&
        day.dutyColumns[dutyColumn].some((entry) =>
          allDoctorsIds.includes(entry)
        )
      )
        // Wenn bereits Ärzte eingeteilt sind, gib `false` zurück
        return false;

      // Ermittle verfügbare Ärzte für den Dienst
      const availableDoctors = getDutyDoctors({
        roster,
        day,
        dutyColumn,
        config,
        vacations,
        allDoctors,
      });

      // Berechne das Verhältnis der verfügbaren Ärzte zur Gesamtanzahl der theoretisch verfügbaren Ärzte
      const availabilityRatio =
        allDoctorsCount && availableDoctors
          ? availableDoctors.length / allDoctorsCount
          : false;

      // Überprüfe, ob das Verhältnis besser ist als das bisherige beste Verhältnis
      if (
        availabilityRatio &&
        (availabilityRatio < duty.availabilityRatio ||
          duty.availabilityRatio === 1)
      ) {
        // Aktualisiere das Duty-Objekt mit den Informationen des aktuellen Dienstes
        duty.doctors = availableDoctors;
        duty.availabilityRatio = availabilityRatio;
        duty.dutyColumn = dutyColumn;
        duty.date = day.date;
      }
    });
  });

  // Überprüfe, ob ein Dienst gefunden wurde
  if (duty.date === null) return false;

  // Sortiere den gefundenen Dienst basierend auf weiteren Kriterien und gib ihn zurück
  return sortedDuty({
    roster,
    duty,
    avgDutys,
    avgHighValueDays,
    avgDutySpacing,
    vacations,
    config,
  });
}
