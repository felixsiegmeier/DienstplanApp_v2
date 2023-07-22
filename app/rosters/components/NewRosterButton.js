"use client";
import React from "react";
import NewRosterModal from "./NewRosterModal";
import ButtonCyan from "@/app/components/ButtonCyan";

export default function NewRosterButton() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <NewRosterModal open={open} setOpen={setOpen} />
      <ButtonCyan
        onClick={() => setOpen(true)}
        text="Neuen Dienstplan anlegen"
      />
    </div>
  );
}
