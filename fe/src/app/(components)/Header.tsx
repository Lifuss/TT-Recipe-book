"use client";
import React from "react";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import RecipeLink from "./RecipeLink";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="bg-gray-200 py-3 border-b border-gray-300 ">
      <div className="flex justify-between items-center container mx-auto">
        <Logo />
        {pathname === "/recipes" ? (
          <RecipeLink text="Reset list" />
        ) : (
          <RecipeLink text="Go to the list" />
        )}
      </div>
    </header>
  );
};

export default Header;
