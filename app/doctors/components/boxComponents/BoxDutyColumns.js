import { usePageContext } from "@/app/context/pageContext";

export default function BoxDutyColumns({ doctor }) {
  const { config } = usePageContext();

  function handleChange(e) {
    if(doctor.dutyColumns.includes(e.target.value)){
      doctor.removeDutyColumn(e.target.value)
    } else {
      doctor.addDutyColumn(e.target.value)
    }
  }

  return (
    <div className="mt-1 mb-2">
      {config.dutyColumns.map((dutyColumn, index) => {
        return (
          <div key={index}>
            <input
              type="checkbox"
              value={dutyColumn.name}
              checked={doctor.dutyColumns.includes(dutyColumn.name)}
              onChange={handleChange}
              className="form-checkbox mr-4 w-4 h-4"
            />
            {dutyColumn.name}
          </div>
        );
      })}
    </div>
  );
}
