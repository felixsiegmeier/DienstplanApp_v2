"use client"
import React, { useState } from "react";

const MultiSelect = ({ options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState(selected);

  const toggle = () => setIsOpen(!isOpen);

  const handleOnClick = (option) => {
    const currentIndex = selection.indexOf(option);
    const newSelection = [...selection];

    if (currentIndex === -1) {
      newSelection.push(option);
    } else {
      newSelection.splice(currentIndex, 1);
    }

    setSelection(newSelection);
    onChange(newSelection);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center justify-between px-4 py-2 bg-slate-700 text-white cursor-pointer"
        onClick={toggle}
      >
        <span className="mr-2 font-medium">{`${selection.length} ausgewählt`}</span>
        <span
          className={`w-4 h-4 transition-transform duration-200 transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          &#9660;
        </span>
      </div>
      {isOpen && (
        <div className="absolute z-50 mt-2 overflow-y-auto max-h-56 rounded-md shadow-lg bg-white w-full">
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 cursor-pointer ${
                selection.indexOf(option) > -1
                  ? "bg-slate-700 text-white font-medium"
                  : "hover:bg-slate-700 hover:text-white"
              }`}
              onClick={() => handleOnClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
