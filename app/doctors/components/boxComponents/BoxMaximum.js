"use client";
import { useState } from "react";
export default function BoxMaximum({ doctor, saveDoctorChange }) {
  function handleChange() {
    const updatedMaximum = doctor.maximum < 11 ? 99 : 10;

    saveDoctorChange({ ...doctor, maximum: updatedMaximum });
    setSelectedNumber(updatedMaximum);

    fetch("/api/doctors", {
      method: "POST",
      body: JSON.stringify({
        id: doctor._id,
        property: "maximum",
        value: updatedMaximum,
      }),
    });
  }

  const [selectedNumber, setSelectedNumber] = useState(doctor.maximum);

  const handleNumberSelection = (number) => {
    setSelectedNumber(number);
    saveDoctorChange({ ...doctor, maximum: number });
    fetch("/api/doctors", {
      method: "POST",
      body: JSON.stringify({
        id: doctor._id,
        property: "maximum",
        value: number,
      }),
    });
  };

  return (
    <div>
      <label className="relative inline-flex items-center cursor-pointer mt-2 mb-2">
        <input
          type="checkbox"
          checked={doctor.maximum < 11}
          className="sr-only peer"
          onChange={handleChange}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-md font-medium dark:text-gray-300">
          Anzahl der Dienste limitiert
        </span>
      </label>
      {doctor.maximum < 11 && (
        <div className="flex gap-2 mt-2 mb-2">
          {[...Array(10)].map((_, index) => (
            <div
              key={index + 1}
              onClick={() => handleNumberSelection(index + 1)}
              className={`w-8 h-8 rounded-md pt-1 ${
                selectedNumber === index + 1
                  ? "bg-orange-500 hover:bg-orange-700"
                  : "bg-slate-800 hover:bg-slate-700"
              } text-center align-middle cursor-pointer select-none active:bg-slate-900`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
