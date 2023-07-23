"use client";
import { usePageContext } from "@/app/context/pageContext";
import { useRouter } from "next/navigation";
import React from "react";
import WishRowMobile from "./components/WishRowMobile";
import WishRow from "./components/WishRow";
import Doctor from "@/app/models/Doctor";

export default function Wishes({ params }) {
  const { rosters, isMobile, doctors } = usePageContext();
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
      <h1 className="text-3xl font-bold">{`Wünsche für ${formatDate(
        roster.month,
        roster.year
      )}`}</h1>
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
      <table className="w-[90%] border-collapse mt-2">
        <thead>
          <tr>
            {/* Use w-min class to set the minimum content size for the name column */}
            <th className="px-4 py-2 text-gray-200 text-left select-none w-min"></th>
            {!isMobile && (
              <th className="px-4 py-2 text-gray-200 text-center select-none"></th>
            )}
          </tr>
        </thead>
        <tbody>
          {roster.doctors.map((doctor, index) =>
            isMobile ? (
              <WishRowMobile key={doctor._id} doctor={doctor} index={index} roster={roster} />
            ) : (
              <WishRow
                key={doctor._id}
                doctor={doctor}
                roster={roster}
                index={index}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
