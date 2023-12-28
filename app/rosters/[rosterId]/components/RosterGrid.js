import RosterGridRow from "./RosterGridRow";
import React from "react";

export default function RosterGrid({ roster }) {

  const formatDate = (month, year) => {
    const formattedMonth = String(month + 1).padStart(2, "0");
    return `${formattedMonth}/${year}`;
  };

  // Funktion zum Sortieren der Doctors nach Gruppen und Namen und Gruppieren nach Gruppen
  const sortAndGroupDoctorsByGroupsAndNames = (doctors, groups) => {
    // Zuerst sortiere die Doctors nach ihren Gruppen
    doctors.sort((a, b) => {
      const groupA = a.groups[0] || ""; // Wenn ein Doctor keine Gruppe hat, leeres String verwenden
      const groupB = b.groups[0] || "";
      return groups.indexOf(groupA) - groups.indexOf(groupB);
    });

    // Dann sortiere die Doctors innerhalb ihrer Gruppen nach ihren Namen
    doctors.sort((a, b) => a.name.localeCompare(b.name));

    // Gruppiere die Doctors nach ihren Gruppen
    const groupedDoctors = {};
    doctors.forEach((doctor) => {
      const group = doctor.groups[0] || "Ohne Gruppe"; // Wenn ein Doctor keine Gruppe hat, "Ohne Gruppe" verwenden
      if (!groupedDoctors[group]) {
        groupedDoctors[group] = [];
      }
      groupedDoctors[group].push(doctor);
    });

    return groupedDoctors;
  };

  // Hole die eindeutigen Gruppen aus doctors
  const uniqueGroups = Array.from(
    new Set(roster.doctors.flatMap((doctor) => doctor.groups))
  );

  // Sortiere und gruppieren die Doctors nach Gruppen und Namen
  const groupedDoctors = sortAndGroupDoctorsByGroupsAndNames(
    roster.doctors,
    uniqueGroups
  );

  return (
    <div className="text-center mt-8 mb-8 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">{`Grid-Ansicht für ${formatDate(
        roster.month,
        roster.year
      )}`}</h1>
      <div className="flex gap-4 justify-center mt-4 select-none">
        <div className="h-8 p-1 text-center bg-cyan-500 rounded-sm">Dienst</div>
        <div className=" h-8 p-1 text-center bg-green-500 rounded-sm">
          Dienstwunsch
        </div>
        <div className=" h-8 p-1 text-center bg-red-500 rounded-sm">
          Wunschfrei
        </div>

        <div className="h-8 p-1 text-center bg-pink-500 rounded-sm">Urlaub</div>
      </div>
      <table className="w-[90%] border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 text-gray-200 text-left select-none w-min"></th>
            <th className="px-4 py-2 text-gray-200 text-center select-none"></th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedDoctors).map(
            ([group, doctorsInGroup], groupIndex) => (
              <React.Fragment key={group}>
                {/* Zeile für die Gruppenüberschrift */}
                <tr>
                  <td
                    colSpan={2}
                    className="px-4 py-2 font-bold bg-gray-900 text-white"
                  >
                    {group}
                  </td>
                </tr>
                {/* Zeilen für die Doctors innerhalb der Gruppe */}
                {doctorsInGroup.map((doctor, index) => {
                  if (doctor.isManager) return;
                  return <RosterGridRow
                   key={doctor._id}
                   doctor={doctor}
                   roster={roster}
                   index={index}
                 />
                })}
              </React.Fragment>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}