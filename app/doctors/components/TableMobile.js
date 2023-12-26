"use client";
import {useState } from "react";
import TableRowMobile from "./TableRowMobile";
import { usePageContext } from "../../context/pageContext";
import TableRowManagerMobile from "./TableRowManagerMobile";

export default function TableMobile() {
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
          <th className="px-4 py-2 text-gray-200">Name</th>
        </tr>
      </thead>
      <tbody>
        {doctors.map((doctor, index) => {
          if(!doctor.isManager){ return <TableRowMobile
            key={doctor.id}
            doctor={doctor}
            index={index}
            isOpen={index === openIndex}
            toggle={() => toggleRow(index, doctor._id)}
          />}
          return <TableRowManagerMobile
            key={doctor.id}
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