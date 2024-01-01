"use client";
import { useState } from "react";
import { usePageContext } from "../../context/pageContext";
import ButtonRed from "@/app/components/ButtonRed";
import ButtonCyan from "@/app/components/ButtonCyan";
import BoxManager from "./boxComponents/BoxManager";

export default function ToggleBox({ doctor, isOpen, toggle }) {
  const { user, config } = usePageContext();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

    if(!isOpen) return null;

  return (
    <tr>
      <td colSpan="4" className="p-2">
        <div className="select-none bg-slate-600 rounded-md p-4 animate-fade-in">
        {!user.isAdmin && "Verwaltungsaccount"}
        {user.isAdmin && <BoxManager doctor={doctor}/>}
          <br/>
           <DeleteModal doctor={doctor} open={openDeleteModal} setOpen={setOpenDeleteModal} />
           {user.isAdmin && !config.admins.includes(doctor._id) && <div className="flex justify-center"><ButtonRed onClick={() => setOpenDeleteModal(true)} text={`${doctor.name} löschen`} /></div>}
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
