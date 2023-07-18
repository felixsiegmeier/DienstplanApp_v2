import { usePageContext } from "@/app/context/pageContext";

export default function AddDoctorButton({openModal}){
    const {doctors, setDoctors, config, setConfig, loading} = usePageContext();

    return (
        <div className="flex justify-center mt-4">
            <div onClick={() => {
                openModal()
            }} className="bg-green-800 cursor-pointer p-2 rounded-md shadow-xl hover:scale-105 active:scale-100 active:shadow-lg active:bg-green-700 select-none" >
                Arzt/ Ärztin hinzufügen
            </div>
        </div>
    )
}