import React from "react";

export default function Conflicts({ roster, doctors, config }) {
  const formatDate = (month, year) => {
    const formattedMonth = String(month + 1).padStart(2, "0");
    return `${formattedMonth}/${year}`;
  };

  // Maximale Dienstanzahl pro Arzt prüfen
  function checkMaximum(doctors, doctor, roster) {
    let counter = 0;

    roster.days.forEach((day) => {
      const dutyColumnKeys = Object.keys(day.dutyColumns);

      dutyColumnKeys.forEach((dutyColumnKey) => {
        const doctorIds = day.dutyColumns[dutyColumnKey];

        if (doctorIds.includes(doctor._id)) {
          counter += 1;
        }
      });
    });

    if (counter > doctors.find((doc) => doc._id === doctor._id)?.maximum) {
      return (
        <li className="text-red-500">
          {doctor.name} hat mehr Dienste als erlaubt ({counter} statt{" "}
          {doctors.find((doc) => doc._id === doctor._id)?.maximum})
        </li>
      );
    } else {
      return null;
    }
  }

  // Überschreitung der Gruppenhöchstzahl
  function checkGroups(day, doctors, config, index) {
    const conflictElements = [];
    config.groups.forEach((group) => {
      let counter = 0;
      const dutyColumns = Object.keys(day.dutyColumns);
      dutyColumns.forEach((dutyColumn) => {
        if (
          day.dutyColumns[dutyColumn].some(
            (doctorId) =>
              doctors
                .find((doctor) => doctor._id === doctorId)
                ?.groups.includes(group.name) &&
              !group.exclusion.includes(day.date.getDay())
          )
        ) {
          counter += 1;
        }
      });
      if (counter > group.maximum) {
        conflictElements.push(
          <li className="text-red-500" key={index}>
            Am {day.date.getDate()}. sind zu viele aus "{group.name}"
          </li>
        );
      }
    });
    return conflictElements;
  }

  // Kurzer Wechsel
  function checkShortShift(doctor, roster, index) {
    const conflictElements = [];
    const dutys = [];
    roster.days.forEach((day) => {
      const dutyColumns = Object.keys(day.dutyColumns);
      dutyColumns.forEach((dutyColumn) => {
        if (day.dutyColumns[dutyColumn].includes(doctor._id)) {
          dutys.push(day.date.getDate());
        }
      });
    });
    for (let i = 0; i < dutys.length - 1; i++) {
      if (dutys[i] === dutys[i + 1] - 2) {
        conflictElements.push(
          <li className="text-yellow-500" key={index + i}>
            {doctor.name} hat einen kurzen Wechsel ({dutys[i]}. zu{" "}
            {dutys[i + 1]}.)
          </li>
        );
      }
    }
    return conflictElements;
  }

  // 2 Wochenenden in Folge
  function checkWeekendsSpacing(doctor, roster, index) {
    const conflictElements = [];
    const weekendDays = [5, 6, 0]; // Freitag, Samstag, Sonntag (0-basiert)

    const dutys = [];
    roster.days.forEach((day) => {
      const dutyColumns = Object.keys(day.dutyColumns);
      dutyColumns.forEach((dutyColumn) => {
        if (day.dutyColumns[dutyColumn].includes(doctor._id) && day.value > 1) {
          dutys.push(day.date);
        }
      });
    });

    for (let i = 0; i < dutys.length - 1; i++) {

      if (
        dutys[i + 1].getTime() - dutys[i].getTime() > 4 * 24 * 60 * 60 * 1000 &&
        dutys[i + 1].getTime() - dutys[i].getTime() < 12 * 24 * 60 * 60 * 1000
      ) {
        conflictElements.push(
          <li className="text-red-500" key={index + i + "1"}>
            {doctor.name} hat an zwei aufeinanderfolgenden Wochenenden Dienst (
            {dutys[i].toLocaleDateString()} und{" "}
            {dutys[i + 1].toLocaleDateString()})
          </li>
        );
      }
    }

    return conflictElements;
  }

  // Mehr als 2 Wochenenden im Monat
  function checkWeekendCount(doctor, roster, index) {
    const conflictElements = [];
    const weekendDays = [5, 6, 0]; // Freitag, Samstag, Sonntag (0-basiert)

    const weekendDutys = [];
    roster.days.forEach((day) => {
      const dutyColumns = Object.keys(day.dutyColumns);
      dutyColumns.forEach((dutyColumn) => {
        if (
          weekendDays.includes(day.date.getDay()) &&
          day.dutyColumns[dutyColumn].includes(doctor._id)
        ) {
          weekendDutys.push(day.date);
        }
      });
    });

    const weekendsCount = countWeekends(weekendDutys);

    if (weekendsCount > 2) {
      conflictElements.push(
        <li className="text-cyan-400" key={index + "weekends"}>
          {doctor.name} hat mehr als 2 Wochenenddienste ({weekendsCount}{" "}
          Dienste)
        </li>
      );
    }

    return conflictElements;
  }

  // Funktion zum Zählen der Wochenenden im Monat
  function countWeekends(dates) {
    const uniqueMonths = new Set(dates.map((date) => date.getMonth()));
    let count = 0;

    uniqueMonths.forEach((month) => {
      const monthDates = dates.filter((date) => date.getMonth() === month);
      const weekendsInMonth = groupDatesByWeekend(monthDates);
      count += weekendsInMonth.size;
    });

    return count;
  }

  // Funktion zum Gruppieren von Datumsobjekten nach Wochenenden
  function groupDatesByWeekend(dates) {
    const weekendDays = [5, 6, 0]; // Freitag, Samstag, Sonntag (0-basiert)
    const weekends = new Map();

    dates.forEach((date) => {
      const dayOfWeek = date.getDay();
      if (weekendDays.includes(dayOfWeek)) {
        const key = date.toISOString().slice(0, 10); // Datum als Schlüssel
        if (!weekends.has(key)) {
          weekends.set(key, []);
        }
        weekends.get(key).push(date);
      }
    });

    return weekends;
  }

  // In falscher Dienstreihe eingetragen
  function checkDutyColumn(doctor, roster, index) {
    const conflictElements = [];

    roster.days.forEach((day) => {
      const dutyColumns = Object.keys(day.dutyColumns);

      dutyColumns.forEach((dutyColumn) => {
        if (day.dutyColumns[dutyColumn].includes(doctor._id)) {
          if (!doctor.dutyColumns.includes(dutyColumn)) {
            conflictElements.push(
              <li className="text-green-500" key={index + dutyColumn}>
                {doctor.name} ist am {day.date.getDate()}. für "{dutyColumn}"
                eingeteilt (Dienstreihe nicht zugewiesen)
              </li>
            );
          }
        }
      });
    });

    return conflictElements;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mt-8 mb-4 font-bold">{`Übersicht der Konflikte für ${formatDate(
        roster.month,
        roster.year
      )}`}</h1>
      <ul>
        {roster.doctors.map((doctor) => checkMaximum(doctors, doctor, roster))}
        {roster.days.map((day, index) =>
          checkGroups(day, doctors, config, index)
        )}
        {roster.doctors.map((doctor, index) => (
          <>
            {checkShortShift(doctor, roster, index)}
            {checkWeekendsSpacing(doctor, roster, index)}
            {checkDutyColumn(doctor, roster, index)}
            {checkWeekendCount(doctor, roster, index)}
          </>
        ))}
      </ul>
    </div>
  );
}
