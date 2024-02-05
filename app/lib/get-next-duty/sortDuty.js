/**
 * Sortiert die Ärzte für einen bestimmten Dienst basierend auf verschiedenen Fitnessfaktoren.
 */
import fitnessDutyCount from "./fitness/fitnessDutyCount";
import fitnessDutySpacing from "./fitness/fitnessDutySpacing";
import fitnessGreenlist from "./fitness/fitnessGreenlist";
import fitnessGroupAvailability from "./fitness/fitnessGroupAvailability";
import fitnessGroups from "./fitness/fitnessGroups";
import fitnessHighValueDutys from "./fitness/fitnessHighValueDutys";
import fitnessWeekendCount from "./fitness/fitnessWeekendCount";
import fitnessWeekendSpacing from "./fitness/fitnessWeekendSpacing";

export default function sortedDuty({
  roster,
  duty,
  avgDutys,
  avgHighValueDays,
  avgDutySpacing,
  vacations,
  config,
}) {
  // Überprüfe, ob keine Ärzte für den Dienst verfügbar sind
  if (duty.doctors.length === 0) return duty;

  // Array, um Ärzte mit Fitnessfaktoren zu speichern
  const doctorsWithFitness = [];

  // Iteriere über alle Ärzte für den Dienst
  duty.doctors.forEach((doctorId) => {
    // Suche den Arzt im Roster
    const doctor = roster.doctors.find((doc) => doc._id === doctorId);

    // Berechne Abwesenheit und Anwesenheit des Arztes
    const absence = vacations.filter(
      (vacation) =>
        vacation.doctorId === doctorId &&
        vacation.date.getMonth() === roster.month
    ).length;
    const attendance = (roster.days.length - absence) / roster.days.length;

    // Berechne verschiedene Fitnessfaktoren
    let fitnessDutyCountFactor = fitnessDutyCount({
      roster,
      doctorId,
      avgDutys,
      attendance,
    });
    let fitnessHighValueDutysFactor = fitnessHighValueDutys({
      roster,
      doctorId,
      avgHighValueDays,
    });
    let fitnessWeekendSpacingFactor = fitnessWeekendSpacing({
      roster,
      doctorId,
      duty,
    });
    let fitnessWeekendCountFactor = fitnessWeekendCount({
      roster,
      doctorId,
      duty,
    });
    let fitnessDutySpacingFactor = fitnessDutySpacing({
      roster,
      duty,
      doctorId,
      avgDutySpacing,
    });
    let fitnessGroupsFactor = fitnessGroups({ roster, doctorId, duty, config });
    let fitnessGroupAvailabilityFactor = fitnessGroupAvailability({
      doctorId,
      roster,
      config,
      vacations,
      duty,
    });
    let fitnessGreenlistFactor = fitnessGreenlist({ roster, doctorId, duty });

    // Berechne Gesamtfitness des Arztes
    let totalFitness =
      fitnessDutyCountFactor +
      fitnessHighValueDutysFactor +
      fitnessWeekendSpacingFactor +
      fitnessWeekendCountFactor +
      fitnessDutySpacingFactor +
      fitnessGroupsFactor +
      fitnessGroupAvailabilityFactor +
      fitnessGreenlistFactor;

    // Füge den Arzt mit Gesamtfitness zum Array hinzu
    doctorsWithFitness.push({ doctorId, totalFitness });
  });

  // Sortiere die Ärzte basierend auf Gesamtfitness
  const sortedDoctors = doctorsWithFitness
    .sort((a, b) => a.totalFitness - b.totalFitness)
    .map((doc) => doc.doctorId);

  // Aktualisiere das Duty-Objekt mit den sortierten Ärzten
  duty.doctors = sortedDoctors;

  // Gib das aktualisierte Duty-Objekt zurück
  return duty;
}
