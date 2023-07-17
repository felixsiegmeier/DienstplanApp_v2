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
        className="bg-cyan-800 cursor-pointer p-2 rounded-md shadow-xl active:shadow-lg  hover:scale-105 active:scale-100 active:bg-cyan-700 select-none mb-12 mt-4"
      >
        Neuen Dienstplan anlegen
      </div>
    </div>
  );
}
