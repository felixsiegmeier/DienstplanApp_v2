import React from "react";

export default function DoctorInput({ dutyColumn, roster, day, values, handleFocus, background }) {
  const doctorIds = day.dutyColumns[dutyColumn.name];
  const doctorNames = doctorIds
    .map((doctorId) => {
      const doctor = roster.doctors.find((doc) => doc._id === doctorId);
      return doctor ? doctor.name : "";
    })
    .filter(Boolean)
    .join(" / ");

  return (
    <input
      type="text"
      className={`w-full p-1 rounded-md focus:outline-none bg-${background} border-none cursor-pointer`}
      value={values[dutyColumn.name] || doctorNames}
      readOnly
      onFocus={() => handleFocus(dutyColumn.name)}
    />
  );
}
