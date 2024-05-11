"use client";
import { usePageContext } from "@/app/context/pageContext";
import { useRouter } from "next/navigation";
import React from "react";
import RosterGrid from "./components/RosterGrid";
import RosterTable from "./components/RosterTable";
import ButtonCyan from "@/app/components/ButtonCyan";
import Summary from "./components/Summary";
import Changelog from "./components/Changelog";
import Conflicts from "./components/Conflicts";
import compareArrays from "@/app/lib/compareArrays";
import RosterDoctor from "@/app/models/RosterDoctor";
import fillRoster from "@/app/lib/fillRoster";

export default function Roster({ params }) {
  const { doctors, rosters, isMobile, config, vacations } = usePageContext();
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
          new RosterDoctor({
            ...doctor,
            updateParentArray: roster.updateParentArray.bind(roster),
            updateDatabase: roster.updateDatabase.bind(roster)
          })
        );
        console.info(`added new doctor from DataBase: ${doctor.name}`)
      }else{
          console.info(`checking ${doctor.name} for Update`)
          const rosterDoctor = roster.doctors.find(
            (rosterDoctor) => rosterDoctor._id === doctor._id
          );
          try {
            if (!compareArrays(doctor.groups, rosterDoctor.groups)) {
              rosterDoctor.groups = doctor.groups;
              roster.updateDatabase("doctors");
              console.info("...updating groups")
            }
            if (!compareArrays(doctor.dutyColumns, rosterDoctor.dutyColumns)) {
              rosterDoctor.dutyColumns = doctor.dutyColumns;
              roster.updateDatabase("doctors");
              console.info("...updating dutyColumns")
            }
            if (
              !compareArrays(doctor.nonWorkingDays, rosterDoctor.nonWorkingDays)
            ) {
              rosterDoctor.nonWorkingDays = doctor.nonWorkingDays;
              roster.updateDatabase("nonWorkingDays");
              console.info("...updating noWorkingDays")
            }
            if (doctor.only12 != rosterDoctor.only12) {
              rosterDoctor.only12 = doctor.only12;
              roster.updateDatabase("only12");
              console.info("...updating only12")
            }
            if (doctor.optOut != rosterDoctor.optOut) {
              rosterDoctor.optOut = doctor.optOut;
              roster.updateDatabase("optOut");
              console.info("...updating optOut")
            }
            if (doctor.isManager != rosterDoctor.isManager) {
              rosterDoctor.isManager = doctor.isManager;
              roster.updateDatabase("isManager");
              console.info("...updating isManager")
            }
          } catch (error) {
            console.error(error);
            console.error(doctor.name);
            console.error("...update eines doctors fehlgeschlagen");
          }
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
    <div className="text-center mt-4 flex flex-col justify-center select-none items-center">
      <h1 className="text-3xl font-bold">{`Dienstplan für ${formatDate(
        roster.month,
        roster.year
      )}`}</h1>
      <ButtonCyan
        className={"mt-4"}
        text={"Zu den Wünschen"}
        onClick={() => router.push(`/rosters/wishes/${roster._id}`)}
      />
      <ButtonCyan
        className={"mt-4"}
        text={"Plan automatisch füllen"}
        onClick={() => {
          if (fillRoster({ roster, config, vacations })) {
            console.log("redirecting");
            router.push(`/rosters/${roster._id}`);
          }
        }}
      />
      {!isMobile && <RosterGrid roster={roster} />}
      <RosterTable roster={roster} />
      <Conflicts roster={roster} config={config} doctors={doctors} />
      <Summary roster={roster} />
      {!isMobile && <Changelog roster={roster} />}
    </div>
  );
}
