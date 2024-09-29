"use client";

import React from "react";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

import { ChevronRight, LayoutDashboard, LogOut } from "lucide-react";

import eravendLogo from "../assets/eravend.png";
import eravendLogoLight from "../assets/eravend-light.png";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@nx-next-shadcn/shadcn";

import { CompanyMenu } from "./company-sidebar-menu";
import Link from "next/link";
import Image from "next/image";

interface SideBarProps {
  open: boolean;
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
}

const CompanySidebar: React.FC<SideBarProps> = ({ open, setOpen }) => {
  const router = useRouter();
  return (
    <aside
      className={`h-screen relative flex flex-col shadow-sm transition-[width] duration-700 ease-in-out ${
        open ? "w-[17%]" : "w-[4rem]"
      }`}
    >
      <div className="center">
        {open ? (
          <Link href="/dashboard/company" className="mx-4 lg:mx-10 my-5">
            <Image src={eravendLogo} alt="EraVend Logo" className="w-full dark:hidden" />
            <Image src={eravendLogoLight} alt="EraVend Logo" className="w-full hidden dark:block" />
          </Link>
        ) : (
          <Link href="/dashboard/company">
            <LayoutDashboard size={35} strokeWidth={1} className="m-4" />
          </Link>
        )}

        <Button
          className="absolute -right-10 top-3.5"
          onClick={() => setOpen((state) => !state)}
          variant="outline"
          size="icon"
        >
          <ChevronRight
            className={`h-4 w-4 transition-transform duration-700 ease-in-out ${
              open ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>
      <div>
        <CompanyMenu isOpen={open} />
      </div>
      <div className="center pb-5 pt-5">
        <LogoutDialog open={open} router={router} />
      </div>
    </aside>
  );
};

const LogoutDialog: React.FC<{ open: boolean; router: AppRouterInstance }> = ({
  open,
  router,
}) => {
  const handleConfirm = () => {
    router.push("/login");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={open ? "w-full mx-5" : "w-full mx-5"}>
          <LogOut size={20} strokeWidth={1.25} />
          {open && <span className="ml-2">Logout</span>}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to logout?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleConfirm} type="submit">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompanySidebar;
