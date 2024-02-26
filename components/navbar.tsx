import { MainNav } from "./main-nav";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";
import { Hammburger } from "./hamburger";
import { UserProfile } from "./user-profile";
import { useSession } from "next-auth/react";

const Navbar = async () => {

  return (
    <div className="border-b">
      <div className="flex h-auto items-center px-4 justify-between">
        <div className="hidden max-[470px]:block">
          <Hammburger />
        </div>
        <div>
          <Image src="/logo.svg" alt="logo" width={70} height={70} />
        </div>
        <div className="max-[470px]:hidden">
          <MainNav className="mx-6" />
        </div>
        <div className="flex items-center justify-end space-x-2 lg:space-x-4 md:space-x-4">
          <ThemeToggle />
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
