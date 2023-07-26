import React from "react";

export default function DoctorInput({
  dutyColumn,
  roster,
  day,
  handleFocus,
  background,
}) {
  const doctorIds = day.dutyColumns[dutyColumn];
  const doctorNames = doctorIds
    .map((doctorId) => {
      const doctor = roster.doctors.find((doc) => doc._id === doctorId);
      return doctor ? doctor.name : "";
    })
    .filter(Boolean)
    .join(" / ");

  return (
    <div
      className={`w-full p-1 rounded-md focus:outline-none bg-${background} border-none cursor-pointer`}
      onClick={() => handleFocus(dutyColumn)}
      style={{ whiteSpace: "nowrap" }} // Verhindert Zeilenumbruch
    >
      {doctorNames || "\u00A0"} {/* Verwende ein Leerzeichen, um die Zelle zu füllen, wenn doctorNames leer ist */}
    </div>
  );
}
