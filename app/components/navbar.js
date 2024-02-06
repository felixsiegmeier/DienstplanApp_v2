"use client";
import Link from "next/link";
import { useState } from "react";
import NavButton from "./nav-button";
import NavBurgerMenu from "./nav-burger-menu";
import { usePageContext } from "../context/pageContext";
import logo from "@/public/logo.png";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setUser, isMobile } = usePageContext();

  return (
    <nav className={`bg-slate-800 flex ${isMobile && "justify-between"} items-center flex-wrap p-6`}>
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/">
            <img src={logo.src} alt="Logo" width={70} height={70} className="mr-4" />
            {/* Optional: Fügen Sie hier einen Titel oder Namen Ihres Unternehmens hinzu */}
        </Link>
      </div>
      <div className="flex items-center">
      {isMobile && ( // Render the burger menu only when isMobile is true
        <div>
          <NavBurgerMenu
            setIsDropdownOpen={setIsDropdownOpen}
            isDropdownOpen={isDropdownOpen}
          />
        </div>
      )}
      {(!isMobile)&& (
        <div
          className={`w-full flex-grow`}
        >
          <div className={`text-sm "flex-grow"`}>
            <NavButton href="/doctors" title="Ärzte" />
            <NavButton href="/rosters" title="Dienstpläne" />
            <NavButton href="/vacations" title="Urlaubsplan" />
            <NavButton href="/configuration" title="Einstellungen" />
            <button
              onClick={() => {
                localStorage.clear();
                setUser({_id: null, setUserGroupId: null});
              }}
              className={`inline select-none mt-4 text-gray-200 hover:text-white mr-4`}
            >
              Logout
            </button>
          </div>
        </div>
      )}
      </div>
      {(isMobile && isDropdownOpen) && (
        <div
          className={`w-full flex-grow`}
        >
          <div className={`text-sm text-center`}>
            <NavButton href="/doctors" title="Ärzte" />
            <NavButton href="/rosters" title="Dienstpläne" />
            <NavButton href="/vacations" title="Urlaubsplan" />
            <NavButton href="/configuration" title="Einstellungen" />
            <button
              onClick={() => {
                localStorage.clear();
                setUser({_id: null, setUserGroupId: null});
              }}
              className={`text-center w-full select-none mt-4 text-gray-200 hover:text-white`}
            >Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
