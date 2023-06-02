import React from "react";

export default function Box12h({ doctor, saveDoctorChange }) {
  function handleChange(e) {
    saveDoctorChange({ ...doctor, only12: !doctor.only12 });
    fetch("/api/doctors", {
      method: "POST",
      body: JSON.stringify({
        id: doctor._id,
        property: "only12",
        value: !doctor.only12,
      }),
    });
  }
  return (
    <label className="relative inline-flex items-center cursor-pointer mt-2 mb-2">
      <input
        type="checkbox"
        checked={doctor.only12}
        className="sr-only peer"
        onChange={handleChange}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="ml-3 text-md font-medium dark:text-gray-300">
        Nur 12-Stunden-Dienste
      </span>
    </label>
  );
}
