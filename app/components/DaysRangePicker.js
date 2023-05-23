"use client";
import React, { useState, useEffect } from "react";

export default function DaysRangePicker({
  days = 30,
  redData = [],
  greenData = [],
  orangeData = [],
  blueData = [],
  yellowData = [],
}) {
  const [selected, setSelected] = useState(Array(days).fill(false));
  const [colorStatus, setColorStatus] = useState({
    red: Array(days).fill(false),
    green: Array(days).fill(false),
    orange: Array(days).fill(false),
    blue: Array(days).fill(false),
    yellow: Array(days).fill(false),
  });

  useEffect(() => {
    const colorDataMap = {
      red: redData,
      green: greenData,
      orange: orangeData,
      blue: blueData,
      yellow: yellowData,
    };

    for (const color in colorDataMap) {
      const colorData = colorDataMap[color];
      if (colorData) {
        const updatedColorStatus = [...colorStatus[color]];
        for (const day of colorData) {
          updatedColorStatus[day - 1] = true;
        }
        setColorStatus((prevColorStatus) => ({
          ...prevColorStatus,
          [color]: updatedColorStatus,
        }));
      }
    }
  }, []);

  useEffect(() => {
    const colors = ["blue", "green", "red", "orange", "yellow"];
    let priorityColor = null;

    for (const color of colors) {
      const colorState = colorStatus[color];
      if (colorState && colorState.includes(true)) {
        priorityColor = color;
        break;
      }
    }

    setSelected((prevSelected) => {
      const updatedSelected = [...prevSelected];

      if (priorityColor) {
        for (let i = 0; i < updatedSelected.length; i++) {
          if (colorStatus[priorityColor][i]) {
            updatedSelected[i] = true;
          }
        }
      }

      return updatedSelected;
    });
  }, [colorStatus]);

  const renderDays = () => {
    return selected.map((isSelected, index) => {
      let colorClass = "";
      const colors = ["red", "green", "orange", "blue", "yellow"];

      for (const color of colors) {
        if (colorStatus[color][index]) {
          colorClass = `bg-${color}-500`;
          break;
        }
      }

      if (!colorClass) {
        colorClass = "bg-gray-300";
      }

      return (
        <div
          key={index}
          className={`day  border border-black w-8 h-8 text-center text-xl rounded-sm cursor-pointer select-none ${colorClass} ${
            isSelected ? "border-white" : ""
          }`}
        >
          {index + 1}
        </div>
      );
    });
  };

  return <div className="calendar flex">{renderDays()}</div>;
}
