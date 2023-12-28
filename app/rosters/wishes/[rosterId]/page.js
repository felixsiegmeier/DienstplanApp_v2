"use client";
import { usePageContext } from "@/app/context/pageContext";
import { useRouter } from "next/navigation";
import React from "react";
import WishRowMobile from "./components/WishRowMobile";
import WishRow from "./components/WishRow";
import ButtonCyan from "@/app/components/ButtonCyan";

export default function Wishes({ params }) {
  const { rosters, isMobile } = usePageContext();
  const { rosterId } = params;
  const router = useRouter();
  const roster = rosters.find((roster) => rosterId === roster._id);
  const doctors = roster.doctors

  if (!roster) {
    router.push("/");
  }

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
  const uniqueGroups = Array.from(new Set(doctors.flatMap((doctor) => doctor.groups)));

  // Sortiere und gruppieren die Doctors nach Gruppen und Namen
  const groupedDoctors = sortAndGroupDoctorsByGroupsAndNames(doctors, uniqueGroups);

  return (
    <div className="text-center mt-4 flex flex-col justify-center items-center select-none">
      <h1 className="text-3xl font-bold">{`Wünsche für ${formatDate(
        roster.month,
        roster.year
      )}`}</h1>
      {!roster.wishOpen && <h1 className="text-2xl font-bold text-red-600 animate-bounce mt-2">Es dürfen für diesen Monat keine Wünsche mehr abgegeben werden!</h1>}
      <div className="flex gap-4 justify-center mt-4 select-none">
        <div className=" h-8 p-1 text-center bg-green-500 rounded-sm">
          Dienstwunsch
        </div>
        <div className=" h-8 p-1 text-center bg-red-500 rounded-sm">
          Wunschfrei
        </div>
      
      <div className="h-8 p-1 text-center bg-pink-500 rounded-sm">
        Urlaub
      </div>
      </div>
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
            {doctorsInGroup.map((doctor, index) => {
              if(doctor.isManager) return
              return (isMobile ? (
              <WishRowMobile key={doctor._id} doctor={doctor} index={index} roster={roster} />
            ) : (
              <WishRow
                key={doctor._id}
                doctor={doctor}
                roster={roster}
                index={index}
              />
            )
              )
            }
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  <ButtonCyan className={`mt-8 ${isMobile ? "mb-8" : "mb-20"}`} text="Zum Dienstplan" onClick={() => router.push(`/rosters/${roster._id}`)} />
  </div>
  );
}