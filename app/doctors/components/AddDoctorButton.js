import ButtonCyan from "@/app/components/ButtonCyan";
import { usePageContext } from "@/app/context/pageContext";

export default function AddDoctorButton({openModal}){
    const {doctors, setDoctors, config, setConfig, loading} = usePageContext();

    return (
        <div className="flex justify-center mt-4">
            <ButtonCyan
                onClick={openModal}
                text = "Arzt/ Ärztin Hinzufügen"
            />
        </div>
    )
}