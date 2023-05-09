"use client";
import Link from "next/link";
import { useState } from "react";
import NavButton from "./nav-button";
import NavDropdown from "./nav-dropdown";
import NavBurgerMenu from "./nav-burger-menu";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-discord flex items-center justify-between flex-wrap p-6">
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
          <NavButton href="/aerzte" title="Ärzte " />
          <NavDropdown
            title="Dienstpläne"
            plans={["Plan 1", "Plan 2", "Plan 3"]}
          />
          <NavButton href="/configuration" title="Einstellungen" />
          <NavButton href="/logout" title="Logout" />
        </div>
      </div>
    </nav>
  );
}
