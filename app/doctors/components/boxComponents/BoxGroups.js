"use client"
import { usePageContext } from "@/app/context/pageContext"
import { useEffect, useState } from "react";

export default function BoxGroups({doctor, saveDoctorChange}){
    const {config} = usePageContext();
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        setGroups(doctor.groups)
    }, []);

    function handleChange(e){
        if(groups.includes(e.target.value)){
            const updatedGroups = groups.filter(group => group !== e.target.value)
            setGroups(updatedGroups);
            saveDoctorChange({...doctor, groups: updatedGroups})
        }else{
            const updatedGroups = [...groups, e.target.value]
            setGroups(updatedGroups);
            saveDoctorChange({...doctor, groups: updatedGroups})
        }
    }

    return(
        <div className="mt-1 mb-2">
            {config.groups.map((group, index) => {
                return(
                <div key={index}>
                <input type="checkbox" value={group.name} checked={groups.includes(group.name)} onChange={handleChange} className="form-checkbox mr-4 w-4 h-4"/>
                {group.name}
                </div>
                )
            })}
        </div>
    )
}