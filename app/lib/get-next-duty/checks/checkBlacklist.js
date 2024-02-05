export default function checkBlacklist(doctor, day) {
    return doctor.blacklist.some(
      (blackDay) => blackDay.getTime() === day.date.getTime()
    );
  }