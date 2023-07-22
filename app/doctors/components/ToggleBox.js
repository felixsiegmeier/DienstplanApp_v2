"use client";
import { useState } from "react";
import { usePageContext } from "../../context/pageContext";
import BoxGroups from "./boxComponents/BoxGroups";
import BoxDutyColumns from "./boxComponents/BoxDutyColumns";
import Box12h from "./boxComponents/Box12h";
import BoxNonWorkingDays from "./boxComponents/BoxNonWorkingDays";
import BoxMaximum from "./boxComponents/BoxMaximum";
import ButtonRed from "@/app/components/ButtonRed";
import ButtonCyan from "@/app/components/ButtonCyan";

export default function ToggleBox({ doctor, isOpen, toggle }) {
  const { user } = usePageContext();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

    if(!isOpen) return null;

  return (
    <tr>
      <td colSpan="4" className="p-2">
        <div className="select-none bg-slate-600 rounded-md p-4 animate-fade-in">
          <p className="text-lg underline">
            Welchen Gruppen gehört {doctor.name} an?
          </p>
          <BoxGroups doctor={doctor}/>
          <p className="text-lg underline">
            Welchen Dienstreihen gehört {doctor.name} an?
          </p>
          <BoxDutyColumns doctor={doctor}/>
          <p className="text-lg underline">
            Macht {doctor.name} nur 12-Stunden-Dienste?
          </p>
          <Box12h doctor={doctor}/>
          <p className="text-lg underline">
            An welchen Wochentagen soll {doctor.name} keine Dienste machen?
          </p>
          <div className="flex justify-center">
          <BoxNonWorkingDays doctor={doctor}/>
          </div>
          <p className="text-lg underline">
            Gibt es für {doctor.name} eine Dienstobergrenze?
          </p>
          <BoxMaximum doctor={doctor}/>
          <br/>
           <DeleteModal doctor={doctor} open={openDeleteModal} setOpen={setOpenDeleteModal} />
           {user.isAdmin && <div className="flex justify-center"><ButtonRed onClick={() => setOpenDeleteModal(true)} text={`${doctor.name} löschen`} /></div>}
        </div>
      </td>
    </tr>
  );

  function DeleteModal({doctor, open, setOpen}){
    if(!open) return null;
    return(
      <div onClick={() => setOpen(false)} className="fixed inset-0 bg-opacity-70 bg-slate-800 flex justify-center items-center">
        <div onClick={(e) => e.stopPropagation()} className="relative flex flex-col justify-center items-center shadow-md w-[50%] h-min p-4 rounded-md shadow-black border-slate-400 border bg-slate-800 transition-opacity">
          <p className="text-xl">{doctor.name}</p>
          <p>wirklich löschen?</p>
          <div className="mt-4 flex gap-4">
          <ButtonRed onClick={() => deleteDoctor(doctor)} text="Löschen" />
          <ButtonCyan onClick={() => setOpen(false)} text="Abbrechen" />
          </div>
        </div>
      </div>
    )
  }

  function deleteDoctor(doctor){
    console.log("deleting doctor")
    console.log(doctor)
    doctor.deleteSelf()
    toggle()
    setOpenDeleteModal(false)
  }
}
