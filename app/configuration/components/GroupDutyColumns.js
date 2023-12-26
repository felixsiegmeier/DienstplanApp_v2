import { usePageContext } from "@/app/context/pageContext";
import DutyColumn from "./DutyColumn";
import ButtonCyan from "@/app/components/ButtonCyan";
import { useEffect, useState } from "react";

export default function GroupDutyColumns() {
  const { config } = usePageContext();
  const [edit, setEdit] = useState(false);
  const [reRender, toggleReRender] = useState(false);
  const [newDutyColumn, setNewDutyColumn] = useState("");

  useEffect(() => {
    console.log("rerendering")
  }, [reRender])
  

  return (
    <div className="mt-6 flex justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold text-center mb-2 mt-4">
          Dienstreihen
        </h1>
        <ButtonCyan
          className="mt-2 mb-2 px-4"
          text={edit ? "OK" : "Bearbeiten"}
          onClick={() => setEdit((prev) => !prev)}
        />
        <table className="text-center">
          <thead>
            <tr>
            {edit && <th className="px-6 py-2"></th>}
              <th className="px-6 py-2">Name</th>
              <th className="px-6 py-2">Automatische Zuweisung</th>
              <th className="px-6 py-2">Bereitschaftsdienst</th>
              <th className="px-6 py-2">Rufdienst</th>
              {edit && <th className="px-6 py-2"></th>}
            </tr>
          </thead>
          <tbody>
            {config.dutyColumns.map((dutyColumn, index) => (
              <DutyColumn
                key={index}
                dutyColumn={dutyColumn}
                config={config}
                edit={edit}
                toggleReRender={toggleReRender}
                setEdit={setEdit}
              />
            ))}
            {edit && (
              <tr>
                <td>
                  <input
                    className="text-black w-40 text-center mt-6"
                    value={newDutyColumn}
                    onChange={(e) => setNewDutyColumn(e.target.value)}
                  />
                </td>
                <td>
                  <ButtonCyan
                    className="h-6 px-10 pt-0.5 mt-6 m-auto text-sm rounded-lg"
                    text="- Anlegen -"
                    onClick={() => {
                      if (newDutyColumn.length < 1) {
                        return;
                      }
                      if(config.dutyColumns.find(dutyColumn => dutyColumn.name === newDutyColumn)){
                        return
                      }
                      config.addDutyColumnByName(newDutyColumn);
                      setNewDutyColumn("");
                    }}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
