import React from "react";
import { usePageContext } from "@/app/context/pageContext";

export default function RosterGridRow({ doctor, index, roster }) {
  const { user, config } = usePageContext();

  // Erstelle das Array "days", welches alle Daten des Monats enhält
  const days = roster.days.map((day) => day.date);

  // Definiert die Hintergrundfarbe der Tabellenzeile für wechselndes Muster
  const background = index % 2 === 0 ? "" : "bg-slate-800";

  const isVacation = (day) =>
    day.vacations.some((vacation) => vacation.doctorId === doctor._id);

  const isBlacklisted = doctor.blacklist.some(
    (blacklistDay) => blacklistDay.getTime() === day.date.getTime()
  );
  const isGreenlisted = doctor.greenlist.some(
    (greenlistDay) => greenlistDay.getTime() === day.date.getTime()
  );

  const dutyColumns = day.dutyColumns;
  const assignedColumnIndex = dutyColumns.findIndex((col) =>
    col.includes(doctor._id)
  );

  const bgColorClass = isBlacklisted
    ? "bg-red-500 hover:bg-red-600"
    : isGreenlisted
    ? "bg-green-500 hover:bg-green-600"
    : isVacation
    ? "bg-pink-500 hover:bg-pink-600"
    : assignedColumnIndex !== -1
    ? "bg-cyan-500 hover:bg-cyan-600"
    : "bg-slate-500 hover:bg-slate-600";

  const handleClick = async (day) => {
    const columnNames = Object.keys(dutyColumns);
    const doctorId = doctor._id;

    for (const column of columnNames) {
      const columnIndex = dutyColumns[column].indexOf(doctorId);

      if (columnIndex !== -1) {
        // If the doctor is already assigned, remove them from the dutyColumn
        dutyColumns[column].splice(columnIndex, 1);
        await day.updateDuty(column, dutyColumns[column]);
        return;
      }
    }

    // Find the first compatible dutyColumn to assign the doctor
    let targetColumn;
    for (const column of columnNames) {
      if (
        doctor.dutyColumns.includes(column) &&
        dutyColumns[column].length === 0
      ) {
        targetColumn = column;
        break;
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
      dutyColumns[targetColumn].push(doctorId);
      await day.updateDuty(targetColumn, dutyColumns[targetColumn]);
    }
  };

  return (
    <tr className={`select-none transition-all duration-300 ${background}`}>
      <td className="px-4 py-2 text-center">{doctor.name}</td>
      <td className="px-4 py-2 text-center flex justify-center">
        {days.map((day) => (
          <div
            className={`w-8 h-8 rounded-sm mx-1 cursor-pointer flex items-center justify-center ${bgColorClass}`}
            onClick={() => handleClick(day)}
            key={day.getDate()}
          >
            {day.getDate()}
          </div>
        ))}
      </td>
    </tr>
  );
}
