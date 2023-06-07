"use client";
import { usePageContext } from "@/app/context/pageContext";
import React from "react";
import NewRosterModal from "./NewRosterModal";

export default function NewRosterButton() {
  const { config, rosters, isMobile, toggleContextUpdateFromDatabase } =
    usePageContext();
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <NewRosterModal open={open} setOpen={setOpen} />
      <div
        onClick={() => setOpen(true)}
        className="bg-cyan-800 cursor-pointer p-2 rounded-md shadow-xl hover:shadow-sm active:shadow-lg active:bg-cyan-700 select-none"
      >
        Neuen Dienstplan anlegen
      </div>
    </div>
  );
}
