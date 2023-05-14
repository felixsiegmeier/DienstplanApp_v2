"use client";
import {useState } from "react";
import TableRow from "./TableRow";

export default function Table({doctors, config, saveDoctors}) {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleRow = (index) => {
    if (index === openIndex) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="px-4 py-2 text-gray-200">Name</th>
          <th className="px-4 py-2 text-gray-200">Gruppen</th>
          <th className="px-4 py-2 text-gray-200">Dienstreihen</th>
          <th className="px-4 py-2 text-gray-200">Besonderheiten</th>
        </tr>
      </thead>
      <tbody>
        {doctors.map((doctor, index) => (
          <TableRow
            key={doctor.id}
            doctor={doctor}
            isOpen={index === openIndex}
            toggle={() => toggleRow(index)}
            saveDoctors={saveDoctors}
            config={config}
          />
        ))}
      </tbody>
    </table>
  );
}