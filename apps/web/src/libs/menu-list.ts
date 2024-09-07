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
      groupLabel: "Company",
      menus: [
        {
          href: "/dashboard/company",
          label: "Manage Company",
          active: pathname.includes("/dashboard/company"),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: "/tags",
          label: "Tags",
          active: pathname.includes("/tags"),
          icon: Tag,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: [],
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}

// {
//   href: "",
//   label: "Company Information",
//   active: pathname.includes("/company"),
//   icon: SquarePen,
//   submenus: [
//     {
//       href: "/company/new",
//       label: "Company",
//       active: pathname === "/company",
//     },
//     {
//       href: "/posts/new",
//       label: "New Post",
//       active: pathname === "/posts/new",
//     },
//   ],
// },
// {
//   groupLabel: "",
//   menus: [
//     {
//       href: "/dashboard",
//       label: "Dashboard",
//       active: pathname.includes("/dashboard"),
//       icon: LayoutGrid,
//       submenus: [],
//     },
//   ],
// },