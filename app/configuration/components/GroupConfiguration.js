import GroupAdmins from "./GroupAdmins";
import GroupDutyColumns from "./GroupDutyColumns";
import GroupGroups from "./GroupGroups";
import GroupRules from "./GroupRules";

export default function GroupConfiguration() {
    return (
        <div className="mt-4 mb-4 ml-4 justify-center select-none">
        <h1 className="text-2xl underline font-bold text-center mb-6">Gruppeneinstellungen</h1>
            <GroupAdmins />
            <GroupDutyColumns />
            <GroupGroups />
            <GroupRules />
        </div>
    )
}