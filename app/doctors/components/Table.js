"use client";
import {useState } from "react";
import TableRow from "./TableRow";
import { usePageContext } from "../../context/pageContext";
import TableRowManager from "./TableRowManager";

export default function Table() {
  const [openIndex, setOpenIndex] = useState(-1);
  const {doctors, user} = usePageContext();

  const toggleRow = (index, id) => {
    if (index === openIndex) {
      setOpenIndex(-1);
    } else {
      if(user.isAdmin | id === user._id){
        setOpenIndex(index);
      } else {
        setOpenIndex(-1);
      }
    }
  };

  return (
    <table className="w-[90%] border-collapse">
      <thead>
        <tr>
          <th className="px-4 py-2 text-gray-200 select-none">Name</th>
          <th className="px-4 py-2 text-gray-200 select-none">Gruppen</th>
          <th className="px-4 py-2 text-gray-200 select-none">Dienstreihen</th>
          <th className="px-4 py-2 text-gray-200 select-none">Besonderheiten</th>
        </tr>
      </thead>
      <tbody>
        {doctors.map((doctor, index) => {
          if(!doctor.isManager) {return <TableRow
            key={doctor._id}
            doctor={doctor}
            index={index}
            isOpen={index === openIndex}
            toggle={() => toggleRow(index, doctor._id)}
          />}
          return <TableRowManager
            key={doctor._id}
            doctor={doctor}
            index={index}
            isOpen={index === openIndex}
            toggle={() => toggleRow(index, doctor._id)}
          />
        })}
      </tbody>
    </table>
  );
}