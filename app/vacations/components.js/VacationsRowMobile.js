"use client";
import React, { useState, useEffect } from "react";
import { usePageContext } from "@/app/context/pageContext";
import Vacation from "@/app/models/Vacation";

export default function VacationsRowMobile({ doctor, year, month, index }) {
  const { vacations, setVacations, user } = usePageContext();
  const [mouseDown, setMouseDown] = useState(false);
  const [showVacationDays, setShowVacationDays] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Erstelle das Array "days" und fülle es mit den Date()-Objekten für jeden Tag des Monats
  const days = Array.from(
    { length: new Date(year, month + 1, 0).getDate() },
    (_, i) => {
      return new Date(Date.UTC(year, month, i + 1));
    }
  );

  function dayEntryClass(day, doctor) {
    const isSelected = selectedDoctor === doctor._id && dateInArray(day, selectedDays);
    const isVacation = vacations.some(
      (vacation) => vacation.date.getTime() === day.getTime() && vacation.doctorId === doctor._id
    );
  
    return `w-[90%] h-10 rounded-sm ml-1 cursor-pointer ${
      isVacation ? "bg-cyan-600 hover:bg-cyan-700" : "bg-slate-500 hover:bg-slate-600"
    } ${isSelected ? "ring ring-orange-500" : ""} ${day.getDay() === 0 || day.getDay() === 6 ? "opacity-40" : ""}`;
  }

  useEffect(() => {
    function handleWindowMouseUp() {
      if (mouseDown) {
        // Wenn die Maustaste außerhalb des Components losgelassen wird,
        // setze die States zurück
        setMouseDown(false);
        setSelectedDays([]);
        setSelectedDoctor(null);
      }
    }

    window.addEventListener("mouseup", handleWindowMouseUp);

    // Wichtig: Entferne den Event Listener, wenn die Komponente entladen wird
    return () => {
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [mouseDown]);

  // Hilfsfunktion, um zu prüfen, ob ein Date-Objekt in einem Array enthalten ist
  function dateInArray(date, array) {
    for (const item of array) {
      if (item.getTime() === date.getTime()) {
        return true;
      }
    }
    return false;
  }

  function toggleVacationDays() {
    setShowVacationDays((prevState) => !prevState);
  }

  function handleMouseDown(day, doctor) {
    setMouseDown(true);
    if (selectedDoctor === doctor._id) {
      // Füge den ausgewählten Tag hinzu, wenn er noch nicht im Array ist
      if (selectedDays.indexOf(day) === -1) {
        setSelectedDays((prev) => [...prev, day]);
      }
    } else {
      // Setze den ausgewählten Arzt und den ausgewählten Tag neu
      setSelectedDoctor(doctor._id);
      setSelectedDays([day]);
    }
  }

  function handleMouseUp(day, doctor) {
    setMouseDown(false);

    // Überprüfe, ob die ausgewählten Tage bereits in den Urlauben für den ausgewählten Arzt vorhanden sind
    const existingVacations = selectedDays.map((selectedDay) =>
      vacations.find(
        (vacation) =>
          vacation.date.getTime() === selectedDay.getTime() && vacation.doctorId === doctor._id
      )
    );

    // Wenn alle ausgewählten Tage vorhanden sind, lösche sie
    if (selectedDoctor === doctor._id && existingVacations.every((vacation) => vacation)) {
      selectedDays.forEach((selectedDay) => {
        const vacationToDelete = vacations.find(
          (vacation) =>
            vacation.date.getTime() === selectedDay.getTime() && vacation.doctorId === doctor._id
        );
        if (vacationToDelete) {
          vacationToDelete.deleteSelf();
        }
      });
    } else {
      // Füge die ausgewählten Tage hinzu, falls sie noch nicht vorhanden sind
      selectedDays.forEach((selectedDay) => {
        const vacationExists = vacations.some(
          (vacation) =>
            vacation.date.getTime() === selectedDay.getTime() && vacation.doctorId === doctor._id
        );

        if (!vacationExists) {
          new Vacation({
            date: selectedDay,
            userGroupId: doctor.userGroupId,
            doctorId: doctor._id,
            setParentArray: setVacations,
          });
        }
      });
    }

    setSelectedDays([]);
    setSelectedDoctor(null);
  }

  // Handle MouseOver to select multiple days while the mouse is held down
  function handleMouseOver(day, doctor) {
    if (mouseDown && selectedDoctor === doctor._id) {
      const firstIndex = days.findIndex((d) => d.getTime() === selectedDays[0].getTime());
      const currentIndex = days.findIndex((d) => d.getTime() === day.getTime());

      // Wenn der aktuelle Tag rechts von der ersten Auswahl liegt, füge alle Tage zwischen dem ersten Tag und dem aktuellen Tag hinzu
      if (currentIndex > firstIndex) {
        setSelectedDays(days.slice(firstIndex, currentIndex + 1));
      }
      // Wenn der aktuelle Tag links von der ersten Auswahl liegt, füge alle Tage zwischen dem aktuellen Tag und dem ersten Tag hinzu
      else {
        setSelectedDays(days.slice(currentIndex, firstIndex + 1));
      }
    }
  }

  const background = index % 2 === 0 ? "" : "bg-slate-800";
  return (
    <tr className={`hover:bg-slate-600 ${background}`}>
      <td>
        <div className="px-4 py-2 text-center cursor-pointer select-none" onClick={toggleVacationDays}>
          {doctor.name}
        </div>
        {showVacationDays && (
          <div className="px-4 py-2 text-center select-none flex flex-col gap-1 items-center justify-center">
            {days.map((day) => (
              <div
                className={dayEntryClass(day, doctor)}
                key={day.getDate()}
                onMouseDown={() => (user.isAdmin || doctor._id === user._id) && handleMouseDown(day, doctor)}
                onMouseUp={() => (user.isAdmin || doctor._id === user._id) && handleMouseUp(day, doctor)}
                onMouseOver={() => (user.isAdmin || doctor._id === user._id) && handleMouseOver(day, doctor)}
              >
                <div className="flex items-center justify-center h-full">
                  {day.getDate()}
                </div>
              </div>
            ))}
          </div>
        )}
      </td>
    </tr>
  );
}
