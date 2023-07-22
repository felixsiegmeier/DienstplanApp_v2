"use client";
import { usePageContext } from "@/app/context/pageContext";
import Vacation from "@/app/models/Vacation";
import { useState, useEffect } from "react";

export default function VacationsRow({ doctor, year, month, index }) {
  const { vacations, setVacations } = usePageContext();
  const [mouseDown, setMouseDown] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Erstelle das Array "days" und fülle es mit den Date()-Objekten für jeden Tag des Monats
  const days = Array.from(
    { length: new Date(year, month + 1, 0).getDate() },
    (_, i) => {
      return new Date(Date.UTC(year, month, i + 1));
    }
  );

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
    <tr className={`select-none transition-all duration-300 ${background}`}>
      <td className="px-4 py-2 text-center">{doctor.name}</td>
      <td className="px-4 py-2 text-center">
        {days.map((day) => (
          <div
            className={`w-6 h-6 rounded-sm ml-1 inline-flex justify-center cursor-pointer ${
              vacations.some(
                (vacation) =>
                  vacation.date.getTime() === day.getTime() &&
                  vacation.doctorId === doctor._id
              )
                ? "bg-cyan-600 hover:bg-cyan-700"
                : "bg-slate-500 hover:bg-slate-600"
            } ${
              selectedDoctor === doctor._id && dateInArray(day, selectedDays)
                ? "ring ring-orange-500"
                : ""
            } ${day.getDay() === 0 || day.getDay() === 6 ? "opacity-40" : ""}`}
            key={day.getDate()}
            onMouseDown={() => handleMouseDown(day, doctor)}
            onMouseUp={() => handleMouseUp(day, doctor)}
            onMouseOver={() => handleMouseOver(day, doctor)}
          >
            {day.getDate()}
          </div>
        ))}
      </td>
    </tr>
  );
}
