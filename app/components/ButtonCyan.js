"use client";
import React from "react";

// Allgemeine Button-Komponente
export default function ButtonCyan({ text, onClick, className }) {
  return (
      <div
        onClick={() => {
          onClick && onClick();
        }}
        className={`bg-cyan-800 cursor-pointer p-2 rounded-md shadow-xl active:shadow-lg hover:bg-cyan-700 active:scale-100 active:bg-cyan-900 select-none w-max ${className}`}
      >
        {text}
      </div>
  );
}
