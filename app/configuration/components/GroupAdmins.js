import ButtonCyan from "@/app/components/ButtonCyan";
import { usePageContext } from "@/app/context/pageContext"
import { useState } from "react";
import NewAdminModal from "./NewAdminModal";
import RemoveAdminModal from "./RemoveAdminModal";
import ButtonRed from "@/app/components/ButtonRed";

export default function GroupAdmins() {
    const {config, doctors, isMobile, user} = usePageContext();
    const [openNewAdmin, setOpenNewAdmin] = useState(false)
    const [openRemoveAdmin, setOpenRemoveAdmin] = useState(false)

    return (
        <div className="mt-6 flex justify-center">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-center mb-2">Administratoren</h1>
        <list className="mb-6">
        {config.admins.map(admin => (
            doctors.find(doctor => doctor._id === admin) &&
            <p className="font-bold text-center underline">
                {doctors.find(doctor => doctor._id === admin).name}
            </p>
        ))}
        </list>
        <ButtonCyan text="Administrator hinzufügen" onClick={() => setOpenNewAdmin(true)} />
        {config.superAdmin === user._id && <ButtonRed className="mt-6" text="Administrator entfernen" onClick={() => setOpenRemoveAdmin(true)} />}
        </div>
        <NewAdminModal open={openNewAdmin} setOpen={setOpenNewAdmin} isMobile={isMobile} doctors={doctors} config={config} />
        <RemoveAdminModal open={openRemoveAdmin} setOpen={setOpenRemoveAdmin} isMobile={isMobile} doctors={doctors} config={config} />
        </div>
    )
}