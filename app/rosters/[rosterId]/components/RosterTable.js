import React, { useState } from "react";
import { usePageContext } from "@/app/context/pageContext";
import RosterTableRow from "./RosterTableRow";
import ButtonCyan from "@/app/components/ButtonCyan";

export default function RosterTable({ roster }) {
  const { config, isMobile } = usePageContext();
  const [copyMessage, setCopyMessage] = useState("In Zwischenablage kopieren");

  const formatDate = (month, year) => {
    const formattedMonth = String(month + 1).padStart(2, "0");
    return `${formattedMonth}/${year}`;
  };

  const copyToClipboard = async () => {
    try {
      const dutyColumns = config.dutyColumns.map(
        (dutyColumn) => dutyColumn.name
      );
      const data = [dutyColumns];

      for (const day of roster.days) {
        const doctors = Object.keys(day.dutyColumns).map((dutyColumn) => {
          const doctorIds = day.dutyColumns[dutyColumn];
          return doctorIds
            .map((doctorId) => {
              const doctor = roster.doctors.find((doc) => doc._id === doctorId);
              return doctor ? doctor.name : doctorIds.length > 1 ? "?" : "";
            })
            .filter(Boolean)
            .join("/");
        });

        data.push(doctors);
      }

      const tsvText = data.map((row) => row.join("\t")).join("\n");

      await navigator.clipboard.writeText(tsvText);
      setCopyMessage("Wurde in Zwischenablage kopiert!");

      // Timeout für das Zurücksetzen des Zustands nach einer bestimmten Zeit (z.B. 2 Sekunden)
      setTimeout(() => {
        setCopyMessage("In Zwischenablage kopieren");
      }, 2000);
    } catch (error) {
      console.error("Fehler beim Kopieren in die Zwischenablage:", error);
    }
  };

  return (
    <div className={`text-center ${isMobile && "text-xs"} mt-4 flex flex-col justify-center items-center`}>
      <h1 className="text-2xl font-bold">{`Tabellen-Ansicht für ${formatDate(
        roster.month,
        roster.year
      )}`}</h1>
      <table className={`${isMobile ? "w-min" : "w-[90%]"} table-auto border-collapse mt-2`}>
        <thead>
          <tr>
            <th className="px-4 py-2 text-gray-200 text-center select-none">
              Datum
            </th>
            {config.dutyColumns.map((dutyColumn) => (
              <th
                key={dutyColumn.name}
                className="px-4 py-2 text-gray-200 text-center w-48 select-none"
              >
                {dutyColumn.name}
              </th>
            ))}
            <th className="px-4 py-2 text-gray-200 text-center select-none"></th>
          </tr>
        </thead>
        <tbody>
          {roster.days.map((day, index) => (
            <RosterTableRow
              key={day._id}
              day={day}
              roster={roster}
              index={index}
            />
          ))}
        </tbody>
      </table>
      <br></br>
      <ButtonCyan text={copyMessage} onClick={copyToClipboard} />
    </div>
  );
}
