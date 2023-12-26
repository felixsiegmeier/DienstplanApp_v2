import ButtonCyan from "@/app/components/ButtonCyan";
import ButtonRed from "@/app/components/ButtonRed";
import { useEffect, useState } from "react";

export default function DutyColumn({ dutyColumn, key, config, edit, setEdit, toggleReRender }) {
  const [present, setPresent] = useState(dutyColumn.present);
  const [autoAssignment, setAutoAssignment] = useState(
    dutyColumn.autoAssignment
  );

  const togglePresent = () => {
    config.toggleDutyColumnPresentByName(dutyColumn.name);
    setPresent((prev) => !prev);
  };

  const toggleAutoAssignment = () => {
    config.toggleDutyColumnAutoAssignmentByName(dutyColumn.name);
    setAutoAssignment((prev) => !prev);
  };

  const handleDelete = () => {
    config.removeDutyColumnByName(dutyColumn.name);
    setEdit(prev => !prev)
  };

  const handleUp = () => {
    config.changeDutyColumnPosition(dutyColumn.name, "up")
    toggleReRender(prev => !prev);
  }

  const handleDown = () => {
    config.changeDutyColumnPosition(dutyColumn.name, "down")
    toggleReRender(prev => !prev);
  }

  return (
    <tr key={key} class="hover:bg-cyan-900">
    {edit && (
        <td>
        <div className="flex m-auto justify-center gap-2">
        <ButtonCyan
            className="h-6 px-4 pt-0.5 text-sm rounded-lg"
            text="↑"
            onClick={handleUp}
          />
          <ButtonCyan
            className="h-6 px-4 pt-0.5 text-sm rounded-lg"
            text="↓"
            onClick={handleDown}
          />
        </div>
          
        </td>
      )}
      <td>{dutyColumn.name}</td>
      {edit ?
        <td>
        <input
          class="form-checkbox mr-4 w-4 h-4"
          type="checkbox"
          checked={autoAssignment}
          onChange={() => edit && toggleAutoAssignment()}
        />
      </td> : 
      <td>{autoAssignment ? "✔︎" : "✘"}</td>}
      {edit ?
      <td>
        <input
          class="form-checkbox mr-4 w-4 h-4"
          type="checkbox"
          checked={present}
          onChange={() => edit && togglePresent()}
        />
      </td>:
      <td>{present ? "✔︎" : "✘"}</td>
      }
      {edit ?
      <td>
        <input
          class="form-checkbox mr-4 w-4 h-4"
          type="checkbox"
          checked={!present}
          onChange={() => edit && togglePresent()}
        />
      </td> :
      <td>{!present ? "✔︎" : "✘"}</td>
      }
      {edit && (
        <td>
          <ButtonRed
            className="h-6 px-4 pt-0.5 m-auto text-sm rounded-lg"
            text="- Löschen -"
            onClick={handleDelete}
          />
        </td>
      )}
    </tr>
  );
}
