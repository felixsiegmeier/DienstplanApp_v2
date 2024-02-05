// Importiere die Funktion getRandomElements aus der Datei "./getRandomElements"
import getRandomElements from "../getRandomElements";

// Exportiere die Funktion getWorstDuties als Standardexport
export default function getWorstDuties({ roster, count }) {
  // Array zum Speichern der "schlechten" Dienste
  const badDuties = [];
  // Extrahiere die IDs aller Ärzte aus dem Roster
  const doctorIds = roster.doctors.map((doc) => doc._id);

  // Klasse zur Repräsentation eines Arztes mit seinen Diensten und Punkten
  class Doctor {
    constructor(id) {
      this._id = id;
      this.duties = [];
      this.points = 0;
    }
  }

  // Erstelle eine Instanz der Klasse Doctor für jede Arzt-ID
  const doctorData = doctorIds.map((id) => new Doctor(id));

  // Iteriere über alle Tage im Roster und aktualisiere die Arztinformationen
  roster.days.forEach((day) => {
    const dutyColumns = Object.keys(day.dutyColumns);
    dutyColumns.forEach((dutyColumn) => {
      day.dutyColumns[dutyColumn].forEach((doctorId) => {
        const index = doctorData.findIndex((doc) => doc._id === doctorId);
        doctorData[index].duties.push({ dutyColumn, date: day.date });
        doctorData[index].points += day.value;
      });
    });
  });

  // Funktion zum Überprüfen, ob zwei Daten in 2 Tagen oder weniger liegen
  const checkShortSwitch = (a, b) => {
    const distance =
      Math.abs(a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24);
    return distance < 3;
  };

  // Funktion zum Überprüfen von "schlechten" Wochenenden
  const checkWeekends = (duties) => {
    const weekendDays = [5, 6, 0]; // Freitag, Samstag, Sonntag (0-basiert)
    const weekendDuties = duties.filter((duty) =>
      weekendDays.includes(duty.date.getDay())
    );
    if (weekendDuties.length < 2) return [];
    if (weekendDuties.length > 3) return weekendDuties;
    const badWeekends = [];
    for (let i = 0; i < weekendDuties.length - 1; i++) {
      const distance =
        Math.abs(
          weekendDuties[i].date.getTime() - weekendDuties[i + 1].date.getTime()
        ) /
        (1000 * 60 * 60 * 24);
      if (distance > 4 && distance < 12)
        badWeekends.push(weekendDuties[i], weekendDuties[i + 1]);
    }
    if (badWeekends.length < 2) return [];
    return badWeekends;
  };

  // Iteriere über alle Ärzte und identifiziere "schlechte" Dienste
  doctorData.forEach((doc) => {
    if (doc.duties.length > 6)
      badDuties.push(doc.duties[Math.floor(Math.random() * doc.duties.length)]);
    if (doc.points > 9)
      badDuties.push(doc.duties[Math.floor(Math.random() * doc.duties.length)]);

    const badWeekends = checkWeekends(doc.duties);
    const shortSwitchDays = [];

    for (let i = 0; i < doc.duties.length - 1; i++) {
      const shortSwitch = checkShortSwitch(
        doc.duties[i].date,
        doc.duties[i + 1].date
      );
      if (shortSwitch) shortSwitchDays.push(doc.duties[i], doc.duties[i + 1]);
    }

    badDuties.push(...badWeekends, ...shortSwitchDays);
  });

  // Wähle zufällig "schlechte" Dienste entsprechend der übergebenen Anzahl aus
  const worstDuties = getRandomElements(badDuties, count);

  // Gib die ausgewählten "schlechten" Dienste zurück
  return worstDuties;
}
