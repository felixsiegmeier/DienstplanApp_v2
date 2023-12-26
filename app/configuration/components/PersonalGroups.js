import { usePageContext } from "@/app/context/pageContext";

export default function PersonalGroups() {
    const { config, user, doctors } = usePageContext();
    const doctor = doctors.find(doctor => doctor._id === user._id)

    function handleChange(e) {
        if (doctor.groups.includes(e.target.value)) {
          doctor.removeGroup(e.target.value);
        } else {
          doctor.addGroup(e.target.value);
        }
      }

    if(doctor.isManager) return;
    return (
        <div className="flex justify-center mt-6">
    <div>
    <h1 class="text-xl font-bold mb-2 text-center">Gruppen</h1>
      {config.groups.map((group, index) => (
        <div key={index}>
          <input
            type="checkbox"
            value={group.name}
            checked={doctor.groups.includes(group.name)}
            onChange={handleChange}
            className="form-checkbox mr-4 w-4 h-4"
          />
          {group.name}
        </div>
      ))}
    </div>
    </div>
  );
}