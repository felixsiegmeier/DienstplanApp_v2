function evaluateProximity({ roster, weight }) {
  let fitness = 0;

  // Iterate over the duty columns in each day of the roster
  Object.values(roster).forEach((day, index) => {
    const duties = Object.values(day.dutyColumns);

    // Check if any doctor is assigned to more than one duty at the same day
    const dutyCounts = duties.reduce((counts, { duty }) => {
      if (duty && duty.id) {
        counts[duty.id] = (counts[duty.id] || 0) + 1;
      }
      return counts;
    }, {});
    let duplicateDuties = Object.values(dutyCounts).some((count) => count > 1);

    // Check if any doctor is assigned to a duty in a proximate day
    if (index > 0) {
      const previousDuties = Object.values(roster[index].dutyColumns); // array der Objekte duty
      let previousDayDuplicateDuties = false;
      previousDuties.forEach(({duty}) => {
        if (
          duties.some((currentDuty) => {
            return (
				currentDuty &&
              currentDuty.duty &&
              currentDuty.duty.id &&
              duty &&
              duty.id &&
              currentDuty.duty.id === duty.id
            );
          })
        ) {
          previousDayDuplicateDuties = true;
        }
      });

      if (previousDayDuplicateDuties) {
        duplicateDuties = true;
      }
    }

    if (duplicateDuties) {
      fitness += weight;
    }
  });
  return Math.round(fitness);
}

module.exports.evaluateProximity = evaluateProximity;
