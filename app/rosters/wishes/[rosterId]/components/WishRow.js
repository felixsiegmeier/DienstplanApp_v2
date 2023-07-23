"use client"
import { useState, useEffect } from "react";
import { usePageContext } from "@/app/context/pageContext";
import React from "react";

export default function WishRow({ doctor, index, roster }) {
  const { user, vacations } = usePageContext();
  const [mouseDown, setMouseDown] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Erstelle das Array "days", welches alle Daten des Monats enhält
  const days = roster.days.map(day => day.date);

  // Definiert die Hintergrundfarbe der Tabellenzeile für wechselndes Muster
  const background = index % 2 === 0 ? "" : "bg-slate-800";

  // Definiere eine separate CSS-Klasse für die Tageseinträge
  function dayEntryClass(day, doctor) {
    const isSelected = selectedDoctor === doctor._id && dateInArray(day, selectedDays);
    const isVacation = vacations.some(
      (vacation) => vacation.date.getTime() === day.getTime() && vacation.doctorId === doctor._id
    );
    const isBlacklisted = doctor?.blacklist?.some(wish => wish.getTime() === day.getTime());
    const isGreenlisted = doctor?.greenlist?.some(wish => wish.getTime() === day.getTime());
  
    let bgColorClass = "bg-slate-500 hover:bg-slate-600";
    let ringColorClass = "";
  
    if (isBlacklisted) {
      bgColorClass = "bg-red-500 hover:bg-red-600";
    } else if (isGreenlisted) {
      bgColorClass = "bg-green-500 hover:bg-green-600";
    } else if (isVacation) {
      bgColorClass = "bg-pink-500 hover:bg-pink-600";
    }
  
    if (isSelected) {
      ringColorClass = "ring ring-orange-500";
    }
  
    const opacityClass = day.getDay() === 0 || day.getDay() === 6 || roster.days.find(d => d.date.getTime() === day.getTime()).holiday ? "opacity-40" : "";
  
    return `w-8 h-8 rounded-sm mx-1 cursor-pointer flex items-center justify-center ${bgColorClass} ${ringColorClass} ${opacityClass}`;
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
    const selectedDaysCount = selectedDays.length;
  
    // Funktion zum Prüfen, ob ein Tag in der Blacklist enthalten ist
    const isInBlacklist = (checkDay) =>
      doctor.blacklist.some((blacklistDay) => blacklistDay.getTime() === checkDay.getTime());
  
    // Funktion zum Prüfen, ob ein Tag in der Greenlist enthalten ist
    const isInGreenlist = (checkDay) =>
      doctor.greenlist.some((greenlistDay) => greenlistDay.getTime() === checkDay.getTime());
  
    if (selectedDaysCount > 1) {
      // Bei Auswahl mehrerer Tage
      const allDaysInBlacklist = selectedDays.every((selectedDay) => isInBlacklist(selectedDay));
  
      if (!allDaysInBlacklist) {
        // Füge die fehlenden Tage zur Blacklist hinzu und entferne sie aus der Greenlist
        selectedDays.forEach((selectedDay) => {
          if (!isInBlacklist(selectedDay)) {
            doctor.addToDoctorBlacklist(selectedDay);
          }
        });
      } else {
        // Entferne alle ausgewählten Tage von der Blacklist
        selectedDays.forEach((selectedDay) => {
          doctor.removeFromDoctorBlacklist(selectedDay);
        });
      }
    } else {
      // Bei Auswahl eines einzelnen Tages
      const selectedDay = selectedDays[0];
  
      if (!isInBlacklist(selectedDay)) {
        if (!isInGreenlist(selectedDay)) {
          // Füge den Tag zur Blacklist hinzu
          doctor.addToDoctorBlacklist(selectedDay);
        } else {
          // Entferne den Tag von der Greenlist
          doctor.removeFromDoctorGreenlist(selectedDay);
        }
      } else {
        // Entferne den Tag von der Blacklist und füge ihn zur Greenlist hinzu
        doctor.addToDoctorGreenlist(selectedDay);
      }
    }
  
    setSelectedDays([]);
    setSelectedDoctor(null);
  }
  

  // Handle MouseOver to select multiple days while the mouse is held down
  function handleMouseOver(day, doctor) {
    if (mouseDown && selectedDoctor === doctor._id) {
      const firstIndex = days.findIndex(
        (d) => d.getTime() === selectedDays[0].getTime()
      );
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

  return (
    <tr className={`select-none transition-all duration-300 ${background}`}>
      <td className="px-4 py-2 text-center">{doctor.name}</td>
      <td className="px-4 py-2 text-center flex justify-center">
        {days.map((day) => (
          <div
            className={dayEntryClass(day, doctor)}
            key={day.getDate()}
            onMouseDown={() => {
              (user.isAdmin || doctor._id === user._id) &&
                handleMouseDown(day, doctor);
            }}
            onMouseUp={() => {
              (user.isAdmin || doctor._id === user._id) &&
                handleMouseUp(day, doctor);
            }}
            onMouseOver={() => {
              (user.isAdmin || doctor._id === user._id) &&
                handleMouseOver(day, doctor);
            }}
          >
            {day.getDate()}
          </div>
        ))}
      </td>
    </tr>
  );
}
