"use client";
import { useState } from "react";
import MultiSelect from "./MultiSelect";
import { usePageContext } from "../../context/pageContext";
import BoxGroups from "./boxComponents/BoxGroups";
import BoxDutyColumns from "./boxComponents/BoxDutyColumns";

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
          <p className="text-lg underline">
            An welchen Wochentagen soll {doctor.name} keine Dienste machen?
          </p>
          <p className="text-lg underline">
            Gibt es für {doctor.name} eine Dienstobergrenze?
          </p>
          <label class="flex items-center space-x-2 text-gray-300">
            <input
              type="checkbox"
              class="form-checkbox rounded-md text-slate-700 border-slate-700 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-offset-2 focus:ring-slate-700"
            />
            <span class="text-md ml-2">Checkbox-Text</span>
          </label>
          Gruppen:
          <MultiSelect
            options={fruitOptions}
            selected={selectedOptions}
            onChange={handleFruitSelectionChange}
          />
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
        // api call hier noch einfügen
        break;
      }
    }
  }
}
