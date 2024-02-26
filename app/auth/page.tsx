"use client"

import { useEffect, useState } from "react";
import SignIn from "./_components/signin";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const LoginPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const { status } = useSession();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if(status === "authenticated") {
    redirect("/");
  }

  return (
      <SignIn isOpen={isOpen} />
  );
};

export default LoginPage;
