"use client";
import {useState } from "react";
import TableRowMobile from "./TableRowMobile";
import { usePageContext } from "../../context/pageContext";

export default function TableMobile() {
  const [openIndex, setOpenIndex] = useState(-1);
  const {doctors} = usePageContext();

  const toggleRow = (index) => {
    if (index === openIndex) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <table className="w-[90%] border-collapse">
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
            index={index}
            isOpen={index === openIndex}
            toggle={() => toggleRow(index)}
          />
        ))}
      </tbody>
    </table>
  );
}