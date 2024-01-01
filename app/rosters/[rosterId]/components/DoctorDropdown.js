import React, { useEffect, useRef, useState, useMemo } from "react";
import { usePageContext } from "@/app/context/pageContext";

export default function DoctorDropdown({ roster, day, activeField, setActiveField, background }) {
  const dropdownRef = useRef(null);
  const { vacations, user } = usePageContext();
  const [selectedDoctors, setSelectedDoctors] = useState([]);

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

  const textColorClass = (doctor) => {
    if (isGreenListed(doctor, day)) return "text-green-600";
    if (isBlackListedOrOnVacation(doctor, day)) return "line-through";
    if (isRed(doctor, day)) return "text-red-600";
    if (isYellow(doctor, day)) return "text-yellow-600";
    return "";
  };

  const isGreenListed = (doctor, day) => {
    return doctor?.greenlist?.some((greenlistDay) => greenlistDay.getTime() === day.date.getTime());
  };

  const isBlackListedOrOnVacation = (doctor, day) => {
    return (
      doctor?.blacklist?.some((blacklistDay) => blacklistDay.getTime() === day.date.getTime()) ||
      vacations.some((vacation) => vacation.date.getTime() === day.date.getTime() && vacation.doctorId === doctor._id)
    );
  };

  const isRed = (doctor, day) => {
    const previousDay = new Date(day.date);
    previousDay.setDate(day.date.getDate() - 1);
    const nextDay = new Date(day.date);
    nextDay.setDate(day.date.getDate() + 1);

    return (
      //doctor.dutyColumns.some((column) => day.dutyColumns[column]?.includes(doctor._id)) ||
      doctor?.dutyColumns.some((column) => {
        const prevDayDuties = roster.days.find((day) => day.date.getTime() === previousDay.getTime())?.dutyColumns[column];
        const nextDayDuties = roster.days.find((day) => day.date.getTime() === nextDay.getTime())?.dutyColumns[column];
        return (prevDayDuties && prevDayDuties.includes(doctor._id)) || (nextDayDuties && nextDayDuties.includes(doctor._id));
      })
    );
  };

  const isYellow = (doctor, day) => {
    const twoDaysBefore = new Date(day.date);
    twoDaysBefore.setDate(day.date.getDate() - 2);
    const twoDaysAfter = new Date(day.date);
    twoDaysAfter.setDate(day.date.getDate() + 2);

    return (
      doctor?.dutyColumns.some((column) => {
        const twoDaysBeforeDuties = roster.days.find((day) => day.date.getTime() === twoDaysBefore.getTime())?.dutyColumns[column];
        const twoDaysAfterDuties = roster.days.find((day) => day.date.getTime() === twoDaysAfter.getTime())?.dutyColumns[column];
        return (twoDaysBeforeDuties && twoDaysBeforeDuties.includes(doctor._id)) || (twoDaysAfterDuties && twoDaysAfterDuties.includes(doctor._id));
      })
    );
  };

  const canTakeDuty = (doctor) => {
    // Überprüfen, ob der Doctor die Dienstreihe belegen kann
    return doctor?.dutyColumns.includes(activeField);
  };

  const handleDoctorClick = (doctor) => {
    if (selectedDoctors.length === 0) {
        //handleSelectDoctor(activeField, doctor._id);
        day.updateDuty({dutyColumn: activeField, assignment: doctor._id, user: user})
      setSelectedDoctors([doctor.name]);
      setTimeout(() => {
        setActiveField(null);
      }, 5000);
    } else if (selectedDoctors.length === 1) {
        //handleSelectDoctor(activeField, `/${doctor._id}`)
        day.updateDuty({dutyColumn: activeField, assignment: `/${doctor._id}`, user: user})
      setSelectedDoctors((prevSelected) => [...prevSelected, doctor.name]);
      setTimeout(() => {
        setActiveField(null);
      }, 200);
    }
  };

  const sortedDoctors = useMemo(() => {
    const getColorPriority = (doctor) => {
      if (isGreenListed(doctor, day)) return 1;
      if (!canTakeDuty(doctor)) return 6;
      if (isRed(doctor, day)) return 3;
      if (isYellow(doctor, day)) return 4;
      if (isBlackListedOrOnVacation(doctor, day)) return 5;
      return 2;
    };

    return roster.doctors.slice().sort((a, b) => {
      const colorPriorityA = getColorPriority(a);
      const colorPriorityB = getColorPriority(b);

      // Sortiere nach Farbpriorität
      return colorPriorityA - colorPriorityB;
    });
  }, [roster.doctors]);
  

  return (
    <div className={`bg-${background} border rounded-md absolute mt-2 w-full shadow-md z-10 h-80 overflow-y-auto`} ref={dropdownRef}>
    <div
          key={"???"}
          className={`p-2 cursor-pointer select-none ${selectedDoctors.includes("???") ? "bg-cyan-800" : ""} hover:bg-slate-500`}
          onClick={() => handleDoctorClick({name: "???", _id: "???"})}
        >
          ???
        </div>
      {sortedDoctors.map((doctor) => {
        if(doctor.isManager) return
        return <div
          key={doctor._id}
          className={`p-0.5 cursor-pointer select-none ${textColorClass(doctor)} ${
            canTakeDuty(doctor) ? "" : "opacity-50"
          } ${selectedDoctors.includes(doctor.name) ? "bg-cyan-800" : ""} hover:bg-slate-500`}
          onClick={() => handleDoctorClick(doctor)}
        >
          {doctor.name}
        </div>
      })}
    </div>
  );
}
