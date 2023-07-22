"use client";
import React from "react";

// Allgemeine Button-Komponente
export default function ButtonRed({ text, onClick, className }) {
  return (
      <div
        onClick={() => {
          onClick && onClick();
        }}
        className={`bg-red-800 cursor-pointer p-2 rounded-md shadow-xl active:shadow-lg hover:bg-red-700 active:scale-100 active:bg-red-900 select-none w-max ${className}`}
      >
        {text}
      </div>
  );
}
