import React from "react";
import { usePageContext } from "@/app/context/pageContext";

export default function RosterGridRow({ doctor, index, roster }) {
  const { user, config, vacations } = usePageContext();

  // Erstelle das Array "days", welches alle Daten des Monats enhält
  const days = roster.days

  // Definiert die Hintergrundfarbe der Tabellenzeile für wechselndes Muster
  const background = index % 2 === 0 ? "" : "bg-slate-800";

  function dayEntryClass(day, doctor) {

    const isVacation = vacations.some(
        (vacation) => vacation.date.getTime() === day.date.getTime() && vacation.doctorId === doctor._id
      );

      const isBlacklisted = doctor?.blacklist?.some(blacklistDay => blacklistDay.getTime() === day.date.getTime());

      const isGreenlisted = doctor?.greenlist?.some(greenlistDay => greenlistDay.getTime() === day.date.getTime());

    const isDoctorAssigned = Object.values(day.dutyColumns).some(
        (columnArray) => columnArray.includes(doctor._id)
      );

    const isFreeDay =  day.date.getDay() === 0 || day.date.getDay() === 6 || day.holiday ? "opacity-40" : ""

    const bgColorClass = isDoctorAssigned
    ? "bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700"
    : isBlacklisted
    ? "bg-red-500 hover:bg-red-600 active:bg-red-700"
    : isGreenlisted
    ? "bg-green-500 hover:bg-green-600 active:bg-green-700"
    : isVacation
    ? "bg-pink-500 hover:bg-pink-600 active:bg-pink-700"
    : "bg-slate-500 hover:bg-slate-600 active:bg-slate-700";
  
    return `w-8 h-8 rounded-sm mx-1 cursor-pointer flex items-center justify-center ${bgColorClass} ${isFreeDay}`;
  }

  const handleClick = async (day, doctor) => {
    const columnNames = Object.keys(day.dutyColumns);
    const doctorId = doctor._id;

    for (const column of columnNames) {
      const columnIndex = day.dutyColumns[column].indexOf(doctorId);

      if (columnIndex !== -1) {
        // If the doctor is already assigned, remove them from the dutyColumn
        day.dutyColumns[column].splice(columnIndex, 1);
        await day.updateDuty(column, day.dutyColumns[column]);
        return;
      }
    }

    // Find the first compatible dutyColumn to assign the doctor
    let targetColumn;
    for (const column of columnNames) {
      if (
        doctor.dutyColumns.includes(column) &&
        day.dutyColumns[column].length === 0
      ) {
        targetColumn = column;
        break;
      }
    }

    if (!targetColumn) {
        for (const column of columnNames) {
            if (
              doctor.dutyColumns.includes(column) &&
              day.dutyColumns[column].length === 1
            ) {
              targetColumn = column;
              break;
            }
          }
      }

    if (!targetColumn) {
      for (const column of columnNames) {
        if (doctor.dutyColumns.includes(column)) {
          targetColumn = column;
          break;
        }
      }
    }

    if (targetColumn) {
        day.dutyColumns[targetColumn].push(doctorId);
      await day.updateDuty(targetColumn, day.dutyColumns[targetColumn]);
    }
  };

  return (
    <tr className={`select-none transition-all duration-300 ${background}`}>
      <td className="px-4 py-2 text-center">{doctor.name}</td>
      <td className="px-4 py-2 text-center flex justify-center">
        {days.map((day) => (
          <div
            className={dayEntryClass(day, doctor)}
            onClick={() => handleClick(day, doctor)}
            key={day.date.getDate()}
          >
            {day.date.getDate()}
          </div>
        ))}
      </td>
    </tr>
  );
}
