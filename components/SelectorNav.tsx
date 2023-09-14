"use client";
import React, { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { AlignRight } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import MobileNav from "./MobileNav";

type Props = {};

const SelectorNav = (props: Props) => {
  const [nav, setNav] = useState(false);
  return (
    <>
      <div className="ml-auto flex items-center space-x-4">
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
        <UserButton afterSignOutUrl="/sign-in" />
        <AlignRight className="block md:hidden cursor-pointer" onClick={()=> setNav(!nav)}/>
      </div>
      <MobileNav active={nav}/>
    </>
  );
};

export default SelectorNav;
