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
        <div className="hidden lg:block">
          <ThemeToggle />
        </div>
        <UserButton />
        <AlignRight
          className="block lg:hidden cursor-pointer"
          onClick={() => setNav(!nav)}
        />
      </div>
      <MobileNav active={nav} />
    </>
  );
};

export default SelectorNav;
