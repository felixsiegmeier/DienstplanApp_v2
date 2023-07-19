import { usePageContext } from "@/app/context/pageContext";
import React from "react";
import WishGrid from "./WishGrid";

export default function Wish({ doctor, index, roster }) {
  const { specialties } = usePageContext();
  const background = index % 2 === 0 ? "bg-slate-800" : "";

  return (
    <tr className={`select-none transition-all duration-300 ${background}`}>
      <td className="px-4 py-2 text-left whitespace-nowrap">{doctor.name}</td>
      <td className="px-4 py-2">
        <WishGrid doctor={doctor} roster={roster}/>
      </td>
    </tr>
  );
}
