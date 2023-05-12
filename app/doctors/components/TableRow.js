import ToggleBox from "./ToggleBox";

export default function TableRow({ doctor, isOpen, toggle }) {
  return (
    <>
      <tr
        onClick={toggle}
        className="select-none cursor-pointer transition-all duration-300 hover:bg-slate-600"
      >
        <td className="px-4 py-2 text-center">{doctor.name}</td>
        <td className="px-4 py-2 text-center">{doctor.id}</td>
      </tr>
      {isOpen && (
        <ToggleBox doctor={doctor}/>
      )}
    </>
  );
}
