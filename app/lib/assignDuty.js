export default function assignDuty({ roster, dutyColumn, date, doctor_id }) {
  // Überprüfe, ob der Dienst gelöscht werden soll
  if (doctor_id === false) {
    // Wenn `doctor_id` `false` ist, entferne den Arzt aus der Dienst-Spalte für das angegebene Datum
    roster.days.find(
      (day) => day.date.getTime() === date.getTime()
    ).dutyColumns[dutyColumn] = [];
  } else {
    // Wenn `doctor_id` eine gültige ID ist, weise den Arzt dem Dienst für das angegebene Datum zu
    roster.days.find(
      (day) => day.date.getTime() === date.getTime()
    ).dutyColumns[dutyColumn] = [doctor_id];
  }
}
