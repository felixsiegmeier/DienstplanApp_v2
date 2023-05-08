"use client"
import Link from "next/link";
import { useState } from "react";

export default function Navbar (){
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-discord flex items-center justify-between flex-wrap p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/">
          <a className="text-2xl font-semibold">Logo</a>
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
        </button>
      </div>
      <div
        className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${
          isDropdownOpen ? "" : "hidden"
        }`}
      >
        <div className="text-sm lg:flex-grow">
          <Link href="/aerzte">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
              Ärzte
            </a>
          </Link>
          <div className="relative mt-4 lg:inline-block lg:mt-0">
            <button
              className="text-gray-200 hover:text-white mr-4"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Dienstpläne{" "}
            </button>
            <div
              className={`${
                isDropdownOpen ? "block" : "hidden"
              } absolute bg-gray-800 text-white py-2 mt-2 rounded-lg`}
            >
              <Link href="/dienstplan/plan1">
                <a className="block px-4 py-2 hover:bg-gray-700">Plan 1</a>
              </Link>
              <Link href="/dienstplan/plan2">
            <a className="block px-4 py-2 hover:bg-gray-700">Plan 2</a>
          </Link>
          <Link href="/dienstplan/plan3">
            <a className="block px-4 py-2 hover:bg-gray-700">Plan 3</a>
          </Link>
        </div>
      </div>
      <Link href="/configuration">
        <a className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
          Configuration
        </a>
      </Link>
      <Link href="/logout">
        <a className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white">
          Logout
        </a>
      </Link>
    </div>
  </div>
</nav>
  )
            }