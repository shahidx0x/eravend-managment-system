import React from "react";

import { ModeToggle } from "./theme-toggol";

const HeaderNav = () => {
  return (
    <header className="flex h-20 justify-between bg-white shadow-sm dark:bg-[#09090b]">
      <div className="mx-10 flex items-center text-xl font-bold">
        <p>Dashboard</p>
      </div>
      <div className="center mx-10">
        <ModeToggle />
      </div>
    </header>
  );
};

export default HeaderNav;
