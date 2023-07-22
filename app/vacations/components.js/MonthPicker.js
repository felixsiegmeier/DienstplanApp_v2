import React, { useState, useEffect } from "react";
import LeftButton from "@/app/components/LeftButton";
import RightButton from "@/app/components/RightButton";

const MonthPicker = ({ onChange }) => {
  // Monatsnamen für die Anzeige
  const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  // State-Hooks für Monat und Jahr
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  // useEffect-Hook, um den aktuellen Monat und das Jahr beim ersten Laden der Komponente zu setzen
  useEffect(() => {
    const d = new Date();
    setMonth(d.getMonth());
    setYear(d.getFullYear());
  }, []);

  // useEffect-Hook, um die Anzeige von Monat und Jahr zu aktualisieren, wenn sich der Monat oder das Jahr ändern
  useEffect(() => {
    const d = new Date(year, month);
    const monthName = months[d.getMonth()];
    const formattedYear = d.getFullYear();
    // Die Werte für Monat und Jahr werden über die onChange-Prop an die übergeordnete Komponente weitergegeben
    onChange(month, formattedYear);
  }, [month, year, months, onChange]);

  // Funktion zum Verringern des Monats
  function handleMonthDown() {
    if (month === 0) {
      // Wenn der aktuelle Monat Januar ist, setze das Jahr auf das vorherige Jahr und den Monat auf Dezember
      setYear((prevYear) => prevYear - 1);
      setMonth(11);
    } else {
      // Ansonsten verringere den Monat um 1
      setMonth((prevMonth) => prevMonth - 1);
    }
  }

  // Funktion zum Erhöhen des Monats
  function handleMonthUp() {
    if (month === 11) {
      // Wenn der aktuelle Monat Dezember ist, setze das Jahr auf das nächste Jahr und den Monat auf Januar
      setYear((prevYear) => prevYear + 1);
      setMonth(0);
    } else {
      // Ansonsten erhöhe den Monat um 1
      setMonth((prevMonth) => prevMonth + 1);
    }
  }

  return (
    <div className="flex justify-center mt-4">
      <div className="flex items-center w-60">
        <LeftButton onClick={handleMonthDown} />
        <div className="px-2 text-slate-200 w-36 text-center">
          {months[month]} {year}
        </div>
        <RightButton onClick={handleMonthUp} />
      </div>
    </div>
  );
};

export default MonthPicker;
