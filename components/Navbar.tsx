import { UserButton } from "@clerk/nextjs";
import MainNav from "@/components/MainNav";
import StoreSwitcher from "@/components/store-switcher";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import SelectorNav from "./SelectorNav";

type Props = {};

const Navbar = async (props: Props) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />

        <MainNav className="mx-6" />

        <SelectorNav />
      </div>
    </div>
  );
};

export default Navbar;
