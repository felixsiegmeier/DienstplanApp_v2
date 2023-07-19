"use client"
import { usePageContext } from "@/app/context/pageContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RosterModal({ selectedRoster, onClose }) {
  const { isMobile } = usePageContext();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  if (!selectedRoster) return null;
  
  const { name, year, month, visible, wishOpen } = selectedRoster;

  const formatDate = (month, year) => {
    const formattedMonth = String(month + 1).padStart(2, "0");
    return `${formattedMonth}-${year}`;
  };

  const handleVisibilityChange = () => {
    selectedRoster.toggleVisible()
  };

  const handleWishesChange = () => {
    selectedRoster.toggleWishOpen();
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    selectedRoster.deleteSelf();
    setShowConfirmation(false);
    onClose();
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div
      onClick={() => onClose()}
      className="fixed inset-0 bg-opacity-70 bg-slate-800 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative shadow-md ${
          isMobile ? "w-[80%]" : "w-[50%]"
        } h-min p-4 rounded-md shadow-black border-slate-400 border bg-slate-800 transition-opacity flex flex-col items-center gap-2 select-none`}
      >
        <h2 className="text-white text-xl font-bold">{name}</h2>
        <p className="text-slate-200">{formatDate(month, year)}</p>

        {/* Trennlinie zwischen Subtitle und Schaltflächen */}
        <hr className="border-gray-400 w-3/4 my-2" />

        {/* Dienstplan und Wünsche Schaltflächen */}
        <div className={`flex ${isMobile ? "flex-col gap-4" : "gap-4"}`}>
          <button
            className={`p-3 rounded-md bg-cyan-800 text-white font-bold hover:bg-cyan-700 active:bg-cyan-900 focus:outline-none ${
              isMobile ? "w-full" : "w-1/2"
            }`}
            onClick={() => {
              router.push(`/rosters/${selectedRoster._id}`);
            }}
          >
            Dienstplan aufrufen
          </button>

          <button
            className={`p-3 rounded-md bg-cyan-800 text-white font-bold hover:bg-cyan-700 active:bg-cyan-900 focus:outline-none ${
              isMobile ? "w-full" : "w-1/2"
            }`}
            onClick={() => {
              router.push(`/rosters/wishes/${selectedRoster._id}`);
            }}
          >
            Wünsche aufrufen
          </button>
        </div>

        <label className="relative inline-flex items-center cursor-pointer mt-2 mb-2">
          <input
            type="checkbox"
            checked={selectedRoster.visible}
            className="sr-only peer"
            onChange={handleVisibilityChange}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-md font-medium dark:text-gray-300">
            Sichtbarkeit
          </span>
        </label>

        <label className="relative inline-flex items-center cursor-pointer mt-2 mb-2">
          <input
            type="checkbox"
            checked={selectedRoster.wishOpen}
            className="sr-only peer"
            onChange={handleWishesChange}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-md font-medium dark:text-gray-300">
            Wünsche zulassen
          </span>
        </label>

        {/* Verkleinerte Löschen-Schaltfläche */}
        <button
          className="p-2 rounded-md bg-red-800 text-white font-bold hover:bg-red-700 active:bg-red-900 focus:outline-none"
          onClick={handleDelete}
        >
          Dienstplan löschen
        </button>

        {/* Modalfenster für Bestätigung */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-opacity-70 bg-gray-800 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md">
              <p className="text-gray-800">Möchten Sie den Dienstplan wirklich löschen?</p>
              <div className="flex gap-2 mt-4">
                <button
                  className="p-2 rounded-md bg-red-800 text-white font-bold hover:bg-red-700 active:bg-red-900 focus:outline-none"
                  onClick={handleConfirmDelete}
                >
                  Ja, löschen
                </button>
                <button
                  className="p-2 rounded-md bg-cyan-800 text-white font-bold hover:bg-cyan-700 active:bg-cyan-900 focus:outline-none"
                  onClick={handleCancelDelete}
                >
                  Abbrechen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
