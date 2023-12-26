import React from "react"; // Importiere React, falls es nicht anderswo importiert wurde
import { usePageContext } from "@/app/context/pageContext";
import ResetChangelogButton from "./ResetChangelogButton";

// Komponente für die Anzeige des Changelogs
const Changelog = ({ roster }) => {
  // Nutze den Seitenkontext, um den Benutzer abzurufen
  const { user } = usePageContext();

  // Funktion zum Formatieren von Monat und Jahr
  const formatDate = (month, year) => {
    const formattedMonth = String(month + 1).padStart(2, "0");
    return `${formattedMonth}/${year}`;
  };

  // Funktion zum Abrufen des Namens des Arztes anhand der ID
  const getDoctorName = (_id) => {
    const doctor = roster.doctors.find((doctor) => _id === doctor._id);
    return doctor ? doctor.name : "-";
  };

  // Funktion zum Erstellen einer Zeichenkette aus Arztnamen
  const createNamesString = (assignment) => {
    if (!assignment) return "-";
    const names = assignment
      .map((id) => getDoctorName(id))
      .filter(Boolean); // Filtere leere Namen
    return names.join(", ");
  };

  // Funktion zum Formatieren eines Zeitstempels in ein Datums- und Uhrzeitformat
  const getDateString = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year} ${hour}:${String(minute).padStart(2, "0")}`;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mt-8 mb-4 font-bold">{`Übersicht der Änderungen für ${formatDate(
        roster.month,
        roster.year
      )}`}</h1>
      <table className="table-auto w-full text-md border-none mt-2">
        <thead>
          <tr className="">
            <th className="py-2">Dienst</th>
            <th className="py-2">Reihe</th>
            <th className="py-2">Vorher</th>
            <th className="py-2">Nachher</th>
            <th className="py-2">Wer</th>
            <th className="py-2">Wann</th>
          </tr>
        </thead>
        <tbody>
          {roster.changelog.log.map((log) => (
            log.timestamp > roster.changelog.resetTimestamp && (
              <tr key={log.timestamp}>
                <td className="px-2 border-2 border-slate-700 text-md bg-slate-800">
                  {`${String(new Date(log.date).getDate()).padStart(2, "0")}.${String(new Date(log.date).getMonth() + 1).padStart(2, "0")}`}
                </td>
                <td className="px-2 border-2 border-slate-700 text-md bg-slate-800">
                  {log.dutyColumn}
                </td>
                <td className="px-2 border-2 border-slate-700 text-md bg-slate-800">
                  {createNamesString(log.oldAssignment)}
                </td>
                <td className="px-2 border-2 border-slate-700 text-md bg-slate-800">
                  {createNamesString(log.assignment)}
                </td>
                <td className="px-2 border-2 border-slate-700 text-md bg-slate-800">
                  {log.user}
                </td>
                <td className="px-2 border-2 border-slate-700 text-md bg-slate-800">
                  {getDateString(log.timestamp)}
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
      {user.isAdmin && <ResetChangelogButton roster={roster} />}
    </div>
  );
};

export default Changelog; // Exportiere die Changelog-Komponente
