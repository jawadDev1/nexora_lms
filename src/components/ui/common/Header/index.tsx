import React from "react";
import Logo from "../Logo";
import Link from "next/link";
import Search from "../../extra/Search";
import UserNav from "@/modules/auth/UserNav";

const Header = () => {
  return (
    <div className="border-b px-1 border-light-gray">
      <header className="flex justify-between gap-5 items-center  py-3 max-w-[1200px] mx-auto ">
          <Logo />

        <nav className="flex items-center gap-x-4 flex-1  justify-center">
          <Link href={"/course"} className="hidden lg:block text-subtitle2">
           Courses 
          </Link>
          <Search />
        </nav>

        <UserNav />
      </header>
    </div>
  );
};

export default Header;
