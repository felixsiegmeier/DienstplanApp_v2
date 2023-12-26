export default function NewAdminModal({ open, setOpen, isMobile, doctors, config }) {
    if (!open) return null;

    const handleClick = (id) => {
        config.addAdmin(id);
        setOpen(false);
    }

    return (
        <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-opacity-70 bg-slate-800 flex justify-center items-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`relative shadow-md ${
                    isMobile ? "w-[80%]" : "w-[50%]"
                } h-[80%] overflow-auto p-4 rounded-md shadow-black border-slate-400 border bg-slate-800 transition-opacity`}
            >
                <div className="flex flex-col justify-center items-center gap-0">
                    <h1 className="text-lg font-bold mb-3">Neuen Admin hinzufügen</h1>
                    {doctors.map(doctor => (
                        !config.admins.includes(doctor._id) ?
                            <div key={doctor._id} className="p-1 text-md w-[100%] text-center cursor-pointer select-none hover:bg-cyan-200 hover:text-black active:bg-cyan-700" onClick={() => handleClick(doctor._id)} >
                                {doctor.name}
                            </div> :
                            null
                    ))}
                </div>
            </div>
        </div>
    );
}
