"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";



import { Ellipsis, Tag, Users, Bookmark, LucideIcon } from "lucide-react";

import {
  Button,
  cn,
  ScrollArea,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@nx-next-shadcn/shadcn";

import { CollapseMenuButton } from "./collaps-menu-button";


interface MenuProps {
  isOpen: boolean | undefined;
}

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getCompanyMenuList(pathname: string): Group[] {
  const companyName = pathname.split("/")[3];
  return [
    {
      groupLabel: "Employee Dashboard",
      menus: [
        {
          href: `/dashboard/company/${companyName}/employee/dashboard`,
          label: "Dashboard",
          active: pathname.includes(
            `/dashboard/company/${companyName}/employee/dashboard`,
          ),
          icon: Bookmark,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Employee Management",
      menus: [
        {
          href: `/dashboard/company/${companyName}/workforce`,
          label: "Workforce Monitor",
          active: pathname.includes(
            `/dashboard/company/${companyName}/workforce`,
          ),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: `/dashboard/company/${companyName}/salary`,
          label: "Salary",
          active: pathname.includes(`/dashboard/company/${companyName}/salary`),
          icon: Tag,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Project Management",
      menus: [
        {
          href: `/dashboard/company/${companyName}/attendance`,
          label: "Attendance",
          active: pathname.includes(
            `/dashboard/company/${companyName}/attendance`,
          ),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: `/dashboard/company/${companyName}/salary`,
          label: "Salary",
          active: pathname.includes(`/dashboard/company/${companyName}/salary`),
          icon: Tag,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "CRM",
      menus: [
        {
          href: `/dashboard/company/${companyName}/crm/sales`,
          label: "Sales",
          active: pathname.includes(
            `/dashboard/company/${companyName}/crm/sales`,
          ),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: `/dashboard/company/${companyName}/crm/customers`,
          label: "Customer",
          active: pathname.includes(
            `/dashboard/company/${companyName}/crm/customers`,
          ),
          icon: Tag,
          submenus: [],
        },
        {
          href: `/dashboard/company/${companyName}/crm/marketing`,
          label: "Marketing",
          active: pathname.includes(
            `/dashboard/company/${companyName}/crm/marketing`,
          ),
          icon: Tag,
          submenus: [],
        },
        {
          href: `/dashboard/company/${companyName}/crm/analytics`,
          label: "Analytics",
          active: pathname.includes(
            `/dashboard/company/${companyName}/crm/analytics`,
          ),
          icon: Tag,
          submenus: [],
        },
      ],
    },
    // {
    //   groupLabel: "Social Media Managment",
    //   menus: [
    //     {
    //       href: `/dashboard/company/${companyName}/attendance`,
    //       label: "Facebook",
    //       active: pathname.includes(
    //         `/dashboard/company/${companyName}/attendance`,
    //       ),
    //       icon: Bookmark,
    //       submenus: [],
    //     },
    //     {
    //       href: `/dashboard/company/${companyName}/salary`,
    //       label: "Instagram",
    //       active: pathname.includes(`/dashboard/company/${companyName}/salary`),
    //       icon: Tag,
    //       submenus: [],
    //     },
    //     {
    //       href: `/dashboard/company/${companyName}/salary`,
    //       label: "Tiktok",
    //       active: pathname.includes(`/dashboard/company/${companyName}/salary`),
    //       icon: Tag,
    //       submenus: [],
    //     },
    //   ],
    // },

    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/dashboard/user-profile",
          label: "Account",
          active: pathname.includes("/dashboard/user-profile"),
          icon: Users,
          submenus: [],
        },
      ],
    },
  ];
}
export function CompanyMenu({ isOpen }: Readonly<MenuProps>) {
  const pathname = usePathname();
  const menuList = getCompanyMenuList(pathname);

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className={cn(!isOpen && "w-16")}>
        <ul className="flex flex-col items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-muted-foreground max-w-[248px] truncate px-4 pb-2 text-sm font-medium">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="flex w-full items-center justify-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={active ? "secondary" : "ghost"}
                              className="mb-1 h-10 w-full justify-start"
                              asChild
                            >
                              <Link href={href}>
                                <span
                                  className={cn(isOpen === false ? "" : "mr-4")}
                                >
                                  <Icon size={18} />
                                </span>
                                <p
                                  className={cn(
                                    "max-w-[200px] truncate",
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100",
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active}
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  ),
              )}
            </li>
          ))}
        </ul>
      </nav>
    </ScrollArea>
  );
}