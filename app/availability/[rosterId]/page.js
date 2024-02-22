"use client";
import ButtonCyan from "../../components/ButtonCyan";
import { usePageContext } from "../../context/pageContext";
import { useRouter } from "next/navigation";
import AvailabilityGrid from "./components/AvailabilityGrid";

export default function Availability({ params }) {
  const { doctors, rosters, isMobile, config, vacations } = usePageContext();
  const { rosterId } = params;
  const router = useRouter();
  const roster = rosters.find((roster) => rosterId === roster._id);
  console.log(params)

  const handleBack = () => {
    console.log(rosterId)
    router.push(`/rosters/${rosterId}`)
  }

  return (
    <div className="text-center mt-4 flex flex-col items-center select-none">
      <h1 className="text-3xl font-bold mb-4"> Anwesenheiten </h1>
      <ButtonCyan className={"mt-4"} text="Zurück zum Dienstplan" onClick={handleBack} />
      <AvailabilityGrid roster={roster} />
    </div>
  );
}
