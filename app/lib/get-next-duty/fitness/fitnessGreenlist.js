export default function fitnessGreenlist({ roster, doctorId, duty }) {
    // -9999 wenn der Dienst gewünscht wurde
    const greenlist = roster.doctors.find(
      (doctor) => doctor._id === doctorId
    )?.greenlist;
    let fitness = 0;
    if (greenlist.find((day) => day.getTime() === duty.date.getTime()))
      fitness = -9999;
    return fitness;
  }