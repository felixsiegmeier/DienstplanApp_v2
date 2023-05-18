import ToggleBox from "./ToggleBox";

export default function TableRowMobile({
  doctor,
  isOpen,
  toggle,
  index
}) {
  const background = index % 2 === 0 ? "bg-slate-800" : ""
  return (
    <>
      <tr
        onClick={toggle}
        className={`select-none cursor-pointer transition-all duration-300 hover:bg-slate-600 ${background}`}
      >
        <td className="px-4 py-2 text-center">{doctor.name}</td>
      </tr>
      {isOpen && (
        <ToggleBox doctor={doctor}/>
      )}
    </>
  );
}
