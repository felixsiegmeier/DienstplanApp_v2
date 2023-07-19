import { usePageContext } from "@/app/context/pageContext";
import React, { useState } from "react";
import RosterModal from "./RosterModal";

export default function RosterGrid({ year }) {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-cyan-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-pink-500",
    "bg-rose-500",
    "bg-fuchsia-500",
    "bg-purple-500",
  ];
  const { isMobile, rosters } = usePageContext();
  const [selectedRoster, setSelectedRoster] = useState(null)

  // Sort the rosters by month
  const sortedRosters = rosters.sort((a, b) => a.month - b.month);

  function handleOpenModal(roster){
    setSelectedRoster(roster)
  }

  function handleCloseModal(){
    setSelectedRoster(null)
  }

  return (
    <div className=" w-full flex gap-6 flex-wrap justify-center">
      {sortedRosters.map((roster, index) => {
        const month = roster.month;
        const color = colors[month % colors.length];

        if (roster.year !== year) return null;

        return (
          <div
            key={index}
            className={`${
              isMobile ? "w-full" : "w-1/4"
            } p-4 ${color} rounded-md ${
              isMobile ? "ml-12 mr-12" : ""
            } cursor-pointer select-none shadow-md hover:scale-105 shadow-black active:scale-100 text-center`}
            onClick={() => handleOpenModal(roster)}
          >
            <h1>{roster.name}</h1>
            <h3>
              {roster.month < 9 ? 0 : ""}
              {roster.month + 1}/{roster.year}
            </h3>
            {/* Additional roster details */}
          </div>
        );
      })}

      {selectedRoster !== null && (
        <RosterModal
          selectedRoster={selectedRoster}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
