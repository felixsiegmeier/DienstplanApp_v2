"use client"
import { usePageContext } from "../context/pageContext"
import GroupConfiguration from "./components/GroupConfiguration";
import HorizontalDivider from "@/app/components/HorizontalDivider";
import PersonalConfiguration from "./components/PersonalConfiguration";

export default function Configuration(){
    const {user, loading, isMobile} = usePageContext();
    return (
        !loading && <div>
        {user.isAdmin && !isMobile && <GroupConfiguration />} 
        {user.isAdmin && !isMobile && <HorizontalDivider />}
        <PersonalConfiguration />
        </div>
    )
}