import React from "react";
import { usePageContext } from "@/app/context/pageContext";
import { useState } from "react";

export default function AvailabilityGridRow({ doctor, index, roster }) {
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
    null
    }

  return (
    <tr className={`select-none transition-all duration-300 ${background}`}>
      <td className="px-4 py-2 text-center">{doctor.name}</td>
      <td className="px-4 py-2 text-center flex justify-center">
        {days.map((day) => {return (
          <div>
          <div
            className={dayEntryClass(day, doctor)}
            onClick={() => handleClick(day, doctor)}
            key={day.date.getDate()}
          >
            {day.date.getDate()}
          </div>
          </div>
        )
        }
        )}
      </td>
    </tr>
  );
}
