"use client";

import { useState } from "react";

import CompanySidebar from "../../../../../components/company-sidebar";
import HeaderNav from "../../../../../components/header-nav";


export default function CompanyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <html lang="en">
      <body className="flex">
        <CompanySidebar open={open} setOpen={setOpen} />
        <div
          className={`flex flex-col justify-between bg-slate-50 transition-[width] duration-700 ease-in-out dark:bg-[#18181b] ${
            open ? "w-[83%]" : "w-[calc(100%-4rem)]"
          }`}
        >
          <HeaderNav title="Company Specific Dashboard" />
          <main className="mx-10 my-10 h-full rounded-md bg-white shadow-sm dark:bg-[#09090b]">
            {children}
          </main>
        
        </div>
      </body>
    </html>
  );
}