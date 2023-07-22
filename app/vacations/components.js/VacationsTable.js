import { usePageContext } from "@/app/context/pageContext";
import VacationsRowMobile from "./VacationsRowMobile";
import VacationsRow from "./VacationsRow";
import React from "react";

export default function VacationsTable({ year, month }) {
  const { doctors, isMobile } = usePageContext();

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
  const uniqueGroups = Array.from(new Set(doctors.flatMap((doctor) => doctor.groups)));

  // Sortiere und gruppieren die Doctors nach Gruppen und Namen
  const groupedDoctors = sortAndGroupDoctorsByGroupsAndNames(doctors, uniqueGroups);

  return (
    <table className="w-[90%] border-collapse">
      <thead>
        <tr>
          <th className="px-4 py-2 text-gray-200 text-left select-none w-min"></th>
          {!isMobile && (
            <th className="px-4 py-2 text-gray-200 text-center select-none"></th>
          )}
        </tr>
      </thead>
      <tbody>
        {Object.entries(groupedDoctors).map(([group, doctorsInGroup], groupIndex) => (
          <React.Fragment key={group}>
            {/* Zeile für die Gruppenüberschrift */}
            <tr>
              <td colSpan={isMobile ? 1 : 2} className="px-4 py-2 font-bold bg-gray-900 text-white">
                {group}
              </td>
            </tr>
            {/* Zeilen für die Doctors innerhalb der Gruppe */}
            {doctorsInGroup.map((doctor, index) =>
              isMobile ? (
                <VacationsRowMobile
                  key={doctor._id}
                  doctor={doctor}
                  index={index}
                  year={year}
                  month={month}
                />
              ) : (
                <VacationsRow
                  key={doctor._id}
                  doctor={doctor}
                  index={index}
                  month={month}
                  year={year}
                />
              )
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
