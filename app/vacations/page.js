"use client";
import React, { useState, useEffect } from "react";
import { usePageContext } from "../context/pageContext";
import DaysRangePicker from "../components/DaysRangePicker";
import ButtonCyan from "../components/ButtonCyan";
import MonthPicker from "./components.js/MonthPicker";

export default function Vacations() {
  const { doctors, vacations, setvacations } = usePageContext();
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);

  // Funktion zum Aktualisieren von Jahr und Monat in der übergeordneten Komponente
  const handleMonthChange = (selectedMonth, selectedYear) => {
    setSelectedMonth(selectedMonth);
    setSelectedYear(selectedYear);
  };

  // Funktion um Ärzte aus der Datenbank in den aktuellen Monat einzufügen und vorhandene zu aktualisieren
  const handleClick = () => {
    console.log(vacations);
    console.log(doctors)
    // Hier kommt noch Code rein
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="text-center mt-4">
        <h1 className="text-3xl font-bold"> Urlaubsplan </h1>
      </div>
      <MonthPicker onChange={handleMonthChange} />
      <ButtonCyan className="mt-4" onClick={handleClick} text="Ärzte aus Datenbank einfügen und aktualisieren" />
    </div>
  );
}
