import { usePageContext } from "@/app/context/pageContext";
import NewRoster from "./NewRoster";

export default function AdminView() {
    const { config, rosters } = usePageContext();
    return (
        <div className="flex flex-col justify-center items-center gap-4 mt-4">
          <div>
            <div>RostersBox Navbar to select Year</div>
            Rosters Box to select Roster
          </div>
          <NewRoster/>
        </div>
      );
}