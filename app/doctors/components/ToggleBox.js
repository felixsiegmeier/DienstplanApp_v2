"use client";
import { useState } from "react";
import MultiSelect from "./MultiSelect";
import { usePageContext } from "../../context/pageContext";
import BoxGroups from "./boxComponents/BoxGroups";
import BoxDutyColumns from "./boxComponents/BoxDutyColumns";
import Box12h from "./boxComponents/Box12h";
import BoxNonWorkingDays from "./boxComponents/BoxNonWorkingDays";
import BoxMaximum from "./boxComponents/BoxMaximum";

export default function ToggleBox({ doctor }) {
  const { config, doctors, setDoctors } = usePageContext();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [fruitOptions] = useState([
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
  ]);

  const handleFruitSelectionChange = (selection) =>
    setSelectedOptions(selection);

  return (
    <tr>
      <td colSpan="4" className="p-2">
        <div className="select-none bg-slate-600 rounded-md p-4 animate-fade-in">
          <p className="text-lg underline">
            Welchen Gruppen gehört {doctor.name} an?
          </p>
          <BoxGroups doctor={doctor} saveDoctorChange={saveDoctorChange}/>
          <p className="text-lg underline">
            Welchen Dienstreihen gehört {doctor.name} an?
          </p>
          <BoxDutyColumns doctor={doctor} saveDoctorChange={saveDoctorChange} />
          <p className="text-lg underline">
            Macht {doctor.name} nur 12-Stunden-Dienste?
          </p>
          <Box12h doctor={doctor} saveDoctorChange={saveDoctorChange} />
          <p className="text-lg underline">
            An welchen Wochentagen soll {doctor.name} keine Dienste machen?
          </p>
          <BoxNonWorkingDays doctor={doctor} saveDoctorChange={saveDoctorChange} />
          <p className="text-lg underline">
            Gibt es für {doctor.name} eine Dienstobergrenze?
          </p>
          <BoxMaximum doctor={doctor} saveDoctorChange={saveDoctorChange} />
        </div>
      </td>
    </tr>
  );

  function saveDoctorChange(doctor) {
    console.log("got updated doctor")
    console.log(doctor)
    const updatedDoctors = [...doctors];
    for (let i = 0; i < updatedDoctors.length; i++) {
      if (updatedDoctors[i].id === doctor.id) {
        updatedDoctors[i] = doctor;
        setDoctors(updatedDoctors);
        // API Call updateDoctor(doctor) = muss noch geschrieben werden!
        break;
      }
    }
  }
}
