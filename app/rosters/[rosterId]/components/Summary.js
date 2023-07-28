import React from "react";

export default function Summary({ roster }) {
  const serviceBlockColors = [
    "text-red-500",
    "text-green-500",
    "text-blue-500",
    "text-yellow-500",
    "text-purple-500",
    "text-pink-500",
    "text-indigo-500",
    "text-teal-500",
  ];

  // Funktion zum Ermitteln der Summe der Punkte für jeden Arzt
  const calculatePoints = (doctor) => {
    let points = 0;
    roster.days.forEach((day) => {
      Object.keys(day.dutyColumns).forEach((dutyColumn) => {
        if (day.dutyColumns[dutyColumn].includes(doctor._id)) {
          const numberOfDoctors = day.dutyColumns[dutyColumn].length;
          const pointsForDay =
            numberOfDoctors === 1 ? day.value : day.value / 2;
          points += pointsForDay;
        }
      });
    });
    return points;
  };

  // Funktion zum Erstellen der Listen, die zusammenhängende Frei- und Feiertage beschreiben
  const createServiceBlocks = (roster) => {
    const serviceBlocks = [];
    let currentBlock = 0;
    let activeBlock = false;

    for (let i = 1; i <= roster.days.length; i++) {
      const day = roster.days.find((day) => day.date.getDate() === i);

      if (day && day.value && day.value > 1) {
        if (!activeBlock) {
          serviceBlocks[currentBlock] = []; // Initialisiere den Block, wenn ein aktiver Block gefunden wird
        }
        activeBlock = true;
        serviceBlocks[currentBlock].push(i);
      } else {
        if (activeBlock) {
          currentBlock += 1;
        }
        activeBlock = false;
      }
    }

    return serviceBlocks;
  };

  // Funktion zum Erstellen der Liste der Dienste für jeden Arzt
  const createServiceList = (doctor) => {
    const services = [];
    roster.days.forEach((day) => {
      Object.keys(day.dutyColumns).forEach((dutyColumn) => {
        if (day.dutyColumns[dutyColumn].includes(doctor._id)) {
          services.push(day.date.getDate());
        }
      });
    });

    return (
      <div className="flex">
        {services.map((service, index) => {
          const colorIndex = createServiceBlocks(roster).findIndex((block) =>
            block.includes(service)
          );
          const textColorClass = serviceBlockColors[colorIndex] || ""; // Wenn die Farbe nicht in serviceBlockColors gefunden wird, verwende standardmäßig keine Farbe
          return (
            <React.Fragment key={index}>
              {index === 0 ? "" : ",\u00A0"}
              <span className={`${textColorClass}`}>{service}</span>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const formatDate = (month, year) => {
    const formattedMonth = String(month + 1).padStart(2, "0");
    return `${formattedMonth}/${year}`;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mt-8 mb-4 font-bold">{`Übersicht der Dienste und Dienstpunkte für ${formatDate(
        roster.month,
        roster.year
      )}`}</h1>
      {createServiceBlocks(roster).map((serviceBlock, index) => (
        <div className={serviceBlockColors[index]} key={index}>
          Wochenende/ Feiertage {index + 1}
        </div>
      ))}
      <table className="table-auto w-full text-md border-none mt-2">
        <thead>
          <tr className="">
            <th className="py-2">Ärzte</th>
            <th className="py-2">Dienstpunkte</th>
            <th className="py-2">Dienste</th>
          </tr>
        </thead>
        <tbody>
          {roster.doctors
            .filter(
              (doctor) => createServiceList(doctor).props.children.length > 0
            ) // Filter out doctors with no duty
            .map((doctor) => (
              <tr key={doctor._id}>
                <td className="px-2 border-2 border-slate-700 text-md bg-slate-800">
                  {doctor.name}
                </td>
                <td className="px-2 border-2 border-slate-700 text-md bg-slate-800">
                  {calculatePoints(doctor)}
                </td>
                <td className="px-2 border-2 border-slate-700 text-md bg-slate-800">
                  {createServiceList(doctor)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
