"use client"
import { usePageContext } from "@/app/context/pageContext"
import { useEffect, useState } from "react";

export default function BoxDutyColumns({doctor, saveDoctorChange}){
    const {config} = usePageContext();
    const [dutyColumns, setDutyColumns] = useState([]);

    useEffect(() => {
        setDutyColumns(doctor.dutyColumns)
    }, []);

    function handleChange(e){
        if(dutyColumns.includes(e.target.value)){
            const updatedDutyColumns = dutyColumns.filter(dutyColumn => dutyColumn !== e.target.value)
            setDutyColumns(updatedDutyColumns);
            saveDoctorChange({...doctor, dutyColumns: updatedDutyColumns})
        }else{
            const updatedDutyColumns = [...dutyColumns, e.target.value]
            setDutyColumns(updatedDutyColumns);
            saveDoctorChange({...doctor, dutyColumns: updatedDutyColumns})
        }
    }

    return(
        <div className="mt-1 mb-2">
            {config.dutyColumns.map((dutyColumn, index) => {
                return(
                <div key={index}>
                <input type="checkbox" value={dutyColumn.name} checked={dutyColumns.includes(dutyColumn.name)} onChange={handleChange} className="form-checkbox mr-4 w-4 h-4"/>
                {dutyColumn.name}
                </div>
                )
            })}
        </div>
    )
}