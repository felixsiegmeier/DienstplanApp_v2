"use client"
import { usePageContext } from "@/app/context/pageContext";

export default function Roster({params}){
    const { config, rosters, user } = usePageContext();
    const {rosterId} = params
    return (
        <div>
            {rosterId}
        </div>
    )
}