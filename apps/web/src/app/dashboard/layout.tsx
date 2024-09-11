"use client";

import { useState } from "react";

import Footer from "../../components/footer";
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
      <body className="flex flex-row">
        <Sidebar open={open} setOpen={setOpen} />
        <div
          className={`flex flex-col justify-between bg-slate-50 transition-[flex-basis] duration-700 ease-in-out dark:bg-[#18181b] ${
            open ? "basis-11/12" : "basis-full"
          }`}
        >
          <HeaderNav title="Dashboard"/>
          <main className="mx-10 my-10 h-full rounded-md bg-white shadow-sm dark:bg-[#09090b]">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
