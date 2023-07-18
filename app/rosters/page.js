"use client"
import { usePageContext } from "@/app/context/pageContext";
import NewRosterButton from "./components/NewRosterButton";
import React from "react";
import LeftButton from "@/app/components/LeftButton";
import RightButton from "@/app/components/RightButton";
import RosterGrid from "./components/RosterGrid";

export default function AdminView() {
  const { config, rosters, user } = usePageContext();
  const [year, setYear] = React.useState(new Date().getFullYear());
  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-4">
      <div className="flex flex-col text-2xl">
        <p className="text-slate-200">Dienstpläne</p>
        <div className="text-cyan-400">
          <LeftButton onClick={() => setYear(year - 1)} />
          {year}
          <RightButton onClick={() => setYear(year + 1)} />
        </div>
      </div>
      <RosterGrid year={year} />
      {user.isAdmin && <NewRosterButton />}
    </div>
  );
}