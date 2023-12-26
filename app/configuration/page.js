"use client"
import { usePageContext } from "../context/pageContext"
import GroupConfiguration from "./components/GroupConfiguration";
import HorizontalDivider from "@/app/components/HorizontalDivider";
import PersonalConfiguration from "./components/PersonalConfiguration";

export default function Configuration(){
    const {user, loading} = usePageContext();
    return (
        !loading && <div>
        {user.isAdmin && <GroupConfiguration />} 
        {user.isAdmin && <HorizontalDivider />}
        <PersonalConfiguration />
        </div>
    )
}