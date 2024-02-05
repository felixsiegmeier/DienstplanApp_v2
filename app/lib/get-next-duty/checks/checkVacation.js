export default function checkVacation({ doctor, day, vacations }) {
    return vacations.find(
      (vacation) =>
        vacation.date.getTime() === day.date.getTime() &&
        vacation.doctorId === doctor._id
    );
  }