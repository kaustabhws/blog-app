"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown, Image, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import axios from "axios";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const storage = getStorage(app);

interface Category {
  id: string;
  slug: string;
  title: string;
  image: string;
}

const NewPost = () => {
  const { status } = useSession();

  const router = useRouter()

  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");

  const [openMenu, setOpenMenu] = useState(false);
  const [value, setValue] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth");
    }

    const upload = () => {
      if (!file) return;

      const name = new Date().getTime() + "-" + file?.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    file && upload();

    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/categories");

        if (res.data.success && Array.isArray(res.data.data)) {
          setCategories(res.data.data);
        } else {
          console.log("Invalid data returned from the API");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [status, file]);

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {

    if(!title || !description || !value) {
      toast.error("All fields are required")
      return;
    }

    if(!media) {
      toast.error("Please upload an image")
      return;
    }
    const res = await axios.post("/api/posts", {
      title,
      description,
      media,
      slug: slugify(title),
      catSlug: value,
    });

    if (!res.data) {
      toast.error("Something went wrong")
      console.log("Error fetching data");
    }
    toast.success("Posted Successfully!")
    router.push(`/posts/${slugify(title)}`);
  };

  if (status === "unauthenticated") {
    return null;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  return (
    <div className="my-6 md:w-9/12 mx-auto w-11/12">
      <div className="flex flex-col gap-5">
        <Input
          type="text"
          placeholder="Title"
          className="h-20 text-5xl italic"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
            <input
              type="file"
              className="hidden"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label htmlFor="image">
              <Image className="border h-10 w-10 p-2 rounded-full cursor-pointer" />
            </label>
          </div>
          <div>
            <Popover open={openMenu} onOpenChange={setOpenMenu}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openMenu}
                  className="w-[200px] justify-between"
                >
                  {value
                    ? categories?.find((category) => category?.slug === value)
                        ?.title
                    : "Select category..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search framework..." />
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {categories?.map((category) => (
                      <CommandItem
                        key={category?.id}
                        value={category?.slug}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpenMenu(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === category?.slug
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {category?.title}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <ReactQuill
          theme="bubble"
          value={description}
          onChange={setDescription}
          placeholder="Tell your story..."
          className="border rounded-md"
        />
      </div>
      <div className="mt-5">
        <Button className="h-max" onClick={handleSubmit}>
          Publish
        </Button>
      </div>
    </div>
  );
};

export default NewPost;
