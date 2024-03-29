import ButtonCyan from "@/app/components/ButtonCyan";
import { usePageContext } from "@/app/context/pageContext";
import { useState } from "react";

export default function NewDoctorModal({ open, setOpen }) {
  if (!open) return null;

  const [doctorName, setDoctorName] = useState("");
  const { user, toggleContextUpdateFromDatabase, isMobile } = usePageContext();

  const handleChange = (e) => {
    setDoctorName(e.target.value);
  };

  const createDoctor = async () => {
    const response = await fetch("/api/doctors", {
      method: "POST",
      body: JSON.stringify({
        doctorName: doctorName,
        userGroupId: user.userGroupId,
      }),
    });
    const finished = await response.json();
    setOpen(false);
    toggleContextUpdateFromDatabase();
  };

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 bg-opacity-70 bg-slate-800 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative shadow-md ${
          isMobile ? "w-[80%]" : "w-[50%]"
        } h-min p-4 rounded-md shadow-black border-slate-400 border bg-slate-800 transition-opacity`}
      >
        <p
          onClick={() => setOpen(false)}
          className="absolute top-1.5 right-1.5 pr-1 pl-1 rounded-md cursor-pointer select-none text-sm bg-red-700 bg-opacity-80"
        >
          X
        </p>
        <div className="flex flex-col justify-center items-center gap-5">
          <p className="text-lg text-b">Bitte Namen eingeben</p>
          <input
            className="text-black"
            value={doctorName}
            onChange={handleChange}
          />
          <ButtonCyan 
            onClick={createDoctor}
            text="Erstellen"
          />
        </div>
      </div>
    </div>
  );
}
