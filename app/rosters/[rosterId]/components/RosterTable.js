import { usePageContext } from "@/app/context/pageContext";
import RosterTableRow from "./RosterTableRow";

export default function RosterTable({roster}) {
    const {config} = usePageContext();
    
    const formatDate = (month, year) => {
        const formattedMonth = String(month + 1).padStart(2, "0");
        return `${formattedMonth}/${year}`;
      };
  
        return (
          <div className="text-center mt-4 flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">{`Tabellen-Ansicht für ${formatDate(
              roster.month,
              roster.year
            )}`}</h1>
            <table className="w-[90%] border-collapse mt-2">
              <thead>
                <tr>
                <th className="px-4 py-2 text-gray-200 text-left select-none w-min">Datum</th>
                {config.dutyColumns.map(dutyColumn => <th className="px-4 py-2 text-gray-200 text-left select-none w-min">{dutyColumn.name}</th>)}
                  <th className="px-4 py-2 text-gray-200 text-left select-none w-min"></th>
                </tr>
              </thead>
              <tbody>
                {roster.days.map((day, index) =>
                    <RosterTableRow
                      key={day._id}
                      day={day}
                      roster={roster}
                      index={index}
                    />
                )}
              </tbody>
            </table>
          </div>
        );
}