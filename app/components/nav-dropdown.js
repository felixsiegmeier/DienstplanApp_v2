"use client"
import React, { useState } from "react";
import Link from "next/link";

export default function NavDropdown({ title, plans }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative mt-4 lg:inline-block lg:mt-0">
      <button
        className="text-gray-200 hover:text-white mr-4"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {title}{" "}
      </button>
      <div
        className={`${
          isDropdownOpen ? "block" : "hidden"
        } relative bg-gray-800 text-white py-2 mt-2 rounded-lg`}
      >
        {plans.map((plan, index) => (
          <Link key={index} href={`/dienstplan/${plan}`} passHref className="block px-4 py-2 hover:bg-gray-700">{plan}
          </Link>
        ))}
      </div>
    </div>
  );
}
