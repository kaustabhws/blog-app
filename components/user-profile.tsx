"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export function UserProfile() {
  const { data, status } = useSession();

  return (
    <div>
      {status === "authenticated" ? 
      (<DropdownMenu>
        <DropdownMenuTrigger asChild>
          
          <Image
            className="w-9 h-9 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
            src={data?.user?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt="Bordered avatar"
            width={20}
            height={20}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>{data?.user?.name}</DropdownMenuItem>
          <DropdownMenuItem>{data?.user?.email}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>) : null
      }
    </div>
  );
}
