"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import {usePathname,useParams} from "next/navigation"

type Props = {}

const MainNav = ({className,...props} : React.HTMLAttributes<HTMLElement>) => {
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
    className={cn("flex items-center space-x-4 lg:space-x-6",className)}>
      {routes.map((route)=> (
        <Link 
        href={route.href}
        key={route.href}
        className={cn("text-sm font-medium transition-colos hover:text-primary",route.active ? "text-black dark:text-white" : "text-muted-foreground")}>
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

export default MainNav