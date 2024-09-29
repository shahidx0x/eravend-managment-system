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
  Separator,
} from "@nx-next-shadcn/shadcn";

import { Menu } from "./sudebar-menu";
import Link from "next/link";

interface SideBarProps {
  open: boolean;
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
}

const Sidebar: React.FC<SideBarProps> = ({ open, setOpen }) => {
  const router = useRouter();
  return (
    <aside
      className={`relative flex flex-col shadow-sm ${
        open ? "h-screen basis-2/12" : "h-screen basis-[4rem]"
      }`}
    >
      <div className="center">
        {open ? (
          <Link href={"/dashboard/company"} className="px-[38px] py-3 font-mono text-4xl tracking-[0.2em]">ERAVEND</Link>
        ) : (
          <Link href={"/dashboard/company"}>
            <LayoutDashboard size={35} strokeWidth={1.0} className="m-4" />
          </Link>
        )}

        <Button
          className="absolute -right-10 top-3"
          onClick={() => setOpen((state) => !state)}
          variant="outline"
          size="icon"
        >
          <ChevronRight
            className={`h-4 w-4 ${
              open ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>
      <div>
        <Menu isOpen={open} />
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
        <Button variant="outline" className={open ? "w-56" : "w-auto"}>
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