export default function fitnessGroups({ roster, doctorId, duty, config }) {
    // +1 für jeden Arzt der selben Gruppe an diesem Tag (wenn duty.date.getDay() nicht in exclusion)
    let fitness = 0;
    const doctorGroups = roster.doctors.find(
      (doctor) => doctor._id === doctorId
    )?.groups;
    const day = roster.days.find(
      (day) => day.date.getTime() === duty.date.getTime()
    );
    const dutyColumns = Object.keys(day.dutyColumns);
    const doctorsOfDay = [];
    dutyColumns.forEach((dutyColumn) =>
      doctorsOfDay.push(...day.dutyColumns[dutyColumn])
    );
    doctorsOfDay.forEach((docId) => {
      const groups = roster.doctors.find((doc) => doc._id === docId)?.groups;
      if (
        groups &&
        doctorGroups.some(
          (doctorGroup) =>
            groups.includes(doctorGroup) &&
            !config.groups
              .find((group) => group.name === doctorGroup)
              ?.exclusion.includes(duty.date.getDay())
        )
      ) {
        fitness += 1;
      }
    });
    return fitness;
  }