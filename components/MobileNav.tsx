"use client";

import { cn } from "@/lib/utils";
import {
  BarChart4,
  BringToFront,
  GalleryThumbnails,
  Gamepad2,
  ListStart,
  Package2,
  Paintbrush2Icon,
  PencilRulerIcon,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

interface MobileNavProps {
  active: boolean;
  className?: React.HTMLAttributes<HTMLElement>;
}

const MobileNav = ({ className, active }: MobileNavProps) => {
  const pathName = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathName === `/${params.storeId}`,
      icon: <BarChart4 />,
    },
    {
      href: `/${params.storeId}/banner`,
      label: "Banner",
      active: pathName === `/${params.storeId}/banner`,
      icon: <GalleryThumbnails />,
    },
    {
      href: `/${params.storeId}/category`,
      label: "Category",
      active: pathName === `/${params.storeId}/category`,
      icon: <ListStart />,
    },
    {
      href: `/${params.storeId}/size`,
      label: "Size",
      active: pathName === `/${params.storeId}/size`,
      icon: <PencilRulerIcon />,
    },
    {
      href: `/${params.storeId}/color`,
      label: "Color",
      active: pathName === `/${params.storeId}/color`,
      icon: <Paintbrush2Icon />,
    },
    {
      href: `/${params.storeId}/product`,
      label: "Product",
      active: pathName === `/${params.storeId}/product`,
      icon: <Package2 />,
    },
    {
      href: `/${params.storeId}/order`,
      label: "Order",
      active: pathName === `/${params.storeId}/order`,
      icon: <BringToFront />,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathName === `/${params.storeId}/settings`,
      icon: <Settings />,
    },
  ];

  return (
    <nav
      className={cn(
        `${
          active
            ? "absolute z-[999] right-5 top-20 flex flex-col w-[250px] bg-white dark:bg-black shadow-sm border border-gray-200 dark:border-gray-500 px-10 py-5 rounded-md transition-all duration-300 lg:hidden"
            : "hidden transition-all duration-300"
        }`,
        className
      )}
    >
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            "font-medium transition-colors duration-200 hover:text-primary dark:hover:text-blue-400 py-2 text-base flex items-center justify-start",
            route.active
              ? "text-black dark:text-blue-400"
              : "text-muted-foreground dark:text-gray-400"
          )}
        >
          <div className="pr-4">{route.icon}</div>
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MobileNav;
