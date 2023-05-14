"use client";
import {useState } from "react";
import TableRowMobile from "./TableRowMobile";

export default function TableMobile({doctors, config, saveDoctors}) {
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
        </tr>
      </thead>
      <tbody>
        {doctors.map((doctor, index) => (
          <TableRowMobile
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