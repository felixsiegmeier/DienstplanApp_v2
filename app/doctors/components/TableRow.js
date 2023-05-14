import ToggleBox from "./ToggleBox";

export default function TableRow({
  doctor,
  isOpen,
  toggle,
  saveDoctors,
  config,
}) {
  return (
    <>
      <tr
        onClick={toggle}
        className="select-none cursor-pointer transition-all duration-300 hover:bg-slate-600"
      >
        <td className="px-4 py-2 text-center">{doctor.name}</td>
        <td className="px-4 py-2 text-center">{doctor.groups.join(", ")}</td>
        <td className="px-4 py-2 text-center">
          {doctor.dutyColumns.join(", ")}
        </td>
        <td className="px-4 py-2 text-center">
          {specialties(doctor) ? "Ja" : "Nein"}
        </td>
      </tr>
      {isOpen && (
        <ToggleBox doctor={doctor} saveDoctors={saveDoctors} config={config} />
      )}
    </>
  );

  function specialties(doctor) {
    if (doctor.only12) {
      return true;
    }
    if (doctor.nonWorkingDays.length > 0) {
      return true;
    }
    return false;
  }
}
