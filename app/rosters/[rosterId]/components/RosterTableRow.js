import { useState } from "react";
import { usePageContext } from "@/app/context/pageContext";
import DoctorInput from "./DoctorInput";
import DoctorDropdown from "./DoctorDropdown";

export default function RosterTableRow({ day, roster, index }) {
  const { config } = usePageContext();
  const [values, setValues] = useState({});
  const [activeField, setActiveField] = useState(null);

  const handleSelectDoctor = (fieldName, doctorName) => {
    console.log(doctorName)
    setValues((prevValues) => ({ ...prevValues, [fieldName]: doctorName }));
  };

  const handleFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const background = index % 2 === 0 ? "slate-800" : "slate-600";

  return (
    <tr>
      <td>{day.date.toLocaleDateString()}</td>
      {config.dutyColumns.map((dutyColumn) => (
        <td key={dutyColumn.name}>
          <div className="relative">
            {activeField === dutyColumn.name ? (
              <DoctorDropdown
                roster={roster}
                day={day}
                activeField={activeField}
                setActiveField={setActiveField}
                handleSelectDoctor={handleSelectDoctor}
                background={background}
              />
            ) : (
              <DoctorInput
                dutyColumn={dutyColumn}
                roster={roster}
                day={day}
                values={values}
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
