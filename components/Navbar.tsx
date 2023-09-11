import { UserButton } from "@clerk/nextjs"
import MainNav from "@/components/MainNav"
import StoreSwitcher from "@/components/store-switcher"
import {auth} from "@clerk/nextjs"
import prismadb from "@/lib/prismadb"
import { redirect } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"

type Props = {}

const Navbar = async(props: Props) => {
  const {userId} = auth();

  if(!userId){
    redirect("/sign-in")
  }
  
  const stores = await prismadb.store.findMany({
    where:{
      userId
    }
  })
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores}/>

        <MainNav className="mx-6"/>

        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle/>
          <UserButton afterSignOutUrl="/sign-in"/>
        </div>

      </div>
    </div>
  )
}

export default Navbar