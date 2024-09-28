"use client";

import { useState } from "react";
import HeaderNav from "../../components/header-nav";
import Sidebar from "../../components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar open={open} setOpen={setOpen} />
        <div
          className={`flex flex-col justify-between bg-slate-50 transition-[width] duration-700 ease-in-out dark:bg-[#18181b] ${
            open ? "w-[83%]" : "w-[calc(100%-4rem)]"
          }`}
        >
          <HeaderNav title="Dashboard"/>
          <main className="mx-10 my-10 h-full rounded-md bg-white shadow-sm dark:bg-[#09090b]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
