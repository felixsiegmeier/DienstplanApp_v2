"use client";
import { usePageContext } from "@/app/context/pageContext";
import React from "react";

export default function NewRoster() {
  const { config, rosters, isMobile } = usePageContext();
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Modal />
      <div onClick={() => setOpen(true)} className="bg-cyan-800 cursor-pointer p-2 rounded-md shadow-xl hover:shadow-sm active:shadow-lg active:bg-cyan-700 select-none">
        Neuen Dienstplan anlegen
      </div>
    </div>
  );

  function Modal() {
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
          } h-min p-4 rounded-md shadow-black border-slate-400 border bg-slate-800 transition-opacity`}
        >
          Hier neuen Plan anlegen
        </div>
      </div>
    );
  }
}
