import { usePageContext } from "@/app/context/pageContext";

export default function BoxGroups({ doctor }) {
  const { config } = usePageContext();

  function handleChange(e) {
    if (doctor.groups.includes(e.target.value)) {
      doctor.removeGroup(e.target.value);
    } else {
      doctor.addGroup(e.target.value);
    }
  }

  return (
    <div className="mt-1 mb-2">
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
  );
}
