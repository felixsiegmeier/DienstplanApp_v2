export default function checkGroups({ doctor, day, config, roster }) {
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
      const maximum = config.groups.find((g) => g.name === group).maximum;
      if (count >= maximum) return true;
      return false;
    });
  }