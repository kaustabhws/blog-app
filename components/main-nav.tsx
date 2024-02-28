"use client";

import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({
  className,
  isOpen,
  setIsOpen,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname();

  const { status } = useSession()

  const routes = [
    {
      href: `/`,
      label: "Home",
      active: pathname === `/`,
    },
    {
      href: `/about`,
      label: "About",
      active: pathname === `/about`,
    },
    {
      href: `/new`,
      label: "New Post",
      active: pathname === `/new`,
    },
  ];

  return (
    <nav
      className={cn(
        "flex items-center space-x-4 lg:space-x-6 text-sm",
        className
      )}
    >
      {routes?.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
          onClick={() => {
            if (setIsOpen) {
              setIsOpen(!isOpen);
            }
          }}
        >
          {route.label}
        </Link>
      ))}
      {status === "authenticated" ? 
      (<div
        className={`font-medium transition-colors hover:text-primary cursor-pointer text-muted-foreground`}
        onClick={() => signOut()}
      >
        Logout
      </div>) : 
      (<Link
        href="/auth"
        className={`font-medium transition-colors hover:text-primary ${
          pathname === "/auth"
            ? "text-black dark:text-white"
            : "text-muted-foreground"
        } cursor-pointer`}
      >
        Login
      </Link>)}
    </nav>
  );
}
