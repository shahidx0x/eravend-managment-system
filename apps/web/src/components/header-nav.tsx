import React from "react";

import { UserDropDown } from "./header-profile-dropdown";
import { ModeToggle } from "./theme-toggol";

interface navProps {
  title: string;
}

const HeaderNav = ({ title }: navProps) => {
  return (
    <header className="w-full flex h-20 justify-between bg-white shadow-sm dark:bg-[#09090b]">
      <div className="mx-12 flex items-center text-xl font-bold">
        <p>{title}</p>
      </div>
      <div className="center mx-10 gap-4">
        <ModeToggle />
        <UserDropDown />
      </div>
    </header>
  );
};

export default HeaderNav;