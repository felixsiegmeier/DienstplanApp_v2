export default function checkNonWorkingDays(doctor, day) {
    return doctor.nonWorkingDays.some(
      (blackDay) => (blackDay % 7) === day.date.getDay()
    );
  }