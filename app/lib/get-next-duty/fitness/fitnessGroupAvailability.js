export default function fitnessGroupAvailability({ doctorId, roster, config, vacations }) {
  // +0.5 für jede Dienstreihe, die derjenige/diejenige besetzen kann
  let fitness = 0;
  const dutyColumns = [];
  config.dutyColumns.forEach((dutyColumn) => {
    if (dutyColumn.autoAssignment) {
      dutyColumns.push(dutyColumn.name);
    }
  });
  const doctor = roster.doctors.find((doc) => doc._id === doctorId);
  dutyColumns.forEach((dutyColumn) => {
    if (doctor.dutyColumns.includes(dutyColumn)) {
      fitness += 0.5;
    }
  });
  return fitness;
}