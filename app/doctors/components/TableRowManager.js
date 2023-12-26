import ToggleBoxManager from "./ToggleBoxManager";

export default function TableRowManager({
  doctor,
  isOpen,
  toggle,
  index
}) 
{
  const background = index % 2 === 0 ? "bg-slate-800" : ""
  return (
    <>
      <tr
        onClick={toggle}
        className={`select-none cursor-pointer transition-all duration-300 hover:bg-slate-600 ${background}`}
      >
        <td className="px-4 py-2 text-center">{doctor.name}</td>
        <td className="px-4 py-2 text-center">-</td>
        <td className="px-4 py-2 text-center">-</td>
        <td className="px-4 py-2 text-center">Verwaltung</td>
      </tr>
      <ToggleBoxManager isOpen={isOpen} toggle={toggle} doctor={doctor}/>
    </>
  );

  function specialties(doctor) {
    if (doctor.only12) {
      return true;
    }
    if (doctor.nonWorkingDays.length > 0) {
      return true;
    }
    if (doctor.maximum < 11){
      return true;
    }
    return false;
  }
}
