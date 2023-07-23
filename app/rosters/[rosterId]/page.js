"use client";
import { usePageContext } from "@/app/context/pageContext";
import { useRouter } from "next/navigation";
import React from "react";
import RosterGrid from "./components/RosterGrid";

export default function Roster({ params }) {
  const { rosters, isMobile } = usePageContext();
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

  console.log("bis hier kommt er")

  return (
    <div className="text-center mt-4 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">{`Dienstplan für ${formatDate(
        roster.month,
        roster.year
      )}`}</h1>
      <RosterGrid roster={roster}  />
      </div>
  );
}
