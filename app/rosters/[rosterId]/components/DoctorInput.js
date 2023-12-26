import React from "react";

export default function DoctorInput({
  dutyColumn,
  roster,
  day,
  handleFocus,
}) {
  const doctorIds = day.dutyColumns[dutyColumn];
  const doctorNames = doctorIds
    .map((doctorId) => {
      const doctor = roster.doctors.find((doc) => doc._id === doctorId);
      return doctor ? doctor.name : (doctorIds.length > 1 ? "?" : "");
    })
    .filter(Boolean)
    .join(" / ");

    const freeDays = () => {
      if(day.date.getDay() === 0) return true;
      if(day.date.getDay() === 6) return true;
      if(day.holiday) return true;
      return false; 
    }

  return (
    <div
      className={`w-full focus:outline-none pr-2 pl-2 text-slate-300 text-md border-none cursor-pointer ${freeDays() ? "bg-slate-900" : "bg-slate-800"}`}
      onClick={() => handleFocus(dutyColumn)}
      style={{ whiteSpace: "nowrap" }} // Verhindert Zeilenumbruch
    >
      {doctorNames || "\u00A0"} {/* Verwende ein Leerzeichen, um die Zelle zu füllen, wenn doctorNames leer ist */}
    </div>
  );
}
