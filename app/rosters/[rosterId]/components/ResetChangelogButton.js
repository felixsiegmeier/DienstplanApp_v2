import ButtonCyan from "@/app/components/ButtonCyan";

export default function ResetChangelogButton({roster}){
    return (
        <div className="flex justify-center mt-4">
            <ButtonCyan
                onClick={() => roster.resetChangelog()}
                text = "Changelog leeren"
            />
        </div>
    )
}