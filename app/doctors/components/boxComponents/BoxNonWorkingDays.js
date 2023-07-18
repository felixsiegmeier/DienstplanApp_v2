export default function BoxNonWorkingDays({ doctor }) {
  const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  function handleChange(day) {
    if(doctor.nonWorkingDays.includes(day)){
      doctor.removeNonWorkingDay(day)
    } else {
      doctor.addNonWorkingDay(day)
    }
  }

  return (
    <div className="flex gap-2 mt-2 mb-2">
      {weekdays.map((day, index) => {
        return (
          <div
            onClick={(e) => handleChange(index + 1)}
            className={`w-8 h-8 rounded-md pt-1 ${
              doctor.nonWorkingDays.includes(index + 1)
                ? "bg-orange-500 hover:bg-orange-700"
                : "bg-slate-800 hover:bg-slate-700"
            } text-center align-middle cursor-pointer select-none active:bg-slate-900`}
            key={index}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
}
