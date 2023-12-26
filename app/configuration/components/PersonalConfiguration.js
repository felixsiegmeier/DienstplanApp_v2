import PersonalDutyColumns from "./PersonalDutyColumns";
import PersonalGroups from "./PersonalGroups";
import PersonalPassword from "./PersonalPassword";

export default function PersonalConfiguration() {
    return (
        <div className="mt-4 mb-4 ml-4 select-none">
            <h1 className="text-2xl underline font-bold text-center mb-6">Persönliche Einstellungen</h1>
            <PersonalDutyColumns />
            <PersonalGroups />
            <PersonalPassword />
        </div>
    )
}