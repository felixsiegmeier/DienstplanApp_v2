import { usePageContext } from "@/app/context/pageContext";

export default function PersonalDutyColumns() {
  const { user, doctors, config } = usePageContext();
  const doctor = doctors.find((doctor) => doctor._id === user._id);

  function handleChange(e) {
    if (doctor.dutyColumns.includes(e.target.value)) {
      doctor.removeDutyColumn(e.target.value);
    } else {
      doctor.addDutyColumn(e.target.value);
    }
  }

  if(doctor.isManager) return;
  return (
    <div className="flex justify-center">
    <div>
      <h1 class="text-xl font-bold mb-2 text-center">Dienstreihen</h1>
      {config.dutyColumns.map((dutyColumn, index) => {
        return (
          <div key={index}>
            <input
              type="checkbox"
              value={dutyColumn.name}
              checked={doctor.dutyColumns.includes(dutyColumn.name)}
              onChange={handleChange}
              class="form-checkbox mr-4 w-4 h-4"
              style={{ marginLeft: 0 }}
            />
            {dutyColumn.name}
          </div>
        );
      })}
    </div>
    </div>
  );
}
