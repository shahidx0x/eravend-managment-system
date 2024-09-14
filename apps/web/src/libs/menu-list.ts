import { Tag, Users, Settings, Bookmark, SquarePen, LayoutGrid, LucideIcon } from "lucide-react";


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

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Manage",
      menus: [
        {
          href: "/dashboard/company",
          label: "Company",
          active: pathname.includes("/dashboard/company"),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: "/dashboard/users",
          label: "Users",
          active: pathname.includes("/dashboard/users"),
          icon: Tag,
          submenus: [],
        },
      ],
    },
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