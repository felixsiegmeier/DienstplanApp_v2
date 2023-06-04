"use client";
import LeftButton from "@/app/components/LeftButton";
import RightButton from "@/app/components/RightButton";
import { usePageContext } from "@/app/context/pageContext";
import React from "react";

export default function NewRoster() {
  const { config, rosters, isMobile } = usePageContext();
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Modal />
      <div
        onClick={() => setOpen(true)}
        className="bg-cyan-800 cursor-pointer p-2 rounded-md shadow-xl hover:shadow-sm active:shadow-lg active:bg-cyan-700 select-none"
      >
        Neuen Dienstplan anlegen
      </div>
    </div>
  );

  function Modal() {
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

    const [month, setMonth] = React.useState(0);
    const [year, setYear] = React.useState(0);
    const [name, setName] = React.useState("0");

    React.useEffect(() => {
      setName(`${months[month]} ${year}`);
    }, [month, year]);

    React.useEffect(() => {
      const d = new Date();
      setMonth(d.getMonth() + 1);
      setYear(d.getFullYear());
    }, []);

    function handleNameChange(e) {
      setName(e.target.value);
    }

    function handleMonthDown() {
      if (month < 1) setYear(year - 1);
      setMonth(month < 1 ? 11 : month - 1);
    }

    function handleMonthUp() {
        if (month > 10) setYear(year + 1);
      setMonth(month > 10 ? 0 : month + 1);
    }

    function handleYearDown() {
      setYear(year - 1);
    }

    function handleYearUp() {
      setYear(year + 1);
    }

    function createRoster() {
      console.log("Dieser Code muss erst noch geschrieben werden");
      console.log(
        `Er soll einen Dienstplan für ${months[month]} ${year} anlegen und in der Datenbank speichern`
      );
      const a = new Date(2023, 5, 4)
      console.log(a.getDay())
      setOpen(false);
    }

    if (!open) return null;
    return (
      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 bg-opacity-70 bg-slate-800 flex justify-center items-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative shadow-md ${
            isMobile ? "w-[80%]" : "w-[50%]"
          } h-min p-4 rounded-md shadow-black border-slate-400 border bg-slate-800 transition-opacity flex flex-col items-center gap-2 select-none`}
        >
          Erstelle einen neuen Dienstplan
          <input
            className="text-slate-200 rounded-md bg-slate-500 text-center"
            value={name}
            onChange={handleNameChange}
          />
          <div>
            <LeftButton onClick={handleMonthDown} />
            {months[month]}
            <RightButton onClick={handleMonthUp} />
          </div>
          <div>
            <LeftButton onClick={handleYearDown} />
            {year}
            <RightButton onClick={handleYearUp} />
          </div>
          <div
            onClick={createRoster}
            className="bg-cyan-800 cursor-pointer p-2 rounded-md shadow-xl hover:shadow-sm active:shadow-lg active:bg-cyan-700 select-none"
          >
            Erstellen
          </div>
        </div>
      </div>
    );
  }
}
