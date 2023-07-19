"use client";
import { usePageContext } from "@/app/context/pageContext";
import { useRouter } from "next/navigation";
import React from "react";
import WishMobile from "./components/WishMobile";
import Wish from "./components/Wish";
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
          new Doctor({ ...doctor, setParentArray: roster.setParentArray.bind(roster) })
        );
      }
    }
  };

  updateDoctors();

  return (
    <div className="text-center mt-4">
      <h1 className="text-3xl font-bold">{`Wünsche für ${formatDate(
        roster.month,
        roster.year
      )}`}</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {/* Use w-min class to set the minimum content size for the name column */}
            <th className="px-4 py-2 text-gray-200 text-left select-none w-min">Name</th>
            {!isMobile && (
              <th className="px-4 py-2 text-gray-200 text-center select-none">Wünsche</th>
            )}
          </tr>
        </thead>
        <tbody>
          {roster.doctors.map((doctor, index) =>
            isMobile ? (
              <WishMobile key={doctor._id} doctor={doctor} index={index} />
            ) : (
              <Wish key={doctor._id} doctor={doctor} roster={roster} index={index} />
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
