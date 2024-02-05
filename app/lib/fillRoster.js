function backtrackAlgorithm({ roster, config, vacations }) {
  // erhalte den Dienst, der am schlechtesten zu besetzen ist
  const nextDuty = getNextDuty({ roster, config, vacations });

  if (
    (nextDuty.date.getDate() === 28 || nextDuty.date.getDate() === 29) &&
    nextDuty.dutyColumn === "IMC"
  ) {
  }

  // Ende wenn voll
  if (!nextDuty) {
    return undefined;
  }
  const { doctors, dutyColumn, date } = nextDuty;
  /*
    const doctorNames = doctors.map(d => roster.doctors.find(doc => doc._id === d).name)
    console.log(date.getDate(), dutyColumn, doctorNames)
    */

  for (const doctor_id of doctors) {
    assignDuty({ roster, dutyColumn, date, doctor_id });
    backtrackAlgorithm({ roster, config, vacations });
    assignDuty({ roster, dutyColumn, date, doctor_id: false });
  }
}

function getNextDuty({ roster, config, vacations }) {
  const duty = {
    doctors: [],
    availabilityRatio: 1,
    dutyColumn: null,
    date: null,
  };
  const dutyColumns = config.dutyColumns
    .map((dutyColumn) => {
      if (dutyColumn.autoAssignment) return dutyColumn.name;
    })
    .filter((dutyColumn) => dutyColumn != undefined);

  const availableDoctors = roster.doctors.filter(
    (doctor) =>
      doctor.dutyColumns.some((dutyColumn) =>
        dutyColumns.includes(dutyColumn)
      ) &&
      !doctor.only12 &&
      !doctor.isManager
  );

  const allDutysCount = dutyColumns.length * roster.days.length;
  const avgDutys = allDutysCount / availableDoctors.length;
  const avgHighValueDays =
    (roster.days.filter((day) => day.value > 1).length * dutyColumns.length) /
    availableDoctors.length;
  const avgDutySpacing = (roster.days.length / avgDutys) * 0.8;
  roster.days.forEach((day) => {
    dutyColumns.forEach((dutyColumn) => {
      const allDoctorsCount = roster.doctors.filter(doctor => doctor.dutyColumns.includes(dutyColumn))?.length;
      const availableDoctors = getDutyDoctors({
        roster,
        day,
        dutyColumn,
        config,
        vacations,
      });
      const availabilityRatio = (allDoctorsCount && availableDoctors) ? availableDoctors.length/allDoctorsCount : false
      if (
        availabilityRatio &&
        (availabilityRatio < duty.availabilityRatio || duty.availabilityRatio === 1)
      ) {
        duty.doctors = availableDoctors;
        duty.availabilityRatio = availabilityRatio;
        duty.dutyColumn = dutyColumn;
        duty.date = day.date;
      }
    });
  });
  if (duty.doctors.length > 0)
    return sortedDuty({
      roster,
      duty,
      avgDutys,
      avgHighValueDays,
      avgDutySpacing,
      vacations,
      config,
    });
  return null;
}

function getDutyDoctors({ roster, day, dutyColumn, config, vacations }) {
  const dutyColumns = config.dutyColumns
    .map((dutyColumn) => {
      if (dutyColumn.autoAssignment) return dutyColumn.name;
    })
    .filter((dutyColumn) => dutyColumn != undefined);

  const allDoctors = roster.doctors.filter(
    (doctor) =>
      doctor.dutyColumns.some((dutyCol) => dutyColumns.includes(dutyCol)) &&
      !doctor.only12 &&
      !doctor.isManager
  );

  const allDoctorsIds = allDoctors.map((doctor) => doctor._id);

  if (
    day.dutyColumns[dutyColumn].length > 0 &&
    day.dutyColumns[dutyColumn].some((entry) => allDoctorsIds.includes(entry))
  )
    return null;

  const doctors = [];
  allDoctors.forEach((doctor) => {
    if (checkBlacklist(doctor, day)) {
      return;
    }
    if (checkVacation({ doctor, day, vacations })) {
      return;
    }
    if (checkProximity({ doctor, day, roster })) {
      return;
    }
    if (checkGroups({ doctor, day, config, roster })) {
      return;
    }
    if (checkDutyColumn(doctor, dutyColumn)) {
      return;
    }
    doctors.push(doctor._id);
  });
  return doctors;
}

function checkBlacklist(doctor, day) {
  return doctor.blacklist.some(
    (blackDay) => blackDay.getTime() === day.date.getTime()
  );
}

function checkVacation({ doctor, day, vacations }) {
  return vacations.find(
    (vacation) =>
      vacation.date.getTime() === day.date.getTime() &&
      vacation.doctorId === doctor._id
  );
}

const checkProximity = ({ doctor, day, roster }) => {
  const previousDay = new Date(day.date);
  previousDay.setDate(day.date.getDate() - 1);
  const nextDay = new Date(day.date);
  nextDay.setDate(day.date.getDate() + 1);
  const dates = [day.date, previousDay, nextDay];

  const proximalDutiesDoctorIds = [];

  dates.forEach((date) => {
    const checkDay = roster.days.find(
      (cDay) => cDay.date.getTime() === date.getTime()
    );
    if (!checkDay) {
      return;
    }
    Object.keys(checkDay.dutyColumns).forEach((dutyColumn) => {
      proximalDutiesDoctorIds.push(...checkDay.dutyColumns[dutyColumn]);
    });
  });
  return proximalDutiesDoctorIds.includes(doctor._id);
};

function checkGroups({ doctor, day, config, roster }) {
  return doctor.groups.some((group) => {
    if (
      config.groups
        .find((g) => g.name === group)
        .exclusion.includes(day.date.getDate())
    )
      return false;
    let count = 0;
    Object.keys(day.dutyColumns).forEach((dutyColumn) => {
      day.dutyColumns[dutyColumn].forEach((doctorId) => {
        if (
          roster.doctors.find((d) => d._id === doctorId)?.groups.includes(group)
        ) {
          count += 1;
        }
      });
    });
    const maximum = config.groups
    .find((g) => g.name === group)
    .maximum
    if (count >= maximum) return true;
    return false;
  });
}

function checkDutyColumn(doctor, dutyColumn) {
  return !doctor.dutyColumns.includes(dutyColumn);
}

function sortedDuty({
  roster,
  duty,
  avgDutys,
  avgHighValueDays,
  avgDutySpacing,
  vacations,
  config,
}) {
  const doctorsWithFitness = [];
  duty.doctors.forEach((doctorId) => {
    const doctor = roster.doctors.find((doc) => doc._id === doctorId);
    const absence = vacations.filter(
      (vacation) =>
        vacation.doctorId === doctorId &&
        vacation.date.getMonth() === roster.month
    ).length;
    const attendance = (roster.days.length - absence) / roster.days.length;
    let fitnessDutyCountFactor = fitnessDutyCount({
      roster,
      doctorId,
      avgDutys,
      attendance,
    });
    // console.log("fitnessDutyCountFactor",fitnessDutyCountFactor)
    let fitnessHighValueDutysFactor = fitnessHighValueDutys({
      roster,
      doctorId,
      avgHighValueDays,
    });
    // console.log("fitnessHighValueDutysFactor",fitnessHighValueDutysFactor)
    let fitnessWeekendSpacingFactor = fitnessWeekendSpacing({
      roster,
      doctorId,
      duty,
    });
    // console.log("fitnessWeekendSpacingFactor", fitnessWeekendSpacingFactor);
    let fitnessWeekendCountFactor = fitnessWeekendCount({
      roster,
      doctorId,
      duty,
    });
    // console.log("fitnessWeekendCountFactor", fitnessWeekendCountFactor);
    let fitnessDutySpacingFactor = fitnessDutySpacing({
      roster,
      duty,
      doctorId,
      avgDutySpacing,
    });
    //console.log("fitnessDutySpacingFactor",fitnessDutySpacingFactor)
    let fitnessGroupsFactor = fitnessGroups({ roster, doctorId, duty, config });
    //console.log("fitnessGroupsFactor",fitnessGroupsFactor)
    let fitnessGroupAvailabilityFactor = fitnessGroupAvailability({
      doctorId,
      roster,
      config,
      vacations,
      duty,
    });
    //console.log("fitnessGroupAvailabilityFactor",fitnessGroupAvailabilityFactor)

    let fitnessGreenlistFactor = fitnessGreenlist({roster, doctorId, duty});

    let totalFitness =
      fitnessDutyCountFactor +
      fitnessHighValueDutysFactor +
      fitnessWeekendSpacingFactor +
      fitnessWeekendCountFactor +
      fitnessDutySpacingFactor +
      fitnessGroupsFactor +
      fitnessGroupAvailabilityFactor + 
      fitnessGreenlistFactor;

    doctorsWithFitness.push({ doctorId, totalFitness });
  });
  const sortedDoctors = doctorsWithFitness
    .sort((a, b) => a.totalFitness - b.totalFitness)
    .map((doc) => doc.doctorId);

  const sortedDoctorLog = doctorsWithFitness
    .sort((a, b) => a.totalFitness - b.totalFitness)
  duty.doctors = sortedDoctors;
  return duty;
}

function fitnessDutyCount({ roster, doctorId, attendance, avgDutys }) {
  // +1 bzw. -1 für jede Abweichung (negativ ist besser)
  let dutyCount = 0;
  roster.days.forEach((day) => {
    const dutyColumns = Object.keys(day.dutyColumns);
    dutyColumns.forEach((dutyColumn) => {
      const duty = day.dutyColumns[dutyColumn];
      if (day.dutyColumns[dutyColumn].includes(doctorId)) {
        dutyCount += 1;
      }
    });
  });
  const correctedAvgDutys = avgDutys * (attendance * 0.6);
  const fitness = dutyCount - correctedAvgDutys;
  return fitness;
}

function fitnessHighValueDutys({ roster, doctorId, avgHighValueDays }) {
  // 2 * (+1 bzw. -1 für jede Abweichung) (negativ ist besser)
  let dutyCount = 0;
  roster.days.forEach((day) => {
    const dutyColumns = Object.keys(day.dutyColumns);
    dutyColumns.forEach((dutyColumn) => {
      const duty = day.dutyColumns[dutyColumn];
      if (day.dutyColumns[dutyColumn].includes(doctorId) && day.value > 1) {
        dutyCount += 1;
      }
    });
  });
  const fitness = 2 * (dutyCount - avgHighValueDays);
  return fitness;
}

function fitnessWeekendSpacing({ roster, doctorId, duty }) { // +50 für jedes aufeinander folgende Wochenende wenn duty am Wochenende ist, +100 für 3er-Ketten, sonst +0
  const rosterDay = roster.days.find(day => day.date.getTime() === duty.date.getTime())
  if (rosterDay.value === 1) return 0;

  let count = 0;

  const dutys = [duty.date];
  roster.days.forEach((day) => {
    const dutyColumns = Object.keys(day.dutyColumns);
    dutyColumns.forEach((dutyColumn) => {
      if (
        day.dutyColumns[dutyColumn].includes(doctorId) &&
        day.value > 1
        )
      {
        dutys.push(day.date);
      }
    });
  });

  dutys.sort((a, b) => {
    const timestamp1 = a.getTime();
    const timestamp2 = b.getTime();
    return timestamp1 - timestamp2;
  });

  for (let i = 0; i < dutys.length - 1; i++) {

    if (
      dutys[i + 1].getTime() - dutys[i].getTime() > 4 * 24 * 60 * 60 * 1000 &&
      dutys[i + 1].getTime() - dutys[i].getTime() < 9 * 24 * 60 * 60 * 1000
    ) {
      count += 50;
      if (
        dutys[i + 2] &&
        dutys[i + 2].getTime() - dutys[i + 1].getTime() > 4 * 24 * 60 * 60 * 1000 &&
        dutys[i + 2].getTime() - dutys[i + 1].getTime() < 9 * 24 * 60 * 60 * 1000
      ) {
        count += 100;
      }
    }
  }
  const fitness = count;
  return fitness;
}

function fitnessWeekendCount({ roster, doctorId, duty }) { // +3n^2 für jedes Wochenende wenn duty am Wochenende ist, sonst +0
  const weekendDays = [5, 6, 0]; // Freitag, Samstag, Sonntag (0-basiert)
  if (!weekendDays.includes(duty.date.getDay())) return 0;
  const weekendDutys = [duty.date];
  roster.days.forEach((day) => {
    const dutyColumns = Object.keys(day.dutyColumns);
    dutyColumns.forEach((dutyColumn) => {
      if (
        weekendDays.includes(day.date.getDay()) &&
        day.dutyColumns[dutyColumn].includes(doctorId)
      ) {
        weekendDutys.push(day.date);
      }
    });
  });

  weekendDutys.sort((a, b) => {
    const timestamp1 = a.getTime();
    const timestamp2 = b.getTime();
    return timestamp1 - timestamp2;
  });

  const fitness = 3*countWeekends(weekendDutys);
  return fitness ** 2;
}

function fitnessDutySpacing({ roster, duty, doctorId, avgDutySpacing }) { // wenn Abstand zu einem anderen Dienst < avg dann +1 für jeden Tag Abweichung und zusätzlich +5 bei kurzem Wechsel
  let fitness = 0;
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const dutyTimestamp = duty.date.getTime();
  roster.days.forEach((day) => {
    const dayTimestamp = day.date.getTime();
    const spacing = Math.abs(dayTimestamp - dutyTimestamp) / millisecondsPerDay;
    if ((spacing > avgDutySpacing)) return;
    const dutyColumns = Object.keys(day.dutyColumns);
    dutyColumns.forEach((dutyColumn) => {
      if (day.dutyColumns[dutyColumn].includes(doctorId)) {
        fitness = fitness + (avgDutySpacing - spacing);
        if(spacing === 2){fitness += 5}
      }
    });
  });
  return fitness;
}

function fitnessGroups({ roster, doctorId, duty, config }) { // +1 für jeden Arzt der selben Gruppe an diesem Tag (wenn duty.date.getDay() nicht in exclusion)
  let fitness = 0;
  const doctorGroups = roster.doctors.find(
    (doctor) => doctor._id === doctorId
  )?.groups;
  const day = roster.days.find((day) => day.date.getTime() === duty.date.getTime());
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

function fitnessGreenlist({roster, doctorId, duty}) { // -9999 wenn der Dienst gewünscht wurde 
  const greenlist = roster.doctors.find(doctor => doctor._id === doctorId)?.greenlist
  let fitness = 0
  if(greenlist.find(day => day.getTime() === duty.date.getTime())) fitness = -9999
  return fitness

}

function countWeekends(dates) {
  const uniqueMonths = new Set(dates.map((date) => date.getMonth()));
  let count = 0;

  uniqueMonths.forEach((month) => {
    const monthDates = dates.filter((date) => date.getMonth() === month);
    const weekendsInMonth = groupDatesByWeekend(monthDates);
    count += weekendsInMonth.size;
  });

  return count;
}

function groupDatesByWeekend(dates) {
  const weekendDays = [5, 6, 0]; // Freitag, Samstag, Sonntag (0-basiert)
  const weekends = new Map();

  dates.forEach((date) => {
    const dayOfWeek = date.getDay();
    if (weekendDays.includes(dayOfWeek)) {
      const key = date.toISOString().slice(0, 10); // Datum als Schlüssel
      if (!weekends.has(key)) {
        weekends.set(key, []);
      }
      weekends.get(key).push(date);
    }
  });

  return weekends;
}

function fitnessGroupAvailability({ doctorId, roster, config, vacations }) { // +0.5 für jede Dienstreihe, die derjenige/diejenige besetzen kann
  let fitness = 0
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

function assignDuty({ roster, dutyColumn, date, doctor_id }) {
  const doctorName = roster.doctors.find((doc) => doc._id === doctor_id).name;
  if (doctor_id === false) {
    roster.days.find(
      (day) => day.date.getTime() === date.getTime()
    ).dutyColumns[dutyColumn] = [];
  } else {
    roster.days.find(
      (day) => day.date.getTime() === date.getTime()
    ).dutyColumns[dutyColumn] = [doctor_id];
  }
}

export default function fillRoster({ roster, config, vacations }) {
  const filledRoster = backtrackAlgorithm({ roster, config, vacations });
}
