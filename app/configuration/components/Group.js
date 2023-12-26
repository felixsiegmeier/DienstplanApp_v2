import ButtonRed from "@/app/components/ButtonRed";
import {useState } from "react";

export default function Group({
  group,
  key,
  config,
  edit,
  setEdit
}) {
  const handleDelete = () => {
    config.removeGroupByName(group.name);
    setEdit((prev) => !prev);
  };

  const [exclusion, setExclusion] = useState(group.exclusion);
  
  function handleValidityClick(index) {
    const isExcluded = group.exclusion.includes(index + 1);
  
    if (isExcluded) {
      config.removeGroupExclusionByName(group.name, index + 1);
      setExclusion((prev) => prev.filter((val) => val !== index + 1));
    } else {
      config.addGroupExclusionByName(group.name, index + 1);
      setExclusion((prev) => [...prev, index + 1]);
    }
  }
  
  const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  const validity = () => {
    const validWeekdays = weekdays.filter(
      (day, index) => !group.exclusion.includes(index + 1)
    );
    const resultString = validWeekdays.join(", ");
    return resultString;
  };

  const [selectedValue, setSelectedValue] = useState(group.maximum);

  const handleSelectChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    config.changeGroupMaximumByName(group.name, newValue)
    setSelectedValue(newValue);
  };

  const renderOptions = () => {
    const options = [];
    for (let i = 1; i <= 5; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    options.push(<option key={99} value={99}>Unbegrenzt</option>);
    return options;
  };

  return (
    <tr key={key} class="hover:bg-cyan-900">
      <td>{group.name}</td>
      {edit ? (
        <td>
        <select
          value={selectedValue}
          onChange={handleSelectChange}
          className="text-black"
        >
        {renderOptions()}
        </select>
        </td>
      ) : 
      <td>
      {group.maximum}
      </td>
      }
      {edit ? (
        <td>
          <div className="flex gap-1">
            {weekdays.map((day, index) => {
              return (
                <div
                  key={index}
                  className={`border cursor-pointer rounded-md border-solid pl-2 pr-2 border-white hover:border-red-600 active:border-orange-500 ${
                    exclusion.includes(index + 1) ? "line-through text-slate-500" : ""
                  }`}
                  onClick={() => handleValidityClick(index)}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </td>
      ) : (
        <td>{validity()}</td>
      )}
      {edit && (
        <td>
          <ButtonRed
            className="h-6 px-4 pt-0.5 m-auto ml-4 text-sm rounded-lg"
            text="- Löschen -"
            onClick={handleDelete}
          />
        </td>
      )}
    </tr>
  );
}
