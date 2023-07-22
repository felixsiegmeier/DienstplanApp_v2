"use client";
import React, { useState } from "react";
import MonthPicker from "./components.js/MonthPicker";
import VacationsTable from "./components.js/VacationsTable";
import { usePageContext } from "@/app/context/pageContext";
import ButtonCyan from "../components/ButtonCyan";

export default function Vacations() {
  const {vacations} = usePageContext();
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);

  // Funktion zum Aktualisieren von Jahr und Monat in der übergeordneten Komponente
  const handleMonthChange = (selectedMonth, selectedYear) => {
    setSelectedMonth(selectedMonth);
    setSelectedYear(selectedYear);
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="text-center mt-4">
        <h1 className="text-3xl font-bold"> Urlaubsplan </h1>
      </div>
      <MonthPicker onChange={handleMonthChange} />
      <VacationsTable
          year={selectedYear}
          month={selectedMonth}
        />
    </div>
  );
}
