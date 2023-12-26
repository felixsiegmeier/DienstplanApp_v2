import { useState } from "react";
import { usePageContext } from "@/app/context/pageContext";
import DoctorInput from "./DoctorInput";
import DoctorDropdown from "./DoctorDropdown";

export default function RosterTableRow({ day, roster, index }) {
  const { config } = usePageContext();
  const [activeField, setActiveField] = useState(null);

  const handleFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const background = index % 2 === 0 ? "slate-800" : "slate-600";

  return (
    <tr>
      <td className="text-center">{String(day.date.getDate()).padStart(2,"0")}</td>
      {config.dutyColumns.map((dutyColumn) => (
        <td key={dutyColumn.name}>
          <div className="relative">
            {activeField === dutyColumn.name ? (
              <DoctorDropdown
                roster={roster}
                day={day}
                activeField={activeField}
                setActiveField={setActiveField}
                background={background}
              />
            ) : (
              <DoctorInput
                dutyColumn={dutyColumn.name}
                roster={roster}
                day={day}
                handleFocus={handleFocus}
                background={background}
              />
            )}
          </div>
        </td>
      ))}
    </tr>
  );
}
