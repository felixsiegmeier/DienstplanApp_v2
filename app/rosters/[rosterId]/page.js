"use client";
import { usePageContext } from "@/app/context/pageContext";
import { useRouter } from "next/navigation";
import React from "react";
import RosterGrid from "./components/RosterGrid";
import Doctor from "@/app/models/Doctor";
import RosterTable from "./components/RosterTable";
import ButtonCyan from "@/app/components/ButtonCyan";

export default function Roster({ params }) {
  const { doctors, rosters, isMobile } = usePageContext();
  const { rosterId } = params;
  const router = useRouter();
  const roster = rosters.find((roster) => rosterId === roster._id);

  if (!roster) {
    router.push("/");
  }

  const formatDate = (month, year) => {
    const formattedMonth = String(month + 1).padStart(2, "0");
    return `${formattedMonth}/${year}`;
  };

  const updateDoctors = () => {
    // Lädt alle aktuell in der Datenbank vorhandenen Ärrzte in den Plan. Falls sie schon vorhanden sind werden sie aktualisiert. 
    // Bereits im Plan vorhandene, aber von der Datenbank gelöschte Ärzte werden belassen (damit man Pläne auch nach dem Löschen von Ärzten später noch lesen kann)
    for (const doctor of doctors) {
      const index = roster.doctors.findIndex((doc) => doc._id === doctor._id);
      if (index === -1) {
        roster.addDoctor(
          new Doctor({
            ...doctor,
            setParentArray: roster.setParentArray.bind(roster),
          })
        );
      }
    }

    // Sortiere die Ärzte entsprechend den Einträgen in ihren doctor.dutyColumns-Arrays
    roster.doctors.sort((a, b) => {
      const aDutyColumns = a.dutyColumns;
      const bDutyColumns = b.dutyColumns;
      const minLen = Math.min(aDutyColumns.length, bDutyColumns.length);

      for (let i = 0; i < minLen; i++) {
        const compareResult = aDutyColumns[i].localeCompare(bDutyColumns[i]);
        if (compareResult !== 0) {
          return compareResult;
        }
      }

      // Wenn alle Einträge bis minLen identisch sind, sortiere nach der Länge der dutyColumns-Arrays
      if (aDutyColumns.length !== bDutyColumns.length) {
        return aDutyColumns.length - bDutyColumns.length;
      }

      // Wenn alle Einträge identisch sind, sortiere alphabetisch nach dem Namen
      return a.name.localeCompare(b.name);
    });

    // Verschiebe Ärzte mit leeren dutyColumns-Arrays ans Ende des Arrays
    roster.doctors.sort((a, b) => (a.dutyColumns.length > 0 ? -1 : 1));
  };

  updateDoctors();

  return (
    <div className="text-center mt-4 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">{`Dienstplan für ${formatDate(
        roster.month,
        roster.year
      )}`}</h1>
      <ButtonCyan className={"mt-4"} text={"Zu den Wünschen"} onClick={() => router.push(`/rosters/wishes/${roster._id}`)} />
      <ButtonCyan className={"mt-4"} text={"Plan automatisch füllen"} onClick={() => console.log("Work in Progress")} />
      {!isMobile && <RosterGrid roster={roster}  />}
      <RosterTable roster={roster} />
      </div>
  );
}
