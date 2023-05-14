import ToggleBox from "./ToggleBox";

export default function TableRowMobile({
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
      </tr>
      {isOpen && (
        <ToggleBox doctor={doctor} saveDoctors={saveDoctors} config={config} />
      )}
    </>
  );
}
