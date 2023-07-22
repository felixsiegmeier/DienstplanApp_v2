"use client";
import Link from "next/link";
import { useState } from "react";
import NavButton from "./nav-button";
import NavBurgerMenu from "./nav-burger-menu";
import { usePageContext } from "../context/pageContext";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setUser, isMobile } = usePageContext();

  return (
    <nav className="bg-slate-800 flex items-center justify-between flex-wrap p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/" className="text-2xl font-semibold">
          Logo
        </Link>
      </div>
      {isMobile && ( // Render the burger menu only when isMobile is true
        <div>
          <NavBurgerMenu
            setIsDropdownOpen={setIsDropdownOpen}
            isDropdownOpen={isDropdownOpen}
          />
        </div>
      )}
      {(!isMobile || (isMobile && isDropdownOpen)) && (
        <div
          className={`w-full flex-grow ${
            !isMobile ? "flex items-center w-auto" : null
          }`}
        >
          <div className={`text-sm ${!isMobile ? "flex-grow" : null}`}>
            <NavButton href="/doctors" title="Ärzte" />
            <NavButton href="/rosters" title="Dienstpläne" />
            <NavButton href="/vacations" title="Urlaubsplan" />
            <NavButton href="/configuration" title="Einstellungen" />
            <button
              onClick={() => {
                setUser({_id: null, setUserGroupId: null});
              }}
              className={`block select-none mt-4 ${
                !isMobile ? "inline-block mt-0" : null
              } text-gray-200 hover:text-white mr-4`}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
