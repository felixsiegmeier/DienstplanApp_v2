import { usePageContext } from "@/app/context/pageContext";
import RosterGridRow from "./RosterGridRow";

export default function RosterGrid({roster}) {
    const {isMobile} = usePageContext();

    const formatDate = (month, year) => {
      const formattedMonth = String(month + 1).padStart(2, "0");
      return `${formattedMonth}/${year}`;
    };

      return (
        <div className="text-center mt-4 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold">{`Grid-Ansicht für ${formatDate(
            roster.month,
            roster.year
          )}`}</h1>
          <div className="flex gap-4 justify-center mt-4 select-none">
          <div className="h-8 p-1 text-center bg-cyan-500 rounded-sm">
            Dienst
          </div>
            <div className=" h-8 p-1 text-center bg-green-500 rounded-sm">
              Dienstwunsch
            </div>
            <div className=" h-8 p-1 text-center bg-red-500 rounded-sm">
              Wunschfrei
            </div>
          
          <div className="h-8 p-1 text-center bg-pink-500 rounded-sm">
            Urlaub
          </div>
          </div>
          <table className="w-[90%] border-collapse mt-2">
            <thead>
              <tr>
                {/* Use w-min class to set the minimum content size for the name column */}
                <th className="px-4 py-2 text-gray-200 text-left select-none w-min"></th>
                {!isMobile && (
                  <th className="px-4 py-2 text-gray-200 text-center select-none"></th>
                )}
              </tr>
            </thead>
            <tbody>
              {roster.doctors.map((doctor, index) =>
                
                  <RosterGridRow
                    key={doctor._id}
                    doctor={doctor}
                    roster={roster}
                    index={index}
                  />
              )}
            </tbody>
          </table>
        </div>
      );
}