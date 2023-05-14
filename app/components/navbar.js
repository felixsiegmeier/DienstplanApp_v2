"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import NavButton from "./nav-button";
import NavDropdown from "./nav-dropdown";
import NavBurgerMenu from "./nav-burger-menu";
import { usePageContext } from "../context/pageContext";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const {setUserId, setUserGroupId} = usePageContext();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="bg-slate-800 flex items-center justify-between flex-wrap p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/" className="text-2xl font-semibold">
          Logo
        </Link>
      </div>
      <div className="block lg:hidden">
        <NavBurgerMenu
          setIsDropdownOpen={setIsDropdownOpen}
          isDropdownOpen={isDropdownOpen}
        />
      </div>
      <div
        className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${
          isDropdownOpen ? "" : "hidden"
        }`}
      >
        <div className="text-sm lg:flex-grow">
          <NavButton href="/doctors" title="Ärzte " />
          {isMobile ? (
            <NavDropdown
              title="Dienstpläne"
              plans={["Plan 1", "Plan 2", "Plan 3"]}
            />
          ) : (
            <NavButton href="/plans" title="Dienstpläne" />
          )}

          <NavButton href="/configuration" title="Einstellungen" />
          <button
            onClick={() => {
              setUserGroupId(false)
              setUserId(false)
              }}
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
