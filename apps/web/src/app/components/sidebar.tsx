"use client";

import React from "react";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

import { ChevronRight, LayoutDashboard, LogOut } from "lucide-react";

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

interface SideBarProps {
  open: boolean;
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
}

const Sidebar: React.FC<SideBarProps> = ({ open, setOpen }) => {
  const router = useRouter();
  return (
    <aside
      className={`relative flex flex-col justify-between shadow-sm transition-[flex-basis] duration-700 ease-in-out ${
        open ? "h-screen basis-2/12" : "h-screen basis-[4rem]"
      }`}
    >
      <div className="center">
        {open ? (
          <h2 className="p-2 font-mono text-5xl tracking-[0.2em] transition-[flex-basis] duration-700 ease-in-out">
            ERAVEND
          </h2>
        ) : (
          <LayoutDashboard size={45} strokeWidth={1.0} />
        )}

        <Button
          className="absolute -right-8"
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
      <div className="center pb-5">
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
        <Button variant="outline" className={open ? "w-52" : "w-auto"}>
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

export default Sidebar;
