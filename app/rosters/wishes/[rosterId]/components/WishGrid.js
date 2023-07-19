import { usePageContext } from "@/app/context/pageContext";

export default function WishGrid({roster, doctor}){
    const {} = usePageContext()
    // Hier kann ich erst weiter machen, wenn ich die Urlaubsplanung implementiert habe, da die Urlaube mit angezeigt werden sollen... 
    return (
        <div>
            {doctor.name}
        </div>
    )
}