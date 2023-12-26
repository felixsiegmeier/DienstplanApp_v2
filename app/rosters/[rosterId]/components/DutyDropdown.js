import { usePageContext } from "@/app/context/pageContext";
import React, { useEffect, useRef } from "react";

export default function DutyDropDown({ roster, day, activeField, setActiveField, doctor }) {
  const dropdownRef = useRef(null);
  const { user } = usePageContext();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveField(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const canTakeDuty = (dutyColumn) => {
    // Überprüfen, ob der Doctor die Dienstreihe belegen kann
    return doctor?.dutyColumns.includes(dutyColumn);
  };

  const handleClick = async (dutyColumn) => {
    day.updateDuty({dutyColumn: dutyColumn, assignment: doctor._id, user: user});
    setActiveField(null)
  };

  const doctorNames = (doctorIds) => {
    const names = doctorIds.map((doctorId) => {
        const doctor = roster.doctors.find((doc) => doc._id === doctorId);
        return doctor ? doctor.name : (doctorIds.length > 1 ? "?" : "");
      })
      .filter(Boolean)
      .join(" / ");
    return names
  }

  return (
    <div className={`bg-slate-600 border rounded-md absolute mt-2 p-4 w-[min] h-min shadow-md z-10 overflow-y-auto`} ref={dropdownRef}>
    <h1 className="text-xl font-bold underline mb-3">{doctor.name} am {day.date.getDate()}.{day.date.getMonth()+1}.</h1>
      {Object.keys(day.dutyColumns).map((dutyColumn, index) => {
        return <div
          key={index}
          className={`text-lg p-0.5 cursor-pointer select-none ${
            canTakeDuty(dutyColumn) ? "" : "opacity-50"
          } hover:bg-slate-500`}
          onClick={() => handleClick(dutyColumn)}
        >
          {dutyColumn}
          <br/>
          <p className="text-sm">{(day.dutyColumns[dutyColumn].length > 0) && `(${doctorNames(day.dutyColumns[dutyColumn])})`}</p>
        </div>
      })}
    </div>
  );
}
