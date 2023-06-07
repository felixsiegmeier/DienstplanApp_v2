import { usePageContext } from '@/app/context/pageContext';
import React from 'react';

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

  // Sort the rosters by month
  const sortedRosters = rosters.sort((a, b) => a.month - b.month);

  return (
    <div className="flex flex-wrap">
      {sortedRosters.map((roster, index) => {
        const month = roster.month;
        const color = colors[month % colors.length];

        if (roster.year !== year) return null;

        return (
          <div
            key={index}
            className={`w-${isMobile ? 'full' : '1/4'} p-4 ${color}`}
          >
            <h2>{roster.month}</h2>
            <h3>{roster.year}</h3>
            {/* Additional roster details */}
          </div>
        );
      })}
    </div>
  );
}
