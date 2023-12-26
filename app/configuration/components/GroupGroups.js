import { usePageContext } from "@/app/context/pageContext";
import Group from "./Group";
import ButtonCyan from "@/app/components/ButtonCyan";
import { useEffect, useState } from "react";

export default function GroupGroups() {
  const { config } = usePageContext();
  const [edit, setEdit] = useState(false);
  const [reRender, toggleReRender] = useState(false);
  const [newGroup, setNewGroup] = useState("");

  useEffect(() => {
    console.log("rendering")
  }, [reRender])
  

  return (
    <div className="mt-6 flex justify-center mb-8">
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold text-center mb-2 mt-4">
          Gruppen
        </h1>
        <ButtonCyan
          className="mt-2 mb-2 px-4"
          text={edit ? "OK" : "Bearbeiten"}
          onClick={() => setEdit((prev) => !prev)}
        />
        <table className="text-center">
          <thead>
            <tr>
              <th className="px-6 py-2">Name</th>
              <th className="px-6 py-2">Maximale Anzahl</th>
              <th className="px-6 py-2">Gültigkeit</th>
              {edit && <th className="px-6 py-2"></th>}
            </tr>
          </thead>
          <tbody>
            {config.groups.map((group, index) => (
              <Group
                key={index}
                group={group}
                config={config}
                edit={edit}
                setEdit={setEdit}
              />
            ))}
            {edit && (
              <tr>
                <td>
                  <input
                    className="text-black w-40 text-center mt-6"
                    value={newGroup}
                    onChange={(e) => setNewGroup(e.target.value)}
                  />
                </td>
                <td>
                  <ButtonCyan
                    className="h-6 px-10 pt-0.5 mt-6 m-auto text-sm rounded-lg"
                    text="- Anlegen -"
                    onClick={() => {
                      if (newGroup.length < 1) {
                        return;
                      }
                      if(config.groups.find(group => group.name === newGroup)){
                        return
                      }
                      config.addGroupByName(newGroup);
                      setNewGroup("");
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
