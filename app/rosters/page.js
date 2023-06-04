"use client";
import { usePageContext } from "../context/pageContext";
import AdminView from "./components/AdminView";
import ClientView from "./components/ClientView";

export default function Rosters() {
  const { config, userId } = usePageContext();
  if (config?.admins?.includes(userId)) return <AdminView />;
  return <ClientView />;

  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-4">
      <div>
        <div>RostersBox Navbar to select Year</div>
        Rosters Box to select Roster
      </div>
      <div className="bg-cyan-800 cursor-pointer p-2 rounded-md shadow-xl hover:shadow-sm active:shadow-lg active:bg-cyan-700 select-none">
        Neuen Dienstplan anlegen
      </div>
    </div>
  );
}
