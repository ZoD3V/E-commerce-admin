"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import {usePathname,useParams} from "next/navigation"

interface MobileNavProps{
  active:boolean
  className?:React.HTMLAttributes<HTMLElement>
}

const MobileNav = ({className,active} :MobileNavProps) => {
  const pathName  = usePathname()
  const params  = useParams()

  const routes = [
    {
      href:`/${params.storeId}`,
      label:"Overview",
      active:pathName === `/${params.storeId}`
    },
    {
      href:`/${params.storeId}/banner`,
      label:"Banner",
      active:pathName === `/${params.storeId}/banner`
    },
    {
      href:`/${params.storeId}/category`,
      label:"Category",
      active:pathName === `/${params.storeId}/category`
    },
    {
      href:`/${params.storeId}/game`,
      label:"Game",
      active:pathName === `/${params.storeId}/game`
    },
    {
      href:`/${params.storeId}/product`,
      label:"Product",
      active:pathName === `/${params.storeId}/product`
    },
    {
      href:`/${params.storeId}/order`,
      label:"Order",
      active:pathName === `/${params.storeId}/order`
    },
    {
      href:`/${params.storeId}/settings`,
      label:"Settings",
      active:pathName === `/${params.storeId}/settings`
    },
  ]

  return (
    <nav
    className={cn(`${active ? 'absolute right-5 top-20 flex flex-col w-[250px] bg-gray-100 px-10 py-5 rounded-md transition-all duration-300 md:hidden' : 'hidden transition-all duration-300'}`,className)}>
      {routes.map((route)=> (
        <Link 
        href={route.href}
        key={route.href}
        className={cn("font-medium transition-colos hover:text-primary py-2 text-base",route.active ? "text-black dark:text-white" : "text-muted-foreground")}>
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

export default MobileNav