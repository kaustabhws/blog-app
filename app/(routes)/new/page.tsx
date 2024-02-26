"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, Plus, Video } from "lucide-react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";

const NewPost = () => {
  const { status } = useSession();

  const ReactQuill = dynamic(() => import("react-quill"), {ssr: false})

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth");
    }
  }, [status]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="my-6 md:w-9/12 mx-auto w-11/12">
      <div className="flex flex-col gap-5">
        <Input
          type="text"
          placeholder="Title"
          className="h-20 text-5xl italic"
        />
        <div className="flex items-center gap-7">
          <Plus
            className={`border h-10 w-10 p-2 rounded-full cursor-pointer transition-all duration-300 ${
              open ? "transform rotate-45" : ""
            }`}
            onClick={() => setOpen(!open)}
          />
          <div
            className={`transition-all duration-300 flex items-center gap-1 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image className="border h-10 w-10 p-2 rounded-full cursor-pointer" />
            <Video className="border h-10 w-10 p-2 rounded-full cursor-pointer" />
          </div>
        </div>
        <ReactQuill
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
          className="border rounded-md"
        />
      </div>
      <div className="mt-5">
        <Button className="h-max">Publish</Button>
      </div>
    </div>
  );
};

export default NewPost;
