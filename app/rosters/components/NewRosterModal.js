import { usePageContext } from '@/app/context/pageContext';
import React from 'react'
import LeftButton from "@/app/components/LeftButton";
import RightButton from "@/app/components/RightButton";
import createRoster from "@/app/lib/createRoster";
import ButtonCyan from '@/app/components/ButtonCyan';

export default function NewRosterModal({open, setOpen}) {
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

    const { config, rosters, isMobile, toggleContextUpdateFromDatabase } =
    usePageContext();

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

    async function handleCreateRoster() {
      const roster = await createRoster({ name, month, year, config });
      const create = await fetch("/api/rosters", {
        method: "POST",
        body: JSON.stringify(roster),
      });
      toggleContextUpdateFromDatabase();
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
          <ButtonCyan 
            onClick={handleCreateRoster}
            text="Erstellen"
          />
        </div>
      </div>
    );
  }
